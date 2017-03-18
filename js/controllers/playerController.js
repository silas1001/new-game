/**
 * Created by Tarnos on 2016-12-26.
 */

lotfw.controller('PlayerController', function($scope, Player){
    //cant use methods since its refering to a nested object...might need to change that
    $scope.player = Player;
});