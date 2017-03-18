/**
 * Created by Tarnos on 2017-01-01.
 */

lotfw.factory('itemTable', function(logService){
   function ItemTable() {
       this.group = "";//current group used when adding items to the table.
       this.currentType = ""; //store item type currently being created.
       this.currentSubType = "";
       this.preferedStat = [];
       //read from json file, item image = item level(20 or less, 40 or less) + Rarity = image src
       //Common_Axe_0_20, Common_Axe_20_40, easy
       //unique items, unique names "Narsus_Spike"
       this.itemRarities = ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Uber', 'Legendary'];
       this.itemTypes =
           {
               weapon: ['sword', 'axe', 'mace', 'bow', 'crossbow', 'staff', 'dagger', 'wand'],
               armor: ['shield']
           };
       this.items =
           {
               equipment: {}
           };
   }
    ItemTable.prototype.addItem = function(name, ilvl, img){
        var item = {};
        item.name = name;
        item.ilvl = ilvl;
        item.type = this.currentType;
        item.subType = this.currentSubType;
        item.preferedStat = this.preferedStat;
        if(img.constructor === Array){
            var rand = img[Math.floor(Math.random() * img.length)];
            item.img = rand;
        }else{
            item.img = img;
        }
        //generate other stats before pushing or pass base value.
        this.group.push(item);
    };
   ItemTable.prototype.createEmptyTable = function(){
       for(var key in this.itemTypes){
           if(this.itemTypes.hasOwnProperty(key)){
               this.items.equipment[key] = {};
               for(var i = 0; i < this.itemTypes[key].length; i++){
                   this.items.equipment[key][this.itemTypes[key][i]] = [];
               }
           }
       }
   };
   ItemTable.prototype.init = function(){
       //Create prefered stats for each item type, this will make those stats appear more often
       var swords = ['strength', 'dexterity'],
           axes = ['strength', 'endurance'],
           daggers = ['agility', 'dexterity'],
           maces = ['endurance', 'wisdom'],
           staves = ['intelligence', 'wisdom'],
           wands = ['intelligence', 'agility'],
           bows = ['agility', 'strength'],
           crossbows = ['dexterity', 'endurance'],
           shields = ['endurance', 'dexterity'];
       //Init item table with all items, might load JSON file for that.
       //Create empty object which can be filled with items:
       this.createEmptyTable();

       /* Weapons */
       this.currentType = "weapon";

       //Load Swords
       this.group = this.items.equipment.weapon.sword;
       this.currentSubType = "sword";
       this.preferedStat = swords;
       this.addItem('Short Sword', 1, ['Sword01', 'Sword02']);//third affix is part of css class name, which picks image from spritesheet
       this.addItem('Bronze Sword', 3, 'Sword03');
       this.addItem('Iron Sword', 5, 'Sword04');
       this.addItem('Steel Sword', 8, ['Sword05', 'Sword08']);
       this.addItem('Broad Sword', 12, 'Sword06');
       this.addItem('Scimitar', 15, 'Sword07');
       this.addItem('Katana', 18, 'Sword16');
       this.addItem('Ice Katana', 20, 'Sword16_b');
       this.addItem('Blood Katana', 20, 'Sword16_c');
       this.addItem('Black Katana', 20, 'Sword16_a');
       this.addItem('Dark Katana', 20, 'Sword13');
       this.addItem('Dark Sword', 25, 'Sword25');
       this.addItem('Emerald Sword', 30, 'Sword26_a');
       this.addItem('Evil Sword', 35, 'Sword21_a');
       this.addItem('Golden Sword', 40, 'Sword22_a');
       this.addItem('Ice Sword', 45, 'Sword21');
       this.addItem('Blood Sword', 50, 'Sword22');
       this.addItem('Bone Sword', 55, 'Sword25');
       this.addItem('Devil Sword', 66, 'Sword31');
       this.addItem('Buster Sword', 77, 'Sword17');

       //Load Axes
       this.group = this.items.equipment.weapon.axe;
       this.currentSubType = "axe";
       this.preferedStat = axes;
       this.addItem('Stone Axe', 1, 'Axe01');
       this.addItem('Iron Axe', 4, 'Axe02');
       this.addItem('Hatchet', 7, 'Axe17');
       this.addItem('Hand Scythe', 11, 'Axe11');
       this.addItem('Great Axe', 15, 'Axe05');
       this.addItem('Double Axe', 19, 'Axe03');
       this.addItem('Large Axe', 24, ['Axe13', 'Axe04']);
       this.addItem('Giant Axe', 28, ['Axe08', 'Axe13']);
       this.addItem('War Axe', 33, ['Axe09', 'Axe09_a']);
       this.addItem('Battle Axe', 38, ['Axe07','Axe12']);
       this.addItem('Large Scythe', 43, 'Axe06');
       this.addItem('Venom Scythe', 48, 'Axe06_a');
       this.addItem('Crescent Axe', 53, 'Axe14');
       this.addItem('Ice Crescent Axe', 58, 'Axe14_a');
       this.addItem('Holy Axe', 64, 'Axe16_a');
       this.addItem('Cursed Axe', 70, 'Axe16');

       //Load Maces
       this.group = this.items.equipment.weapon.mace;
       this.currentSubType = "mace";
       this.preferedStat = maces;
       this.addItem('Wooden Mace', 1, ['Mace01', 'Mace03']);
       this.addItem('Spiked Mace', 3, ['Mace02', 'Mace04']);
       this.addItem('Small Hammer', 5, 'Mace06');
       this.addItem('Steel Mace', 8, 'Mace08');
       this.addItem('Morning Star', 11, ['Mace05', 'Mace07']);
       this.addItem('Dark Mace', 14, 'Mace09');
       this.addItem('Large Dark Mace', 19, 'Mace17');
       this.addItem('Death Mace', 25, 'Mace15');
       this.addItem('Holy Mace', 31, 'Mace15_a');
       this.addItem('Large Death Mace', 36, 'Mace14');
       this.addItem('Large Holy Mace', 42, 'Mace14_a');
       this.addItem('Undead Mace', 47, 'Mace18');
       this.addItem('Venom Mace', 52, 'Mace18_a');
       this.addItem('Fiery Mace', 56, 'Mace12_a');
       this.addItem('Blood Mace', 61, 'Mace21');
       this.addItem('Evil Mace', 66, 'Mace21_a');

       //Load Daggers
       this.group = this.items.equipment.weapon.dagger;
       this.currentSubType = "dagger";
       this.preferedStat = daggers;
       this.addItem('Dirk', 1, 'Dagger01');
       this.addItem('Iron Knife', 2, 'Dagger04');
       this.addItem('Steel Knife', 4, 'Dagger05');
       this.addItem('Steel Dagger', 7, 'Dagger06');
       this.addItem('Kunai', 10, 'Dagger09');
       this.addItem('Bone Knife', 14, 'Dagger15');
       this.addItem('Bronze Kris', 19, 'Dagger03');
       this.addItem('Iron Kris', 24, 'Dagger08');
       this.addItem('Blood Dagger', 30, 'Dagger21_a');
       this.addItem('Emerald Dagger', 36, 'Dagger21');
       this.addItem('Dark Dagger', 41, 'Dagger24');
       this.addItem('Fire Dagger', 45, 'Dagger25');
       this.addItem('Ice Dagger', 50, 'Dagger25_b');
       this.addItem('Fanged Knife', 53, 'Dagger23');
       this.addItem('Venom Dagger', 57, 'Dagger25_a');
       this.addItem('Golden Kris', 61, 'Dagger21_b');
       this.addItem('Holy Dagger', 64, 'Dagger22');
       this.addItem('Dark Steel Knife', 69, 'Dagger24');
       this.addItem('Legend Spike', 77, 'Dagger26');



       //Load Wands
       this.group = this.items.equipment.weapon.wand;
       this.currentSubType = "wand";
       this.preferedStat = wands;
       this.addItem('Wand', 1, ['Wand01', 'Wand02']);
       this.addItem('Yew Wand', 3, 'Wand08');
       this.addItem('Bone Wand', 6, 'Wand03');
       this.addItem('Grim Wand', 9, 'Wand11');
       this.addItem('Eagle Orb', 14, 'Wand04');
       this.addItem('Sacred Wand', 20, 'Wand09');
       this.addItem('Glowing Orb', 24, 'Wand04_a');
       this.addItem('Dark Wand', 30, 'Wand06');
       this.addItem('Evil Wand', 37, 'Wand05_b');
       this.addItem('Burning Wand', 42, 'Wand05_a');
       this.addItem('Freezing Wand', 49, 'Wand05');
       this.addItem('Venom Wand', 55, 'Wand07');
       this.addItem('Cedar Wand', 62, 'Wand10_b');
       this.addItem('Heavenly Stone', 70, 'Wand12');

       //Load Staves
       this.group = this.items.equipment.weapon.staff;
       this.currentSubType = "staff";
       this.preferedStat = staves;
       this.addItem('Wooden Stick', 1, 'Staff01');
       this.addItem('Gnarled Staff', 3, 'Staff02');
       this.addItem('Cedar Staff', 6, 'Staff04');
       this.addItem('Bone Staff', 10, 'Staff07');
       this.addItem('War Staff', 14, 'Staff16');
       this.addItem('Venom Staff', 18, 'Staff12');
       this.addItem('Dark Staff', 24, 'Staff03_b');
       this.addItem('Fire Staff', 30, 'Staff03_a');
       this.addItem('Ice Staff', 35, 'Staff03');
       this.addItem('Rune Staff', 41, 'Staff08');
       this.addItem('Holy Staff', 48, 'Staff17');
       this.addItem('Death Staff', 55, 'Staff18');

       //Load Bows
       this.group = this.items.equipment.weapon.bow;
       this.currentSubType = "bow";
       this.preferedStat = bows;
       this.addItem('Short Bow', 1, 'Bow01');
       this.addItem('Short War Bow', 4, 'Bow02');
       this.addItem('Short Battle Bow', 8, 'Bow04');
       this.addItem('Long Bow', 12, 'Bow05');
       this.addItem('Long War Bow', 16, 'Bow06');
       this.addItem('Long Battle Bow', 20, 'Bow07');
       this.addItem('Hunter\'s Bow', 24, ['Bow08', 'Bow08_a']);
       this.addItem('Double Bow', 28, ['Bow09', 'Bow09_c']);
       this.addItem('Composite Bow', 32, ['Bow11', 'Bow11_a']);
       this.addItem('Cedar Bow', 36, ['Bow15', 'Bow15_a']);
       this.addItem('Great Bow', 40, 'Bow10');
       this.addItem('Spider Bow', 44, 'Bow16');
       this.addItem('Hydra Bow', 48, 'Bow14');
       this.addItem('Razor Bow', 52, ['Bow13', 'Bow13_a']);
       this.addItem('Blood Razor Bow', 56, 'Bow14_a');
       this.addItem('Rune Bow', 60, 'Bow12');
       this.addItem('Dark Bow', 66, 'Bow12_c');
       this.addItem('Dark Rune Bow', 77, 'Bow17');

       //Load Crossbows
       this.group = this.items.equipment.weapon.crossbow;
       this.currentSubType = "crossbow";
       this.preferedStat = crossbows;
       this.addItem('Crossbow', 1, 'Crossbow01_a');
       this.addItem('Large Crossbow', 5, 'Crossbow02_a');
       this.addItem('Light Crossbow', 10, 'Crossbow03_a');
       this.addItem('Heavy Crossbow', 15, 'Crossbow04_a');
       this.addItem('Repeating Crossbow', 20, 'Crossbow05_a');
       this.addItem('Siege Crossbow', 25, 'Crossbow06_b');
       this.addItem('Gold Siege Crossbow', 30, 'Crossbow06_c');
       this.addItem('Ballista', 35, 'Crossbow07_b');
       this.addItem('Venom Crossbow', 40, 'Crossbow07_c');
       this.addItem('Gorgon Crossbow', 45, 'Crossbow08');
       this.addItem('Dark Crossbow', 50, 'Crossbow09_a');
       this.addItem('Demon Crossbow', 55, 'Crossbow10');


       /* ARMORS / SHIELDS */
        this.currentType = "armor";

       //Load Shields
       this.group = this.items.equipment.armor.shield;//might call it offhand/secondary
       this.currentSubType = "shield";
       this.preferedStat = shields;
       this.addItem('Wooden Buckler', 1, 'Shield01');
       this.addItem('Steel Buckler', 3, 'Shield10');
       this.addItem('Targe', 6, 'Shield12');
       this.addItem('Tower Shield', 10, 'Shield04');
       this.addItem('Steel Shield', 14, ['Shield06', 'Shield06_a']);
       this.addItem('Spiked Shield', 19, ['Shield26', 'Shield26_a']);
       this.addItem('Knight Shield', 25, 'Shield13');
       this.addItem('Bone Shield', 32, 'Shield17');
       this.addItem('Cursed Shield', 39, ['Shield07', 'Shield11']);
       this.addItem('Cursed Wood Shield', 44, 'Shield19');
       this.addItem('Ice Shield', 50, 'Shield18');
       this.addItem('Grim Shield', 60, 'Shield20');
       this.addItem('Dragon Shield', 70, 'Shield23');

   };
   var item = new ItemTable();
    item.init();
   return item;
});

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
}