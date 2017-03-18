/**
 * Created by Tarnos on 2017-01-01.
 */

lotfw.controller('InventoryController', function($scope, Inventory, itemDrop, $sce, logService){
    $scope.inventory = Inventory;
    $scope.id = 0;
    $scope.itemDrop = itemDrop;
    $scope.addRandomItem = function(obj) {
        // var item = $scope.itemDrop.dropItemByName(obj);//drop item by name ex. "Short Sword"
        // var randomType = $scope.itemDrop.searchItemType(obj);//Random item by type ex. "Sword, Axe, Weapon, Accessory, Equipment(weapons/armor/accessories) etc.
        // var randomItem = $scope.itemDrop.randomItemNearLevel(randomType, 1);//Random item by level based on type
        var rand = Math.floor(Math.random() * 80) + 1;
        var randomItem = $scope.itemDrop.dropItem(obj, rand);
        if(!randomItem) return; // return if we dont drop an item
        logService.log("Created: " + randomItem.name + " : " + rand);
        //Combining randomType + near level, allows for nice item drop tables for monsters.
        randomItem.id = $scope.id;
        $scope.id++;
        $scope.inventory.items.push(randomItem);
    };

    var trusted = {};
    $scope.itemTooltip = function(eq) {
        var html ="";
        html += "<div class='row'>";
        html += "<div class='col-xs-10 col-xs-offset-1'>";
        html += eq.name + " " + eq.type + " " + eq.subType;
        html += "</div>";
        html += "<div class='col-xs-10 col-xs-offset-1'>";
        html += eq.rarity;
        html += "</div>";
        html += "<div class='col-xs-10 col-xs-offset-1'>";
        html += "Item level: " + eq.ilvl;
        html += "</div>";
        html += "</div>";
        for(var stat in eq.stats){
            if(eq.stats.hasOwnProperty(stat)){
                html += "<div class='row'>";
                html += "<div class='col-xs-10 col-xs-offset-1'>" + stat + " " + eq.stats[stat];
                html += "</div></div>";
            }
        }
        return trusted[html] || (trusted[html] = $sce.trustAsHtml(html));
    }
});