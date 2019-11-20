var app= angular.module('main', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'hotel/b2c_hotels/hotel.html',
        controller: 'homeCtrl'
    }).when('/login',{
        templateUrl: '..//hotel/b2c_hotels/login.html',
        controller: 'loginCtrl'
    }).when('/dashboard',{
        templateUrl: 'dashboard',
        controller: 'dashboardCtrl'
    })
    .otherwise({
        template:'404'
    })
});

app.controller('homeCtrl', function($scope){
    $scope.goToLogin = function(){
        $location.path('/login');
    };
    $scope.register = function(){
        $location.path('/register');
    }
});

app.controller('loginCtrl', function($scope, $http, $location){
    $scope.login = function(){
        var mobile = $scope.mobile;
        var password = $scope.password;
        $http({
            url: 'http://0.0.0.0:7000/api/v1/testlogin.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'mobile='+mobile+'&password='+password
        }).then(function(response){
            if(response.data.status == 'loggedin'){
                $location.path('/dashboard');
            }else{
                alert('Invalid Mobile Number Or Password');
            }
        })
    }
});