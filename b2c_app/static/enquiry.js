
var app = angular.module('enquiryApp', []);

app.controller('hotelEnquiryCtrl', function ($scope, $http) {

$scope.mobile = null;
$scope.city = null;
$scope.hotel_name = null;
$scope.check_in = null;
$scope.check_out = null;
$scope.enquiry_type = null;
$scope.meal_plan = null;
$scope.rooms = null;
$scope.room_category = null;
$scope.total_pax = null;
$scope.adults = null;
$scope.child = null;
$scope.child_age = null;
$scope.descrip = null;
$scope.types = null;
$scope.origin = "customer";

$scope.postdata = function (mobile, city, hotel_name, check_in, check_out, enquiry_type, meal_plan, rooms, room_category, total_pax, adults, child, child_age, descrip, types, origin) {

var data = {

    mobile: mobile,
    city: city,
    hotel_name: hotel_name,
    check_in: check_in,
    check_out: check_out,
    enquiry_type: enquiry_type,
    meal_plan: meal_plan,
    rooms: rooms,
    room_category: room_category,
    total_pax: total_pax,
    adults: adults,
    child: child,
    child_age: child_age,
    descrip: descrip,
    types: types,
    origin: origin
};

//Call the services



$http.post('0.0.0.0:8000/api/v1/insert/create.php', JSON.stringify(data)).then(function (response) {

if (response.data)

$scope.msg = "Post Data Submitted Successfully!";

});

};

});