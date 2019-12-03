var app = angular.module('jobs', []);

app.controller('jobsCtrl', function($scope,$http,$window){
$scope.jobs = {};

$scope.onSubmit = function(){
    
    console.log("Submitted");
    console.log($scope.jobs)

    $http.post('http://0.0.0.0:7000/api/v1/insert/job_create.php', $scope.jobs).success(function (response) {
       
    });
};
});