/**
 * Created by Tarnos on 2016-12-19.
 */

//Consider using multiple controllers for each game part, view/inventory/battle...
lotfw.controller("MainController", function($scope, Game, Player, Battle, logService){
    $scope.Game = Game;
    $scope.player = Player;
    $scope.Battle = Battle;
    $scope.log = logService;//used to display log on screen
    $scope.gameViews = [
        {name: 'stats', href: '', icon:'fa fa-bar-chart fa-lg', hovering: false, hoverClass: 'fa-2x'},
        // {name: 'spells', href: 'spells',icon:'fa fa-book fa-lg', hovering: false, hoverClass: 'fa-2x'},
        // {name: 'skills', href: 'skills',icon:'fa fa-university fa-lg', hovering: false, hoverClass: 'fa-2x'},
        // {name: 'professions', href: 'professions', icon:'fa fa-compass fa-lg', hovering: false, hoverClass: 'fa-2x'},
        // {name: 'options', href: 'options',icon:'fa fa-cog fa-lg', hovering: false, hoverClass: 'fa-spin fa-2x'},
        // {name: 'credits', href: 'credits',icon:'fa fa-list-alt fa-lg', hovering: false, hoverClass: 'fa-2x'},
        {name: 'debug', href: 'debug',icon:'fa fa-list-alt fa-lg', hovering: false, hoverClass: 'fa-2x'},
        {name: 'chat', href: 'chat',icon:'fa fa-commenting-o', hovering: false, hoverClass: 'fa-2x'}
    ];
    $scope.isHovering = function(e){
        var c = e.icon;
        return (e.hovering) ? (c + " " + e.hoverClass) : c;
    };
    //TO DO: add a view for dev, with buttons to add item/gold etc
    //might also include some debug info
});