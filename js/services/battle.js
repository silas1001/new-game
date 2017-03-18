/**
 * Created by Tarnos on 2017-01-06.
 */

lotfw.factory('Battle', function(Player, EnemyList, Game, logService){
   function Battle(){
       this.player = Player;
       this.selectedEnemy = 0;
       this.enemy = [];//Or enemies as an array...
   }
   Battle.prototype.spawnEnemies = function(id){
       var letter = ["A", "B", "C", "D", "E", "F", "G"];
       var random = Math.floor(Math.random() * 3) + 1;//1-3 enemies;
       this.enemy.length = 0;//remove all enemies, so we can init new(in case we had 3 enemies, but only spawn 1, then 2 others would stay, and we dont want that)
       for(var i = 0; i < random; i++){
           this.enemy[i] = {};
           this.enemy[i] = EnemyList.getEnemy(id);
           this.enemy[i].init();
           this.enemy[i].name += " " + letter[i];
       }
   };
   Battle.prototype.selectEnemy = function(index){
     this.selectedEnemy = index;
   };
   Battle.prototype.init = function(){
       //Add front line/back line, add purpose of long range weapons/front line tanks/spear weapon
       this.spawnEnemies(Game.enemyId);//will be based on player level or map id...might spawn multiple enemies based on level/map id
       //everytime we start a new battle call a Weather(?) service, which rolls a new weather, 10% for new, 90% for no change?, or 50% for clear.
       this.selectedEnemy = 0;//reset selected enemy when starting a new battle.
   };
   Battle.prototype.atbCheck = function(unit, dt){
       unit.currentSpeed += dt;
       if(unit.currentSpeed >= unit.attackSpeed) {
           unit.currentSpeed = unit.currentSpeed - unit.attackSpeed;
           return true;
       }
   };
   Battle.prototype.attack = function(dt){
       // var randEnemy = this.enemy[Math.floor(Math.random() * this.enemy.length)];//choose random enemy to attack
       if(this.atbCheck(this.player, dt)){
           var randEnemy = this.enemy[this.selectedEnemy];
           var playerDmg = Player.getDamage();
           randEnemy.takeDamage(playerDmg);
       }
       for(var i = this.enemy.length - 1; i >= 0; i--){
           var enemy = this.enemy[i];
           if(!enemy.isDead){
               if(this.atbCheck(enemy, dt)){
                   var dmg = enemy.getDamage();
                   Player.takeDamage(dmg);
               }
               if(Player.isDead) break;//stop loop when player dies
           }else{
               Player.addExperience(this.enemy[i].level);
               this.enemy.splice(i, 1);
               logService.log('Enemy is dead, ' + this.enemy.length + " enemies left");
           }
       }
   };

   return new Battle();//Will create "new" battle by passing certain values, such as map ID.
});