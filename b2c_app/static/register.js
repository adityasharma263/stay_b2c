var app = angular.module('register', []);

app.controller('registerCtrl', function($scope,$http){
$scope.register = {};

$scope.onSubmit = function(){
    console.log("Submitted");
    console.log($scope.register);

    $http.post('http://0.0.0.0:7000/api/v1/insert/register.php', $scope.register).success
};
});