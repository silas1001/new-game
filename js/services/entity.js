/**
 * Created by Tarnos on 2017-01-15.
 */

lotfw.factory("Entity", function(){
    //Used to store shared values/methods between player, enemy and perhaps other entities in the future.
   function Entity(obj){
       var obj = obj || {};
       this.name = obj.name || "Default Name";
       this.level = obj.level || 1;
       this.isDead = false;
   }

   Entity.prototype.setName = function(val){
       this.name = val;
   };

   Entity.prototype.setLevel = function(val){
     this.level = val;
   };
   return Entity;
});