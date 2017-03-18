/**
 * Created by Tarnos on 2016-12-30.
 */

lotfw.factory('Herbalism', function(){
    var herbs = ['RusinsSinew', 'EssenceofWillow', 'SinnersDelight', 'BarletBark','Vystim', 'ThistleWart', 'LillyWisp'];
    var herbalism = function(){
        this.resources = {};
    };
    herbalism.prototype.init = function(){
        for(var i = 0; i < herbs.length; i++){
            this.resources[herbs[i]] = {};
            this.resources[herbs[i]].name = herbs[i];
            this.resources[herbs[i]].amount = 0;
        };
    };
    var profession = new herbalism();
    profession.init();
   return profession;
});