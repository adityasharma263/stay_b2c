

var app = angular.module('postserviceApp', []);
app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}

]);


app.controller('postserviceCtrl', function ($scope, $http) {

$scope.full_name = null;
$scope.dob_date = null;
$scope.dob_month = null;
$scope.dob_year = null;
$scope.gender = null;
$scope.home_address = null;
$scope.landmark = null;
$scope.email = null;
$scope.mobile = null;
$scope.degree = null;
$scope.work_experience = null;
$scope.school_name = null;
$scope.referral_person = null;
$scope.job_department = null;
$scope.cv = null;

$scope.postdata = function (full_name, dob_date,dob_month, dob_year, gender, home_address, landmark, email, mobile, degree, work_experience, school_name, referral_person, job_department, cv) {

var data = {

    full_name: full_name,
    dob_date: dob_date,
    dob_month: dob_month,
    dob_year: dob_year,
    gender: gender,
    home_address: home_address,
    landmark: landmark,
    email: email,
    mobile: mobile,
    degree: degree,
    work_experience: work_experience,
    school_name: school_name,
    referral_person: referral_person,
    job_department: job_department,
    cv: cv
};

//Call the services



$http.post('http://0.0.0.0:7000/api/v1/insert/job_create.php', JSON.stringify(data)).then(function (response) {

if (response.data)

$scope.msg = "Post Data Submitted Successfully!";

});

};

});

