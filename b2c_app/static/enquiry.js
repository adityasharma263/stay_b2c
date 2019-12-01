var app = angular.module('enquiryApp', []);


app.controller('hotelEnqCtrl', function($scope,$http){
$scope.hotel = {};

$scope.hotelSubmit = function(){
    console.log("Submitted");
    console.log($scope.hotel);


    $http.post('http://partner.thetravelsquare.in/api/v1/insert/hotel_enquiry.php', $scope.hotel).success
};
});
