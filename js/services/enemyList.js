/**
 * Created by Tarnos on 2017-01-06.
 */

lotfw.factory('EnemyList', function(Enemy){
    function Enemies(){
        this.area = "";
        this.text = [];
        this.enemies = [
        ]
    }
    Enemies.prototype.add = function(name, level, isBoss){
        var enemy = {
            name: name,
            level: level,
            isBoss: isBoss || false,
            area: this.area,
            text: this.text,
            textRead: false
        };
        this.enemies.push(enemy);
    };
    Enemies.prototype.getEnemy = function(id){
        //Add loop here, and return an array of multiple enemies; if id = enemy with "Boss" == true;
      var enemy = this.enemies[id];
      return new Enemy(enemy);
    };
    Enemies.prototype.init = function(){
        //create enemies based on a map;
        //Set group so we can reference it and add enemies

        /*

            ADD JSON FILE INSTEAD OF THIS MESS!!!!!

        */

        //Varik Avarice
        this.area = "Varik Avarice";
        //separate areas into further "sub areas"
        //Varik Outer
        //Varik Inner
        //Varik Lair?Boss Area/ object: { locked: true }, unlock by other means
        //Varik Key = use/auto use/ "key item" unlock boss map = kill boss = open Narsus Forest.
        //Game mode which does not require unlocking map, all is unlocked at the beginning.
        this.add("Varik Grunt", 1);
        this.text = ["You just beat up a bunch of potential recruits and think that you " +
        "are some tough guy now, well let us show you what tough guys get around here."];
        this.add("Varik Soldier", 3);
        this.add("Varik Marksmen", 5);
        this.add("Varik Vulture", 7);
        this.add("Varik Evader", 9);
        this.add("Variks Liar", 11);
        this.add("Variks Queen", 13);
        this.add("Lord Varik", 15, true);

        //Narsus Forest
        this.area = "Narsus Forest";
        this.add("Narsus", 17, true);
        this.add("Jotunn Scout", 17, true);
    };
    var enemies = new Enemies();
    enemies.init();
    return enemies;
});