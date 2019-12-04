var app = angular.module('loginApp', []);

app.controller('loginCtrl', function($scope, $http) {

    $scope.submit = function() {
     // alert("SUBMIT "+$scope.regObj.username);
      var stat="false";
    angular.forEach($scope.mydata, function(customer){
        // alert(item.email);  
        if((customer.mobile==$scope.login.mobile)&&(customer.password==$scope.login.password))
        {
        stat="true";
        }


    });
    $scope.login.mobile="";
    $scope.login.password="";
      if(stat=="true")
       window.location.href="http://thetravelsquare.in/dashboard";
      else
        alert("Failure");
      };
      
     $scope.login = {
                "username" : "",
                "password" : ""
                
            };
    $scope.mydata;
      $http.get("http://partner.thetravelsquare.in/api/v1/customer.php")
      .then(function(response) {
          $scope.mydata = response.data;
           angular.forEach($scope.mydata, function(customer){
                      // alert(item.email);  
                   })
          
      });
      
      
    });