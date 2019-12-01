var app = angular.module('jobs', []);

app.controller('jobsCtrl', function($scope,$http,$window){
$scope.jobs = {};

$scope.onSubmit = function(){
    
    console.log("Submitted");
    console.log($scope.jobs)

    $http.post('http://partner.thetravelsquare.in/api/v1/insert/job_create.php', $scope.jobs).success(function (response) {
       
    });
};
});