/**
 * Created by Tarnos on 2017-01-06.
 */

lotfw.factory('Enemy', function(logService, Entity){
   function Enemy(obj){
       Entity.call(this, obj);
       //base stats add/subtract 10%/20% based on enemy "title"/rarity...BOSS/ANCIENT being highest rarity 50-100%
       //game difficulty also add/subtract % stat, cumulative/multiplicative(?) with title/rarity bonus.
       this.minHp = this.level * 20;
       this.maxHp = this.level * 30;
       this.minDefense = this.level * 2;
       this.maxDefense = this.level * 3;
       this.attackSpeed = 3;//attack every 1 second
       this.currentSpeed = 0;//current attack order
       /*
       drop table...add a property "maxRarity", {Rare} means it wont drop anything higher.
       Rarity increase itemLevel and item requirements, passing empty Rarity means it can drop all.
       Enemy level 10 = common lvl 8(if less than 0, then level 1), legendary level 12(min level) +- 2 levels,
       so common can be 8-10 in case of level 10 enemy

       How many kills on this enemy, use with Bestiary. Loop through all enemies to display "empty" list,
       1 kill = enemy name, 5 = level, 10 = health(should be min/max)*/
       this.killed = 0;
   }
   //Inherit from main object "Entity"
   Enemy.prototype = Object.create(Entity.prototype);
   Enemy.prototype.constructor = Enemy;
   Enemy.prototype.init = function(){
       //Make all stats a bit random, add properties, "min" "max" defense, health,
       //to display them in bestiary in the future, "current defense" or
       //just "defense" is calculated random defense stat.
       this.minDamage = this.level * 2;
       this.maxDamage = this.level * 3;
       this.defense = Math.floor(Math.random() * (this.maxDefense - this.minDefense + 1) + this.minDefense);
       //Min HP = level * 90, Max HP = level * 100;
       this.health = Math.floor(Math.random() * (this.maxHp - this.minHp + 1) + this.minHp);
       this.maxHealth = this.health;
   };
   Enemy.prototype.takeDamage = function(val){
       if(val - this.defense > 0){
           this.health -= (val - this.defense);
           logService.log("You deal " + (val - this.defense) + " damage");
       }else{
           logService.log('Enemy defense is higher than player damage');
       }
       if(this.health <= 0){
           this.isDead = true;
       }
   };
   Enemy.prototype.getDamage = function(){
       return Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1) + this.minDamage);
   };
   return Enemy;//return a constructor so we can create a new instance every time we spawn an enemy.
});