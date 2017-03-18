/**
 * Created by Tarnos on 2016-12-30.
 */

lotfw.factory('Mining', function(){
    var minerals = ['Thaumerite', 'LiteCyan', 'OhmStone', 'Techtite', 'XilBond', 'VulcanatedIron'];
    var mining = function(){
        this.resources = {};
    };
    mining.prototype.init = function(){
        for(var i = 0; i < minerals.length; i++){
            this.resources[minerals[i]] = {};
            this.resources[minerals[i]].name = minerals[i];
            this.resources[minerals[i]].amount = 0;
        };
    };
    var profession = new mining();
    profession.init();
    return profession;
});