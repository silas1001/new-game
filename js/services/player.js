/**
 * Created by Tarnos on 2016-12-19.
 */

lotfw.factory('Player', function(Game, Inventory, logService, Entity){
   var Player = function(obj){
       Entity.call(this, obj);//take all values from Entity object
       this.experience = 0;
       this.maxExperience = 100;
       this.statPoints = 1000;
       this.defense = 0;
       this.health = 10;
       this.accuracy = 90; //base accuracy used with "GetAccuracy" method
       this.critChance = 0;
       this.critDamage = 1.2;
       this.attackSpeed = 2;//attack every x seconds
       this.currentSpeed = 0;//current attack order
       this.inventory = Inventory;
       this.baseStats = {};//will be filled with initStats method below.
   };
   //prototype inheritance
   Player.prototype = Object.create(Entity.prototype);
   Player.prototype.constructor = Player;

    Player.prototype.initStats = function(){
        for(var i = 0; i < Game.stats.length; i++){
            var name = Game.stats[i];
            this.baseStats[name] = 5;
        }
        this.health = this.getMaxHealth();
    };
    Player.prototype.addStat = function(stat, val){
        if(this.statPoints - val >= 0){
            this.baseStats[stat] += val * 10;
            this.statPoints -= val;
        }else{
            logService.log('you have: ' + this.statPoints + ' stat points, but you need: ' + val);
        }
    };
    Player.prototype.getMaxHealth = function(){
       return parseFloat(Math.floor(this.totalStat('endurance') * 2.5));
   };
    Player.prototype.totalStat = function(stat){
       return this.baseStats[stat] + this.equippedStat(stat);
   };
    Player.prototype.getDamage = function() {
       var min = 4 + this.totalStat('strength');
       var max = 6 + (this.totalStat('strength') * 1.3);
       var randDmg = Math.floor(Math.random() * (max - min + 1) + min);
       if (this.accuracyCheck()) {
           return this.criticalCheck(randDmg);
       }
        logService.log("You missed!");
   };
    Player.prototype.rnd = function(){
     return Math.floor(Math.random() * 100) + 1;
   };
    Player.prototype.getAccuracy = function(){
       return this.accuracy + (this.totalStat('dexterity') / 100);
   };
    Player.prototype.getCritChance = function(){
     return parseFloat(this.critChance + (this.totalStat('agility') / 250).toFixed(0));//To fixed(0) makes it so we gain 1% crit chance every 250 agi.
   };
    Player.prototype.getCritDamage = function(){
        //critical hit = ignore armor?
       return parseFloat(this.critDamage + (this.totalStat('strength') / 50 + this.totalStat('dexterity') / 20).toFixed(2)); //1.01 means 1% crit dmg
   };
    Player.prototype.accuracyCheck = function(){
       var baseAcc = 90;
       var acc = baseAcc + this.getAccuracy();
       return acc >= this.rnd();
   };
    Player.prototype.criticalCheck = function(dmg){
       var baseCrit = 5;
       var crit = baseCrit + this.getCritChance();
       return crit >= this.rnd() ? Math.floor(dmg * this.getCritDamage()) : dmg;
   };
    Player.prototype.takeDamage = function(val){
        if(val - this.defense > 0){
           this.health -= (val - this.defense);
           logService.log("You took " + (val - this.defense) + " damage.");
        }else {
            logService.log('Player defense is higher than enemy damage');
        }
       this.checkIfDead();
   };
    Player.prototype.checkIfDead = function(){
       if(this.health < 1){
           logService.log("you died :(");
           this.health = this.getMaxHealth();
           this.isDead = true;
       }
   };
    Player.prototype.equippedStat = function(stat){
       var equipped = this.inventory.equippedItems;
       var total = 0;
       for(var item in equipped){
           if(equipped.hasOwnProperty(item)){
               if(equipped[item].hasOwnProperty('stats')){
                   if(equipped[item].stats.hasOwnProperty(stat)){
                       total += equipped[item].stats[stat];
                   }
               }
           }
       }
       return total;
   };
    Player.prototype.addExperience = function(eLvl) {
        var pLvl = this.level;
        var expGain = Math.floor(eLvl * 20 / (((Math.abs(pLvl - eLvl) + 1)) * ((Math.abs(pLvl - eLvl) + 1))));
        this.experience += expGain;// can add multipliers etc
        logService.log("You gain " + expGain + " of experience");
        while (this.experience >= this.maxExperience) {
            logService.log("You gain a new level!");
            this.setLevel(this.level + 1);
            this.statPoints += 5;
            this.experience = this.experience - this.maxExperience;
            this.maxExperience = Math.floor(this.maxExperience * 1.1);
        }
    };
    var player = new Player();
    player.initStats();
   return player;
});