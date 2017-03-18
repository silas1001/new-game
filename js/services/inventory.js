/**
 * Created by Tarnos on 2017-01-01.
 */

lotfw.factory('Inventory', function(){
   var Inventory = function(){
       this.items = [];
       this.equippedItems = {weapon:{}, chest:{}, shield:{}, ring:{}};
   };
   Inventory.prototype.equip = function(id){
       //update player health based on % when equip/unequip items which change health/endurance...
       var item = filterItemId(this.items, id);//item we want to equip
       var index = this.items.indexOf(item, 0);
       var type = "subType";
       if(item.type === "weapon") {
           type = "type";
       }
       var eq = this.equippedItems[item[type]];
       if(eq.isEquipped){
           this.unequip(eq);
       }
       //remove item from inventory array after equipping, check requirements before doing so.
       item.isEquipped = true;
       this.equippedItems[item[type]] = item;//equip item
       this.items.splice(index, 1);
   };

   Inventory.prototype.unequip = function(item) {
        var type = item.type;
        if (item.type === "armor") {
           type = item.subType;
        }
        this.items.push(item);
        this.equippedItems[type] = {};
        this.equippedItems[type].isEquipped = false;
   };

   return new Inventory;
});

function filterItemId(obj, id){
    var item = obj.filter(function(e){
        return e.id === id;
    })[0];
    return item;
}