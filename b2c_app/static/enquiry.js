var app = angular.module('enquiryApp', []);


app.controller('hotelEnqCtrl', function($scope,$http){
$scope.hotel = {};
$scope.hotel.descrip = "Enter Description if Any";

$scope.hotelSubmit = function(){
    console.log("Submitted");
    console.log($scope.hotel);


    $http.post('http://partner.thetravelsquare.in/api/v1/insert/hotel_enquiry.php', $scope.hotel).success
};
});


app.controller('flightEnqCtrl', function($scope,$http){
    $scope.flight = {};
    $scope.flight.descrip = "Enter Description if Any";

$scope.flightSubmit = function(){
    console.log("Submitted");
    console.log($scope.flight);


    $http.post('http://partner.thetravelsquare.in/api/v1/insert/flight_enquiry.php', $scope.flight).success
};
});

app.controller('cabEnqCtrl', function($scope,$http){
    $scope.cabs = {};
    $scope.cabs.descrip = "Enter Description if Any";

$scope.cabSubmit = function(){
    console.log("Submitted");
    console.log($scope.cabs);


    $http.post('http://partner.thetravelsquare.in/api/v1/insert/cab_enquiry.php', $scope.cabs).success
};
});

app.controller('packageEnqCtrl', function($scope,$http){
    $scope.package = {};
    $scope.package.descrip = "Enter Description if Any";

$scope.packageSubmit = function(){
    console.log("Submitted");
    console.log($scope.package);


    $http.post('http://partner.thetravelsquare.in/api/v1/insert/package_enquiry.php', $scope.package).success
};
});