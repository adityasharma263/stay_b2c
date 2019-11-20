var app = angular.module('stay', ['angular.filter'])
    .config(['$interpolateProvider',"$locationProvider", function ($interpolateProvider, $locationProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }])

    .controller('stayController', ["$scope", "$http", "$filter", "$location", function ($scope, $http, $filter, $location) {
        $scope.hotel = {};
        $scope.showSearchResult = false;
        $scope.resp = false;
        var searchKey = 'city';
        // $scope.hotel.ci = new Date();
            $scope.hotel.ci = new Date();
        // $scope.hotel.co = new Date();
            $scope.hotel.co = new Date();
    // }
        $scope.hotel.co.setDate($scope.hotel.co.getDate() + 1);

        

        

        $scope.result = function (data, status) {
            $scope.hotel.search = data;
            searchKey = status;
            // $scope.getHotel();
            $scope.showSearchResult = false;

        }

        $scope.show = function () {
            if ($scope.showSearchResult == false) {
                $scope.showSearchResult = true;
            }
            else {
                $scope.showSearchResult = false;
            }
        }


        var jsonToQueryString = function (json) {
            return '?' +
                Object.keys(json).map(function (key) {
                    if (json[key]) {
                        return encodeURIComponent(key) + '=' +
                            encodeURIComponent(json[key]);
                    } else {
                        return '';
                    }
                }).join('&');
        };


        $scope.getHotel = function () {
            // console.log("$location.path",$location.path);
            $scope.location = document.location.href;
            $scope.hotel.ci = Date.parse($scope.hotel.ci) / 1000;
            $scope.hotel.co = Date.parse($scope.hotel.co) / 1000;
            if (searchKey == 0) {
                $scope.message = 'enter valid location ';
            }
            console.log("hotel CI",$scope.hotel.ci);
            console.log("hotel CO",$scope.hotel.co);
            window.open($scope.location + "/list?" + searchKey + "=" + $scope.hotel.search + '&' + 'ci' + '=' + $scope.hotel.ci + '&' + 'co' + '=' + $scope.hotel.co, '_self');
        };

        $scope.search = function () {
            $scope.hotel.search = $scope.hotel.search.toLowerCase();
            $http({
                method: 'POST',
                url: api_url + '/api/v1/hotel/search',
                data: $scope.hotel

            }).then(function successCallback(response) {
                $scope.cities = response.data.result.cities;
                $scope.names = response.data.result.names;
                if ($scope.cities.length == 0 && $scope.names.length != 0) {
                    searchKey = 'name';
                }
                if ($scope.cities.length != 0 && $scope.names.length == 0) {
                    searchKey = 'city';
                }
                if ($scope.cities.length != 0 && $scope.names.length != 0) {
                    searchKey = 'city';
                }
            })

        };

        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel/b2b'
        }).then(function successCallback(response) {
            $scope.hotels = response.data.result.hotel;
            for (var j = 0; j < $scope.hotels.length; j++) {
                $scope.hotelid[$scope.hotels[j].id] = $scope.hotels[j];
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })


        //  }
    }])

    .controller('stayListController', ["$scope", "$window", "$filter", "$http","$location", function ($scope, $window, $filter, $http, $location) {
        
        $scope.hotelid = {};
        $scope.room = {};
        $scope.id = [];
        $scope.hotel = {
            rating: null,
            star: null,
            price_start: null,
            price_end: null,
            page: 1
        };
        $scope.limit = 10;
        $scope.loadMoreLimit = 5;
        $scope.showSearchResult = false;
        $scope.result = false;
        $scope.deals = [];
        $scope.imagesData = {};
        $scope.min = 200;
        $scope.max = 100000;

        $scope.minimumPriceForFilter = 200;

        //----------------------- List View Searching... ---------------------//

        $scope.resp = false;
        var searchKey = 'city';
        $scope.hotel.ci = new Date();
        $scope.hotel.co = new Date();
        $scope.hotel.co.setDate($scope.hotel.co.getDate() + 1);
        
        $scope.result = function (data, status) {
            $scope.hotel.search = data;
            searchKey = status;
            $scope.getHotel();

        }

        $scope.show = function () {
            if ($scope.showSearchResult == false) {
                $scope.showSearchResult = true;
            }
            else {
                $scope.showSearchResult = false;
            }
        }
        var jsonToQueryString = function (json) {
            return '?' +
                Object.keys(json).map(function (key) {
                    if (json[key]) {
                        return encodeURIComponent(key) + '=' +
                            encodeURIComponent(json[key]);
                    } else {
                        return '';
                    }
                }).join('&');
        };

        $scope.getHotel = function () {
            // console.log("$location.path",$location.path);
            $scope.location = document.location.href;
            $scope.hotel.ci = Date.parse($scope.hotel.ci) / 1000;
            $scope.hotel.co = Date.parse($scope.hotel.co) / 1000;
            if (searchKey == 0) {
                $scope.message = 'enter valid location ';
            }

            window.open("/hotel" + "/list?" + searchKey + "=" + $scope.hotel.search + '&' + 'ci' + '=' + $scope.hotel.ci + '&' + 'co' + '=' + $scope.hotel.co,'_self');
        };

        $scope.search = function () {
            $scope.hotel.search = $scope.hotel.search.toLowerCase();
            $http({
                method: 'POST',
                url: api_url + '/api/v1/hotel/search',
                data: $scope.hotel

            }).then(function successCallback(response) {
                $scope.cities = response.data.result.cities;
                $scope.names = response.data.result.names;
                if ($scope.cities.length == 0 && $scope.names.length != 0) {
                    searchKey = 'name';
                }
                if ($scope.cities.length != 0 && $scope.names.length == 0) {
                    searchKey = 'city';
                }
                if ($scope.cities.length != 0 && $scope.names.length != 0) {
                    searchKey = 'city';
                }
            })

        };

        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel/b2b'
        }).then(function successCallback(response) {
            $scope.hotels = response.data.result.hotel;
            for (var j = 0; j < $scope.hotels.length; j++) {
                $scope.hotelid[$scope.hotels[j].id] = $scope.hotels[j];
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })

    //------------------------End Of Searching... ------------------------//

    
        $scope.amenities = {};

//       get array for the particular num  used to show amenities dynamically
         $scope.getNumber = function(num) {
         return new Array(num);

        };

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        var urlParams = $location.search();
        console.log("urlParams ", urlParams);
        $scope.loadmoredeals = function () {
            $scope.loadMoreLimit = $scope.loadMoreLimit + 5;
        };

        $scope.hotelData = [];

        $scope.getHotelsData = function (cb) {

            if (!cb) $scope.hotel.page = 1;

            let searchURL = api_url + '/api/v1/hotel/search' + document.location.search


            Object.keys($scope.hotel).forEach(function (param) {
                if ($scope.hotel[param])
                    searchURL += `&${param}=${$scope.hotel[param]}`;
            });

            console.log("I am in the getHotelsData, ",urlParams);
            $http({
                method: 'GET',
                url: api_url + '/api/v1/hotel/list/b2b',
                params: urlParams
            }).then(function (res) {

                if (cb) {
                    cb(res);
                } else {
                    $scope.hotelData = res.data.result.hotel;
                    console.log($scope.hotelData);
                }
            })
        }

// =========== Filters ================
        $scope.amenityFilter = function() {

            console.log($scope.amenities);


            applyFilterAndReload($scope.amenities);

            return;

            // using spread operator(... (3 dots)) to concat two json objects
            urlParams = {...urlParams , ...$scope.amenities};
            $scope.getHotelsData();
            
        };


        $scope.checkInCheckOutFilter = function(){
        
            var checkinDate = $("#dp1566640682637").val();
            var checkoutDate = $("#dp1566640682638").val();

            var checkinTimestamp = new Date(checkinDate).getTime()/1000;

            

            var checkoutTimestamp = new Date(checkoutDate).getTime()/1000;

            if(!checkinTimestamp){
                return alert("Check-in Date is not valid!");
            }

            if(!checkoutTimestamp){
                return alert("Check-out Date is not valid!");
            }
            var currentPageUrlQueryString =  $location.search();

            console.log(currentPageUrlQueryString);

            currentPageUrlQueryString.ci = checkinTimestamp;
            currentPageUrlQueryString.co = checkoutTimestamp;

            applyFilterAndReload(currentPageUrlQueryString);

        };


        $scope.priceFilter = function(){


            var priceFilterObject = {};

            priceFilterObject.price_start =  $scope.minimumPriceForFilter;

            priceFilterObject.price_end = $scope.hotel.price_end;

            applyFilterAndReload(priceFilterObject);

        };


        function applyFilterAndReload(filterObject){
            var newFilter = $.extend($location.search(), filterObject);
            for(var amenity in newFilter){
                if(newFilter[amenity] == "false" || newFilter[amenity] == false){
                    delete newFilter[amenity];
                }
            }
            var newUrl = window.location.href.split('?')[0] + "?"+$.param(newFilter);
            window.location.href = newUrl;
        }


        $scope.fillFilterValuesInHTML = function(){
            
            var queryParams = JSON.parse(JSON.stringify($location.search()));

            // console.log(queryParams);
            // console.log("getFormattedDate(queryParams.ci) = ",getFormattedDate(queryParams.ci));
            
            if (queryParams.price_end)
                $scope.hotel.price_end = parseInt(queryParams.price_end);

            delete queryParams.price_end;

            console.log(queryParams);
            

            for(var amenityFromUrl in queryParams){

                if(queryParams[amenityFromUrl] == "true"){
                    $scope.amenities[amenityFromUrl] = true;
                    console.log(amenityFromUrl);
                }

            }

            var setCheckinDateVal = document.getElementById("dp1566640682637");
            var setCheckoutDateVal = document.getElementById("dp1566640682638");

            setCheckinDateVal.value = getFormattedDate(queryParams.ci);
            setCheckoutDateVal.value = getFormattedDate(queryParams.co);

            delete queryParams.ci;
            delete queryParams.co;

            function getFormattedDate(timestamp){

                var d = new Date(parseInt(timestamp.trim()+"000"));

                console.log(parseInt(timestamp.trim()+"000"));

                var month =   d.getMonth();
                var year =  d.getFullYear();
                var date =  d.getDate();
                var dateString = month+"/"+date+"/"+year;
                console.log(dateString);
                return dateString;
            }
        };

        setTimeout($scope.fillFilterValuesInHTML,500);
        

//============ Filter End ========== 

        $scope.loadMoreHotelsData = function () {
            $scope.hotel.page = $scope.hotel.page + 1;

            $scope.getHotelsData(function (res) {
                $scope.hotelData = $scope.hotelData.concat(res.data.result.hotel);
            });

        }

        $scope.getHotelsData();
        $scope.show = function () {
            if ($scope.showSearchResult == false) {
                $scope.showSearchResult = true;
            }
            else {
                $scope.showSearchResult = false;
            }
        }

        $scope.checkErr = function () {
            $scope.errMessage = '';
            $scope.curDate = new Date();

            var check_in = $scope.hotel.check_in;
            console.log("check in",check_in); 
            if ($scope.hotel.check_in == undefined) {
                $scope.hotel.check_in = check_in;
            }

            if (new Date($scope.hotel.check_in) > new Date($scope.hotel.check_out)) {
                $scope.errMessage = 'End Date should be greater than start date';
                return false;
            }
            if (new Date($scope.hotel.check_in) < $scope.curDate) {
                $scope.errMessage = 'Start date should not be before today.';
                return false;
            }

        }




        $scope.getHotels = function () {
            var pathname = window.location.pathname;
            var appId = pathname.split('/')[6];
            $scope.location = document.location.href;
            $scope.hotel.ci = Date.parse($scope.hotel.ci) / 1000;
            $scope.hotel.co = Date.parse($scope.hotel.co) / 1000;

            window.open($scope.location + "/list?" + searchKey + "=" + $scope.hotel.search + '&' + 'ci' + '=' + $scope.hotel.ci + '&' + 'co' + '=' + $scope.hotel.co, '_self');
        };



        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel/list/b2b'
        }).then(function successCallback(response) {
            $scope.hotels = response.data.result.hotel;
            for (var j = 0; j < $scope.hotels.length; j++) {
                $scope.hotelid[$scope.hotels[j].id] = $scope.hotels[j];
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


        $scope.addToCart = function(dealDetails) {
            
            console.log(dealDetails);

            dealDetails.noOfDeal = 1;

            console.log("urlParams.ci = ",urlParams.ci);
            console.log("urlParams.co = ",urlParams.co);

           var finalCartData =  {
                "ci_date": urlParams.ci,
                "co_date": urlParams.co,
                "deal_id": dealDetails.id,
                "no_of_deals": dealDetails.noOfDeal
            };


            $http.post("/hotel/cart", finalCartData)
            .then(function(response) {

                console.log(response.data);
                dealDetails.cart_id = response.data.result.cart_deal.id;

            })
            .catch(function(err) {
                console.log(err);
                dealDetails.noOfDeal = 0;
            });
        };


        $scope.addOneToCart= function(dealDetails){
            dealDetails.noOfDeal =  dealDetails.noOfDeal + 1; 


            var finalCartData =  {
            
                "no_of_deals": dealDetails.noOfDeal
            };

            $http.put("/api/v1/cart/deal/"+dealDetails.cart_id, finalCartData)
            .then(function(response) {

                console.log(response.data);
               

            })
            .catch(function(err) {
                console.log(err);
            });

        };

        $scope.subOneToCart= function(dealDetails){
            dealDetails.noOfDeal =  dealDetails.noOfDeal - 1;


            if(dealDetails.noOfDeal != 0){
                var finalCartData =  {
                
                    "no_of_deals": dealDetails.noOfDeal
                };
    
                console.log(finalCartData);

                $http.put("/api/v1/cart/deal/"+dealDetails.cart_id, finalCartData)
                .then(function(response) {
    
                    console.log(response.data);
                    // dealDetails.cart_id = response.data.result.cart_deal.id;
    
                })
                .catch(function(err) {
                    console.log(err);
                });
            }else{

                $http.delete("/api/v1/cart/deal/"+dealDetails.cart_id)
                .then(function(response) {
    
                    console.log(response.data);
                    // dealDetails.cart_id = response.data.result.cart_deal.id;
    
                })
                .catch(function(err) {
                    console.log(err);
                });

            }



        };


        




    }])

   .controller('hotelController', ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
       $scope.roomData = {};
       $scope.room = {};
       $scope.id = [];

       $scope.hotel = {};
       $scope.hotels = {};

       $scope.hotelobj = {};
       $scope.deals = [];
       $scope.imagesData = {};
       $scope.similarhotels = [];
       $scope.limit = 10;
       $scope.roomPrice = {};
       $scope.deallimit = 1;


       var path = document.location.pathname;
       var key1 = path.split("/");
       if (key1[2] == 'hotel')
           var id = key1[3];
       else
           var id = key1[2];
       $http({
           method: 'GET',
           url: api_url + '/api/v1/hotel?name=' + name
       }).then(function successCallback(response) {
           $scope.hotel = response.data.result.hotel;
           getSimilarHotels();
       }, function errorCallback(response) {
           // called asynchronously if an error occurs
           // or server returns response with an error status.
       })


       var getSimilarHotels = function () {
           $http({
               method: 'GET',
               url: api_url + '/api/v1/hotel?city=' + $scope.hotel[0].city
           }).then(function successCallback(response) {

               for (var i = 0; i < response.data.result.hotel.length; i++) {
                   if (response.data.result.hotel[i].id == $scope.hotel[0].id) {
                       response.data.result.hotel.splice(1, i); //to remove current showing hotel data
                   }
                   else {
                       $scope.similarhotels.push(response.data.result.hotel[i])
                   }
               }

           }, function errorCallback(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
           })

       }

   }]);