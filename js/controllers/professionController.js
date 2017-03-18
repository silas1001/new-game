/**
 * Created by Tarnos on 2016-12-29.
 */

lotfw.controller('ProfessionController', function($scope, Mining, Herbalism){
   $scope.profession =
       {
          mining: Mining,
          herbalism: Herbalism
       };
});