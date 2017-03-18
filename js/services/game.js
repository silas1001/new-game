/**
 * Created by Tarnos on 2016-12-26.
 */

lotfw.factory('Game', function(EnemyList, logService){
   var Game = function() {
      this.stats = ['strength', 'endurance', 'dexterity', 'agility'];
      this.isLoaded = true;//set to false to show intro
      this.name = "Legend of the Fallen Warrior";
      this.id = 0;//item id
      this.enemyId = 0;
      this.startGame = function(){
          this.isLoaded = !this.isLoaded;
      };
   };

   Game.prototype.nextEnemy = function(){
       this.enemyId++;
       logService.log("Next enemy set to " + this.enemyId);
       if(EnemyList.enemies[this.enemyId]) return;//if enemy exist, return...
       this.enemyId--;
   };
   Game.prototype.prevEnemy = function(){
       this.enemyId--;
       if(EnemyList.enemies[this.enemyId]) return;
       this.enemyId++
   };
   Game.prototype.getCurrentEnemy = function(){
     return EnemyList.enemies[this.enemyId];
   };
   return new Game();
});