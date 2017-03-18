/**
 * Created by Tarnos on 2017-01-01.
 */

lotfw.factory('Equipment', function(){
    var Equipment = function(){
        this.weapon = {};
        this.chest = {};
        this.shield = {};
        this.ring = {};
    };

    return new Equipment();
});