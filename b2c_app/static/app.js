angular.module('comparetravel', ['angular.filter'])
    .config(['$interpolateProvider', function ($interpolateProvider, $locationProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
        // $locationProvider.html5Mode(true);
    }])

    // .controller('hotelCart', ["$scope", "$window", "$cookieStore", "$http", function ($scope, $window, $cookieStore, $http, ) {
    //     $scope.SetCookies = function ($cookieStore) {
    //         $cookieStore.put("username", $scope.username);
    //     };
    //     $scope.GetCookies = function ($cookieStore) {
    //         $window.alert($cookieStore.get('username'));
    //     };
    //     $scope.ClearCookies = function ($cookieStore) {
    //         $cookieStore.remove('username');
    //     };
    // }])

    .controller('bookingController', ["$scope", "$http", function ($scope, $http) {

        $scope.firstName = {};
        $scope.lastName = {};
        $scope.phoneNumber = {};
        $scope.address = {};
        $scope.emailAddress = {};

        $scope.submitBooking = function () {
            console.log("Booking");
            window.open('/hotel/booking/payment', '_self');

        }
    }])



    .controller('stayController', ["$scope", "$http", "$location", function ($scope, $http, $filter, $location) {
        var api_url = 'http://139.59.51.174';

        $scope.hotelid = {};// hotel object on the basis of id
        $scope.hotel = {};
        $scope.myVar = false;
        $scope.resp = false;
        var searchKey = 'city';
        $scope.hotel.ci = new Date();
        $scope.hotel.co = new Date();
        $scope.hotel.co.setDate($scope.hotel.co.getDate() + 1);





        // $location.search=

        $scope.showDetail = function (roomid) {
            console.log(roomid);
            window.open('/hotel/' + roomid);

        }


        $scope.result = function (data, status) {
            $scope.hotel.search = data;
            searchKey = status;
            console.log("$scope.hotel.search", $scope.hotel.search);
            console.log("$status", status);
            $scope.getHotel();

        }

        $scope.show = function () {
            console.log("........");
            if ($scope.myVar == false) {
                $scope.myVar = true;
            }
            else {
                $scope.myVar = false;
            }
        }



        // $scope.checkError = function(){
        //   $scope.message = '';
        //   $scope.curDate = new Date();

        //   // var check_in = $scope.hotel.ci;
        //   console.log("check in",ci);
        //   // if($scope.cities == undefined && $scope.names.length==0){
        //   //   $scope.message = 'Enter the City or Hotel';
        //   //   return false;
        //   // }
        //   if($scope.hotel.ci == undefined){
        //      $scope.hotel.ci = check_in;
        //   }

        //   if(new Date($scope.hotel.ci) > new Date($scope.hotel.co)){
        //     $scope.message = 'End Date should be greater than start date';
        //     return false;
        //   }
        //   if(new Date($scope.hotel.ci) < $scope.curDate){
        //      $scope.message = 'Start date should not be before today.';
        //      return false;
        //   }

        // }


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
        }

        $http({
            method: 'GET',
            url: '/api/v1/hotel/collection'
        }).then(function successCallback(response) {
            // hotelData = response.data.result;
            $scope.collections = response.data.result.collection;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })

        $scope.getHotel = function () {
            // console.log("$location.path",$location.path);
            console.log("status", searchKey);
            $scope.location = document.location.href;
            console.log("$scope.location", $scope.location);
            $scope.hotel.ci = Date.parse($scope.hotel.ci) / 1000;
            $scope.hotel.co = Date.parse($scope.hotel.co) / 1000;
            console.log($scope.hotel.ci, $scope.hotel.co);
            if (searchKey == 0) {
                $scope.message = 'enter valid location ';
            }

            window.open($scope.location + "/list?" + searchKey + "=" + $scope.hotel.search + '&' + 'ci' + '=' + $scope.hotel.ci + '&' + 'co' + '=' + $scope.hotel.co, '_self');
            console.log("$scope.hotel.city", $scope.hotel.city)
        }

        $scope.search = function () {
            $scope.hotel.search = $scope.hotel.search.toLowerCase();
            console.log("$scope.hotel", $scope.hotel);
            $http({
                method: 'POST',
                url: api_url + '/hotel/search',
                data: $scope.hotel

            }).then(function successCallback(response) {
                console.log("response", response.data.result);
                $scope.cities = response.data.result.cities;
                $scope.names = response.data.result.names;
                console.log("ye h", $scope.cities, response.data.result.names);
                // if($scope.cities.length==0 && $scope.names.length==0){
                //      $scope.resp = true;
                //     $scope.error = function(){

                //       $scope.message = 'dddsdsdss';

                //   }
                // }
                // else{
                //   $scope.resp = false;
                // }
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

        }




        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel'
        }).then(function successCallback(response) {
            $scope.hotels = response.data.result.hotel;
            for (var j = 0; j < $scope.hotels.length; j++) {
                $scope.hotelid[$scope.hotels[j].id] = $scope.hotels[j];
            }

            console.log("$scope.hotelid", $scope.hotelid);
            console.log("$scope.hotels=====", $scope.hotels);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })


        //  }
    }])

    .controller('staylistController', ["$scope", "$window", "$http", function ($scope, $window, $http, ) {



        $scope.room = {};
        $scope.cityid = {};
        $scope.id = [];
        $scope.hotel = {
            rating: null,
            star: null,
            price_start: null,
            price_end: null,
            page: 1
        };
        $scope.limit = 10;
        $scope.lim = 5;
        $scope.myVar = false;
        $scope.result = false;
        $scope.roomPrice = {};
        $scope.roomobj = {};
        $scope.hotelobj = {};
        $scope.deals = [];
        $scope.imagesData = {};
        $scope.min = 0;
        $scope.max = 200000;
        var api_url = 'http://139.59.51.174';


        $scope.showBusinessDetail = function (hotel_id) {
            window.open('/business/hotel/' + hotel_id, '_self');
            console.log(hotel_id);

        }

        $scope.bookingPage = function (room_id) {
            window.open('/business/hotel/booking/' + room_id, '_self');
            console.log(hotel_id);

        }

        // $scope.setCookies = function () {
        //     console.log("debugg");
        //     $cookies.put("username", $scope.username);
        // };
        // $scope.getCookies = function () {
        //     console.log("debugg");
        //     $window.alert($cookies.get('username'));
        // };
        // $scope.clearCookies = function () {
        //     $cookies.remove('username');
        // };




        // Get the modal
        //  var mymodal= ;
        //  console.log("modal",mymodal);
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        //  var img = document.getElementById('myImg');
        //  var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");

        // $scope.myimg = function(){
        //   document.getElementById('myModal').style.display = "block";
        //   document.getElementById("img01").src = document.getElementById('myImg').src;
        //   // captionText.innerHTML = this.alt;
        //  }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        //  span.onclick = function() { 
        //      modal.style.display = "none";
        //  }

        //for image pop up
        $scope.openGallery = function (data) {
            $scope.imagesData = data;
            console.log("$scope.images", $scope.imagesData);
        }

        //for map pop up

        $scope.openMap = function (data) {
            $scope.mapData = data;
            console.log("$scope.mapData", $scope.mapData);
            console.log("$scope.mapData.latitude", $scope.mapData.latitude);
            $scope.myMap();
        }
        $scope.myMap = function () {
            var mapOptions = {
                center: new google.maps.LatLng($scope.mapData.latitude, $scope.mapData.longitude),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.HYBRID
            }
            console.log("mapOptions", mapOptions);
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            console.log("map", map);
        }

        //slide images

        var showDivs = function (n) {
            var i;
            var x = document.getElementsByClassName("mySlides");

            // var tx = document.getElementsByClassName("slider");

            var dots = document.getElementsByClassName("demo");

            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }

            for (i = 0; i < dots.length; i++) {
                dots[i].style.opacity = 0.5;
                dots[i].getElementsByClassName("img")[0].style.opacity = 0.5;
                dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
                dots[i].className = dots[i].className.replace(".image-carousel.style1 .slides", ".image-carousel.style1 .slidesactive");


            }
            dots[slideIndex - 1].getElementsByClassName("img")[0].style.opacity = 1;
            dots[slideIndex - 1].style.opacity = 1;

            if (window.screen.availWidth >= 440) {

                var transform = -870 * (slideIndex - 1);
            }
            if (window.screen.availWidth <= 440) {
                var transform = -370 * (slideIndex - 1);

            }
            document.body.style.setProperty('--tx', transform + 'px');
            $(".slider").css("transform", "translate3d(var(--tx), 0px, 0px)");
            dots[slideIndex - 1].className += "w3-opacity-off";
        }

        // var showDivs=function(n) {
        //   var i;
        //   var x = document.getElementsByClassName("mySlides");

        //   var dots = document.getElementsByClassName("demo");

        //   if (n > x.length) {slideIndex = 1}
        //   if (n < 1) {slideIndex = x.length}
        //   for (i = 0; i < x.length; i++) {
        //       x[i].style.display = "none";
        //   }
        //   for (i = 0; i < dots.length; i++) {
        //     dots[i].style.opacity = 0.5;
        //     dots[i].getElementsByClassName("img")[0].style.opacity = 0.5;
        //     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
        //     dots[i].className = dots[i].className.replace(".image-carousel.style1 .slides", ".image-carousel.style1 .slidesactive");


        //   }
        //   dots[slideIndex-1].getElementsByClassName("img")[0].style.opacity = 1;
        //   dots[slideIndex-1].style.opacity = 1;

        //   x[slideIndex-1].style.display = "block";
        //   dots[slideIndex-1].className += "w3-opacity-off";
        // }
        var slideIndex = 1;

        var plusDivs = function (n) {
            showDivs(slideIndex += n);
        }

        $scope.currentDiv = function (n) {
            showDivs(slideIndex = n);
        }

        //++++++++++++++++++++++++++++
        var i = 1;
        // var j=1;
        if (window.screen.availWidth >= 440) {
            console.log(window.screen.availWidth);
            $(".flex-next").click(function () {
                if ($scope.imagesData.images.length > 10) {
                    var totalSlides = ($scope.imagesData.images.length) / 10;
                }
                else {
                    var totalSlides = 1;
                }
                var onSlideImage = (slideIndex + 1) % 10
                // var lastSlides=totalSlides.toString().split(".")[1]+1;
                // if(onSlideImage==1){
                //   if ((totalSlides-1)>i){
                //     var transform=-800*i;
                //     document.body.style.setProperty('--txx',transform+'px');
                //     $(".demo").css("transform","translate3d(var(--txx), 0px, 0px)");
                //     $scope.currentDiv((i*10)+1);

                //     i++;
                //     return i;
                //   } 
                //   else if(((lastSlides)>j)&&((totalSlides-1)<i)){
                //     console.log("2nd if");
                //     var transform=-(80*j+(800*(i-1)));
                //     console.log("transform",transform);
                //     document.body.style.setProperty('--txx',transform+'px');
                //     $(".demo").css("transform","translate3d(var(--txx), 0px, 0px)");
                //     $scope.currentDiv((i*10)+1);

                //     j++;
                //     return j;

                //   }

                // }
                // else if(lastSlides < j) {
                //   console.log("3 rd if");
                //   $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
                //   $scope.currentDiv(1);
                //   j=1;
                //   i=1;
                //   return i;
                //   return j;
                // }
                // else{
                //   slideIndex++;
                //   $scope.currentDiv(slideIndex);
                //   return slideIndex;
                // }
                if (onSlideImage == 1) {
                    if (totalSlides > i) {
                        var transform = -800 * i;
                        document.body.style.setProperty('--txx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--txx), 0px, 0px)");
                        $scope.currentDiv((i * 10) + 1);

                        i++;
                        return i;
                    }
                }
                else if (totalSlides < i) {
                    $(".demo").css("transform", "translate3d(0px, 0px, 0px)");
                    $scope.currentDiv(1);
                    i = 1;
                    return i;
                }
                else {
                    slideIndex++;
                    $scope.currentDiv(slideIndex);
                    return slideIndex;
                }

            });

            $(".flex-prev").click(function () {
                var backSlideImage = (slideIndex) % 10
                if (backSlideImage == 1) {
                    if (1 < i) {
                        i--;
                        var transform = -800 * (i - 1);
                        document.body.style.setProperty('--txx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--txx), 0px, 0px)");
                        $scope.currentDiv(i * 10);
                        return i;
                    }

                } else {
                    if (slideIndex > 1) {
                        slideIndex--;
                        $scope.currentDiv(slideIndex);
                        return slideIndex;
                    }
                }
            });

        }

        if (window.screen.availWidth <= 440) {

            $(".flex-next").click(function () {
                console.log(window.screen.availWidth);
                if ($scope.imagesData.images.length > 3) {
                    var totalSlides = ($scope.imagesData.images.length) / 3;
                }
                else {
                    var totalSlides = 1;
                }
                var onSlideImage = (slideIndex + 1) % 3

                if (onSlideImage == 1) {
                    if (totalSlides > i) {
                        var transform = -240 * i;
                        document.body.style.setProperty('--stx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--stx), 0px, 0px)");
                        $scope.currentDiv((i * 3) + 1);

                        i++;
                        return i;
                    }
                }
                else if (totalSlides < i) {
                    $(".demo").css("transform", "translate3d(0px, 0px, 0px)");
                    $scope.currentDiv(1);
                    i = 1;
                    return i;
                }
                else {
                    slideIndex++;
                    $scope.currentDiv(slideIndex);
                    return slideIndex;
                }
            });

            $(".flex-prev").click(function () {

                var backSlideImage = (slideIndex) % 3
                if (backSlideImage == 1) {
                    if (1 < i) {
                        i--;
                        var transform = -240 * (i - 1);
                        document.body.style.setProperty('--stx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--stx), 0px, 0px)");
                        $scope.currentDiv(i * 3);
                        return i;
                    }

                } else {
                    if (slideIndex > 1) {
                        slideIndex--;
                        $scope.currentDiv(slideIndex);
                        return slideIndex;
                    }
                }
            });

        }
        //   var i=0;
        // if(window.screen.availWidth >=440){
        //   console.log(window.screen.availWidth);
        //   $( ".flex-next" ).click(function() {
        //     if (($( ".demo" ).css( "transform","translate3d(0px, 0px, 0px)")) && ($scope.imagesData.images.length >= 10) && (i==0)){

        //       $(".demo").css("transform","translate3d(-791px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 

        //     if (($( ".demo" ).css( "transform","translate3d(-791px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==1)){

        //       $(".demo").css("transform","translate3d(-1582px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     else {
        //       $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
        //       i=0;
        //       return i;
        //     }
        //   });

        //   $( ".flex-prev" ).click(function() {

        //     if ($( ".demo" ).css( "transform","translate3d(-1582px, 0px, 0px)") && (i==2)){
        //       $(".demo").css("transform","translate3d(-791px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 

        //     if ($( ".demo" ).css( "transform","translate3d(-791px, 0px, 0px)") && (i==1)){
        //       $(".demo").css("transform","translate3d(0px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     else {
        //       $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
        //     }
        //   });
        // }
        // if(window.screen.availWidth <=440){
        //   console.log(window.screen.availWidth);

        //   $( ".flex-next" ).click(function() {
        //     if (($( ".demo" ).css( "transform","translate3d(0px, 0px, 0px)")) && ($scope.imagesData.images.length >= 10) && (i==0)){

        //       $(".demo").css("transform","translate3d(-240px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 

        //     if (($( ".demo" ).css( "transform","translate3d(-240px, 0px, 0px)")) && ($scope.imagesData.images.length >= 10) && (i==1)){

        //       $(".demo").css("transform","translate3d(-480px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-480px, 0px, 0px)")) && ($scope.imagesData.images.length >= 10) && (i==2)){

        //       $(".demo").css("transform","translate3d(-760px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-760px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==3)){

        //       $(".demo").css("transform","translate3d(-1000px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-1000px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==4)){

        //       $(".demo").css("transform","translate3d(-1240px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-1240px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==5)){

        //       $(".demo").css("transform","translate3d(-1480px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-1480px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==6)){

        //       $(".demo").css("transform","translate3d(-1760px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     if (($( ".demo" ).css( "transform","translate3d(-1760px, 0px, 0px)")) && ($scope.imagesData.images.length >= 20) && (i==7)){

        //       $(".demo").css("transform","translate3d(-2000px, 0px, 0px)");
        //       i++;
        //       return i;
        //     } 
        //     else {
        //       $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
        //       i=0;
        //       return i;
        //     }
        //   });

        //   $( ".flex-prev" ).click(function() {

        //     if ($( ".demo" ).css( "transform","translate3d(-2000px, 0px, 0px)") && (i==7)){
        //       $(".demo").css("transform","translate3d(-1760px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 

        //     if ($( ".demo" ).css( "transform","translate3d(-1760px, 0px, 0px)") && (i==6)){
        //       $(".demo").css("transform","translate3d(-1480px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     if ($( ".demo" ).css( "transform","translate3d(-1480px, 0px, 0px)") && (i==5)){
        //       $(".demo").css("transform","translate3d(-1240px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     if ($( ".demo" ).css( "transform","translate3d(-1240px, 0px, 0px)") && (i==4)){
        //       $(".demo").css("transform","translate3d(-1000px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     if ($( ".demo" ).css( "transform","translate3d(-1000px, 0px, 0px)") && (i==3)){
        //       $(".demo").css("transform","translate3d(-760px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     if ($( ".demo" ).css( "transform","translate3d(-760px, 0px, 0px)") && (i==2)){
        //       $(".demo").css("transform","translate3d(-480px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     if ($( ".demo" ).css( "transform","translate3d(-480px, 0px, 0px)") && (i==1)){
        //       $(".demo").css("transform","translate3d(-240px, 0px, 0px)");
        //       i--;
        //       return i;
        //     } 
        //     else {
        //       $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
        //     }
        //   });
        // }

        //+++++++++++
        var str = document.location.search;
        var key = str.split("?");
        var key1 = key[1].split("=");
        console.log("key1", key1[0]);


        $scope.loadmoredeals = function () {
            $scope.lim = $scope.lim + 5;
        }


        //for detail page
        $scope.showDetail = function (hotel_id) {
            window.open('/hotel/' + hotel_id, '_self');
            console.log(hotel_id);

        }

        //for business detail page
        // $scope.showBusinessDetail=function(hotel_id){
        //   window.open('/business/hotel/'+hotel_id,'_self');
        //   console.log(hotel_id);

        // }

        $scope.hotelData = [];



        $scope.getHotelsData = function (cb) {

            if (!cb) $scope.hotel.page = 1;

            let searchURL = api_url + '/api/v1/hotel' + document.location.search
            console.log("searchurl", searchURL);


            Object.keys($scope.hotel).forEach(function (param) {
                console.log($scope.hotel[param]);
                if ($scope.hotel[param])
                    searchURL += `&${param}=${$scope.hotel[param]}`;
            });

            $http({
                method: 'GET',
                url: searchURL
            }).then(function (res) {

                if (cb) {
                    cb(res);
                } else {
                    $scope.hotelData = res.data.result.hotel;
                    console.log("$scope.hotelData", $scope.hotelData);
                }
            })
        }


        $scope.loadMoreHotelsData = function () {
            $scope.hotel.page = $scope.hotel.page + 1;

            $scope.getHotelsData(function (res) {
                $scope.hotelData = $scope.hotelData.concat(res.data.result.hotel);
            });


        }



        $scope.getHotelsData();
        // if(key1[0]=='name'){
        //   document.location.search = '?city=' + $scope.hotelData[0].city;
        // }

        //for more deals tab  
        $scope.show = function () {
            if ($scope.myVar == false) {
                $scope.myVar = true;
            }
            else {
                $scope.myVar = false;
            }
        }

        $scope.checkErr = function () {
            $scope.errMessage = '';
            $scope.curDate = new Date();

            var check_in = $scope.hotel.check_in;
            console.log("check in", check_in);
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

        // $scope.getHotelweek = function(){

        //   $scope.hotel.ci = Date.parse($scope.hotel.ci)/1000;
        //   $scope.hotel.co = Date.parse($scope.hotel.co)/1000;
        //   console.log("$scope.hotel.check_in",$scope.hotel.ci);
        //   $http({
        //     method: 'GET',
        //     url: api_url + '/api/v1/deal?ci=' + $scope.hotel.ci + '&co=' + $scope.hotel.co
        //   }).then(function successCallback(response) {
        //       $scope.deals = response.data.result.deal;
        //       if($scope.deals.length==0){
        //         $scope.result = true;

        //      }
        //      else{
        //        $scope.result = false;
        //      }
        //       for(var j=0; j<$scope.deals.length; j++){
        //         $scope.roomobj=$scope.roomPrice[$scope.deals[j].room];
        //         $scope.deals[j].roomdata=$scope.roomobj;
        //         $scope.hotelobj=$scope.cityid[$scope.deals[j].roomdata.hotel];
        //         $scope.deals[j].roomdata.hoteldata=$scope.hotelobj;

        //       }
        //       console.log("deals array",$scope.deals);
        //       // this callback will be called asynchronously

        //       // when the response is available
        //     }, function errorCallback(response) {
        //       // called asynchronously if an error occurs
        //       // or server returns response with an error status.
        //   })

        // }




        $scope.getHotels = function () {
            // console.log("$location.path",$location.path);
            var pathname = window.location.pathname;
            var appId = pathname.split('/')[6];
            console.log("appId", pathname);
            // console.log("status",searchKey);
            $scope.location = document.location.href;
            console.log("$scope.location", $scope.location);
            $scope.hotel.ci = Date.parse($scope.hotel.ci) / 1000;
            $scope.hotel.co = Date.parse($scope.hotel.co) / 1000;
            console.log($scope.hotel.ci, $scope.hotel.co);
            // if(searchKey == 0){
            //   $scope.message = 'enter valid location '; 
            // }

            window.open($scope.location + "/list?" + searchKey + "=" + $scope.hotel.search + '&' + 'ci' + '=' + $scope.hotel.ci + '&' + 'co' + '=' + $scope.hotel.co, '_self');
            console.log("$scope.hotel.city", $scope.hotel.city)
        }

        // $scope.search = function()  {
        //   $scope.hotel.search = $scope.hotel.search.toLowerCase();
        //   console.log("$scope.hotel",$scope.hotel);
        // $http({
        //   method: 'POST',
        //   url: api_url + '/hotel/search',
        //   data: $scope.hotel

        // }).then(function successCallback(response){
        // console.log("response",response.data.result);
        //     $scope.cities = response.data.result.cities;
        //     $scope.names = response.data.result.names;
        //     console.log("ye h",$scope.cities,response.data.result.names);
        //     // if($scope.cities.length==0 && $scope.names.length==0){
        //     //      $scope.resp = true;
        //     //     $scope.error = function(){

        //     //       $scope.message = 'dddsdsdss';

        //     //   }
        //     // }
        //     // else{
        //     //   $scope.resp = false;
        //     // }
        //     if($scope.cities.length==0 && $scope.names.length!=0){
        //        searchKey = 'name';
        //     }
        //     if($scope.cities.length!=0 && $scope.names.length==0){
        //       searchKey = 'city';
        //    }
        //    if($scope.cities.length!=0 && $scope.names.length!=0){
        //     searchKey = 'city';
        //  }



        // })






        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel'
        }).then(function successCallback(response) {
            $scope.hotels = response.data.result.hotel;
            for (var j = 0; j < $scope.hotels.length; j++) {
                $scope.hotelid[$scope.hotels[j].id] = $scope.hotels[j];
            }

            console.log("$scope.hotelid", $scope.hotelid);
            console.log("$scope.hotels=====", $scope.hotels);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })


    }])

    .controller('adminController', ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
        $scope.hotel = {}; // main hotel model
        $scope.hotelImg = []; //for all images array
        $scope.images = {}; //object of image
        $scope.product = {};// object of product
        $scope.collectionProdcut = [];//array of products
        $scope.hotelsProduct = {};
        $scope.deals = {}; //for deals
        $scope.hotelDeals = []; // for all deals array
        $scope.room = {}; //for one room
        $scope.hotelRooms = []; // for all room array
        $scope.showHotelDetail = false;
        $scope.showRoomDetail = false;
        $scope.roomDetail = false;
        $scope.hotelDetail = true;
        $scope.updateRoomDetail = false;
        $scope.addRoomDetail = false;
        $scope.UpdateImages = {}; //image data for update
        $scope.hotelData = {}; // hotel data for update 
        $scope.amenitiesData = {}; // hotel amenities for update
        $scope.commission_in_percentage = {};
        $scope.margin_price = {};
        $scope.price = {};
        $scope.base_price = {};
        var api_url = 'http://139.59.51.174';

        $scope.showCreate = function () {
            $scope.hotelDetail = true;
            $scope.showHotelDetail = false;
        }
        $scope.showUpdate = function () {
            $scope.showHotelDetail = true;
            $scope.hotelDetail = false;
            $scope.showRoomDetail = false;
        }

        $scope.editRoomsData = function (data) {
            $scope.rooms = data;
            $scope.facilities = data.facilities;
            $scope.member = data.member;
            $scope.roomDeals = data.deals;
            $scope.updateRoomDetail = true;
            $scope.showRoomDetail = false;

        }
        $scope.gotoHotelDetail = function () {
            $scope.updateRoomDetail = false;
            $scope.showRoomDetail = true;
            $scope.addRoomDetail = false;
        }
        $scope.editDealData = function (data) {
            $scope.deal = data;
        }
        $scope.editProductData = function (data) {
            $scope.product = data;
        }
        $scope.editHotel = function (data) {
            $scope.hotels = data;
            $scope.hotelAmenities = data.amenities;
            $scope.hotelCollection = data.collection;
            $scope.hotelImages = data.images;
            $scope.hotelRooms = data.rooms;
            // $scope.hotelProducts=data.collection.products;
            $scope.showRoomDetail = true;
            $scope.showHotelDetail = false;
            // $scope.Rooms=data;


        }

        $scope.editImg = function (data, index) {
            $scope.imageData = data;
            // $scope.imagedata=data.id;
            $scope.imgIndex = index;

        }
        $scope.updateImage = function () {

            $scope.hotelImages[$scope.imgIndex].image_url = $scope.imageData.image_url;
            $scope.imageData.hotel_id = $scope.hotels.id;
            sendPutCall('/api/v1/image/' + $scope.imageData.id, $scope.imageData);
            createToast("Image Updated!!!", "green");
        }
        $scope.updateHotel = function () {
            $scope.hotelData = $scope.hotels;

            delete $scope.hotelData.images;
            delete $scope.hotelData.rooms;
            delete $scope.hotelData.amenities;
            delete $scope.hotelData.collection.product;
            sendPutCall('/api/v1/hotel/' + $scope.hotelData.id, $scope.hotelData);
            createToast("Hotel Detail Updated!!!", "green");
        }
        $scope.updateAmenities = function () {
            $scope.hotelAmenities.hotel_id = $scope.hotels.id;
            sendPutCall('/api/v1/amenity/' + $scope.hotelAmenities.id, $scope.hotelAmenities);
            createToast("Hotel Amenities Updated!!!", "green");

        }
        $scope.updateCollection = function () {
            $scope.hotelCollection.hotel_id = $scope.hotels.id;
            delete $scope.hotelCollection.products;
            sendPutCall('/api/v1/hotel/collection/' + $scope.hotelCollection.id, $scope.hotelCollection);
            createToast("Hotel Collection Updated!!!", "green");

        }
        $scope.updateProduct = function () {

            $scope.product.hotel_collection_id = $scope.product.hotel_collection;
            delete $scope.product.hotel_collection;
            sendPutCall('/api/v1/hotel/collection/product/' + $scope.product.id, $scope.product);
            createToast("Product Updated!!!", "green");

        }
        $scope.updateRoom = function () {
            $scope.rooms.hotel_id = $scope.hotels.id;
            delete $scope.rooms.member;
            delete $scope.rooms.check_in;
            delete $scope.rooms.check_out;
            delete $scope.rooms.facilities;
            delete $scope.rooms.deals;
            delete $scope.rooms.hotel;
            sendPutCall('/api/v1/room/' + $scope.rooms.id, $scope.rooms);
            createToast("Room Updated!!!", "green");
        }
        $scope.updateFacilities = function () {
            $scope.facilities.room_id = $scope.rooms.id;
            delete $scope.facilities.room;
            sendPutCall('/api/v1/facility/' + $scope.facilities.id, $scope.facilities);
            createToast("Facilities Updated!!!", "green");
        }
        $scope.updateMembers = function () {
            $scope.member.room_id = $scope.rooms.id;
            delete $scope.member.room;
            sendPutCall('/api/v1/member/' + $scope.member.id, $scope.member);
            createToast("Members Updated!!!", "green");
        }
        $scope.updateDeal = function () {

            $scope.deal.room_id = $scope.rooms.id;
            delete $scope.deal.room;
            delete $scope.deal.website;

            console.log('$scope.deal', $scope.deal);
            sendPutCall('/api/v1/deal/' + $scope.deal.id, $scope.deal);
            createToast("Deal Updated!!!", "green");

        }

        $scope.deleteHotel = function (data) {
            sendDeleteCall('/api/v1/hotel/' + data.id);
            createToast("Hotel Deleted!!!", "green");
        }
        $scope.deleteImage = function (data) {
            if (data.id) {
                sendDeleteCall('/api/v1/image/' + data.id);
                createToast("Image Deleted!!!", "green");
            }
            else {
                createToast("'Try Again'!!!", "blue");
                setTimeout(function () { location.reload(); }, 1000);


            }
        }
        $scope.deleteProduct = function (data) {
            sendDeleteCall('/api/v1/hotel/collection/product/' + data.id);
            createToast("Product Deleted!!!", "green");
        }
        $scope.deleteRoom = function (data) {
            sendDeleteCall('/api/v1/room/' + data.id);
            createToast("Room Deleted!!!", "green");
        }
        $scope.deleteDeals = function (data) {
            sendDeleteCall('/api/v1/deal/' + data.id);
            createToast("Deal Deleted!!!", "green");
        }
        $scope.addRoom = function () {

            $scope.room.hotel_id = $scope.hotels.id;

            $scope.hotelDeals.push($scope.deals);
            $scope.room.deals = $scope.hotelDeals;
            // $scope.hotelRooms.push($scope.room);
            console.log("rooms array", $scope.room);
            sendPostCall('/api/v1/room', $scope.room)

            createToast("'Room Added!!'", "green");
            // $scope.deals.hotel_url="";
            $scope.hotelDeals = [];

        }
        $scope.addHotelImages = function () {
            $scope.hotelsImg.hotel_id = $scope.hotels.id;
            $scope.hotelImages.push($scope.hotelsImg); //to show added image
            sendPostCall('/api/v1/image', $scope.hotelsImg)
            $scope.hotelsImg = {};
            createToast("'Image Added!!'", "green");

        }
        $scope.addHotelDeal = function () {
            $scope.hotelsDeal.room_id = $scope.rooms.id;

            sendPostCall('/api/v1/deal', $scope.hotelsDeal)

            createToast("'Deal Added!!'", "green");

        }

        $scope.addHotelProduct = function () {
            $scope.hotelsProduct.hotel_collection_id = $scope.hotels.collection.id;
            sendPostCall('/api/v1/hotel/collection/product', $scope.hotelsProduct)
            createToast("'Product Added!!'", "green");

        }
        $scope.showAddRoom = function () {
            $scope.showRoomDetail = false;
            $scope.addRoomDetail = true;
        }


        $http({
            method: 'GET',
            url: '/api/v1/hotel'
        }).then(function successCallback(response) {
            // hotelData = response.data.result;
            $scope.hotelsData = response.data.result.hotel;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })
        $http({
            method: 'GET',
            url: '/api/v1/website'
        }).then(function successCallback(response) {
            // hotelData = response.data.result;
            $scope.websites = response.data.result.website;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })
        $http({
            method: 'GET',
            url: '/api/v1/hotel/collection'
        }).then(function successCallback(response) {
            // hotelData = response.data.result;
            $scope.collections = response.data.result.collection;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })
        var sendPostHotel = function (url, data) {
            $scope.hotel.city = $scope.hotel.city.toLowerCase();
            $scope.hotel.name = $scope.hotel.name.toLowerCase();
            console.log(data);

            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function (res) {
                console.log(res);
                $scope.j = res.data.result.hotel.id;
                console.log("j", $scope.j);


                createToast("'hotel successfully created!!!'", "green");

            },
                // failed callback
                function (req) {
                    createToast("'Something went wrong!!!'", "red");

                    // setTimeout(function(){ location.reload(); }, 1000);

                })

        }
        var sendDeleteCall = function (url) {

            $http({
                method: 'DELETE',
                url: url,
            }).then(function (res) {
                setTimeout(function () { location.reload(); }, 1000);
                // createToast("'hotel successfully created!!!'","green");

            },
                // failed callback
                function (req) {
                    createToast("'Something went wrong!!!'", "red");
                })

        }
        var sendPostCall = function (url, data) {
            console.log(data);

            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function (res) {
                console.log(res);

                // createToast("'hotel successfully created!!!'","green");

            },
                // failed callback
                function (req) {
                    createToast("'Something went wrong!!!'", "red");
                })

        }
        var sendPutCall = function (url, data) {
            console.log(data);

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function (res) {
                console.log(res);

                // createToast("'hotel successfully created!!!'","green");

            },
                // failed callback
                function (req) {
                    createToast("'Something went wrong!!!'", "red");
                })

        }



        $scope.removeInput = function (index) {
            $scope.hotel.images.splice(index, 1);
        }

        $scope.openRoom = function () {

            $(".js-pop-room").css("top", "50%");

        };
        onload = function () {
            window.scrollBy(0, -900);

        }
        $scope.createRoom = function () {

            $scope.room.hotel_id = $scope.j;

            $scope.hotelDeals.push($scope.deals);
            $scope.room.deals = $scope.hotelDeals;
            // $scope.hotelRooms.push($scope.room);
            console.log("rooms array", $scope.room);
            sendPostCall('/api/v1/room', $scope.room)

            createToast("'Room Added!!'", "green");
            // $scope.deals.hotel_url="";
            $scope.hotelDeals = [];

        }


        $scope.addImg = function () {
            $scope.hotelImg.push($scope.images);
            $scope.images = {};
            createToast("'Image Added!!'", "green");

        }
        $scope.addProduct = function () {
            $scope.collectionProdcut.push($scope.product);
            createToast("'product Added!!'", "green");

        }
        $scope.addPrice = function () {
            $scope.hotelDeals.push($scope.deals);
            $scope.deals = {};
            createToast("'price Added!!'", "green");

        }
        var createToast = function (msg, color) {
            var x = document.getElementById("snackbar");
            x.innerHTML = msg;
            x.style.backgroundColor = color;
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        $scope.createHotel = function () {
            // e.preventDefault()
            $scope.hotelDetail = false;
            $scope.roomDetail = true;

            // $scope.collectionProdcut.push($scope.product);

            $scope.hotelImg.push($scope.images);
            // $scope.hotel.collection.products=$scope.collectionProdcut;
            $scope.hotel.images = $scope.hotelImg;
            console.log("$scope.hotel", $scope.hotel);

            sendPostHotel('/api/v1/hotel', $scope.hotel)
        }
    }])






    .controller('hotelController', ["$scope", "$http", function ($scope, $http, $filter) {
        $scope.roomData = {};
        $scope.room = {};
        $scope.id = [];
        $scope.cityid = {};
        $scope.hotel = {};
        $scope.hotels = {};
        $scope.roomobj = {};
        $scope.hotelobj = {};
        $scope.deals = [];
        $scope.imagesData = {};
        $scope.similarhotels = [];
        $scope.limit = 10;
        $scope.roomPrice = {};
        $scope.deallimit = 1;
        var api_url = 'http://139.59.51.174';

        $scope.openGallery = function (data) {
            $scope.imagesData = data;
            console.log("$scope.images", $scope.imagesData);
        }

        // window.onresize = function(){ location.reload(); }
        $scope.openHome = function () {
            window.open('/', '_self');

        }
        $scope.openHotel = function () {
            window.open('/hotel', '_self');
        }
        var showDivs = function (n) {
            var i;
            var x = document.getElementsByClassName("mySlides");

            // var tx = document.getElementsByClassName("slider");

            var dots = document.getElementsByClassName("demo");

            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }

            for (i = 0; i < dots.length; i++) {
                dots[i].style.opacity = 0.5;
                dots[i].getElementsByClassName("img")[0].style.opacity = 0.5;
                dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
                dots[i].className = dots[i].className.replace(".image-carousel.style1 .slides", ".image-carousel.style1 .slidesactive");


            }
            dots[slideIndex - 1].getElementsByClassName("img")[0].style.opacity = 1;
            dots[slideIndex - 1].style.opacity = 1;

            if (window.screen.availWidth >= 440) {

                var transform = -870 * (slideIndex - 1);
            }
            if (window.screen.availWidth <= 440) {
                var transform = -870 * (slideIndex - 1);

            }
            document.body.style.setProperty('--tx', transform + 'px');
            $(".slider").css("transform", "translate3d(var(--tx), 0px, 0px)");
            dots[slideIndex - 1].className += "w3-opacity-off";
        }
        var slideIndex = 1;


        var plusDivs = function (n) {
            showDivs(slideIndex += n);
        }

        $scope.currentDiv = function (n) {
            showDivs(slideIndex = n);
        }

        $scope.bookingPage = function (room_id) {
            window.open('/hotel/booking/' + room_id, '_self');
            console.log(hotel_id);

        }



        $scope.loadMoreRooms = function () {
            $scope.limit = $scope.limit + 10;
        }
        $scope.loadMoreDeals = function () {
            $scope.deallimit = $scope.deallimit + 1;
        }
        $scope.newLocation = function () {
            window.open('/hotel/list', '_self');

        }
        $scope.showDetail = function (roomid) {
            window.open('/hotel/' + roomid);

        }
        var path = document.location.pathname;
        var key1 = path.split("/");
        if (key1[2] == 'hotel')
            var id = key1[3];
        else
            var id = key1[2];
        console.log(id);
        $http({
            method: 'GET',
            url: api_url + '/api/v1/hotel?id=' + id
        }).then(function successCallback(response) {
            $scope.hotel = response.data.result.hotel;
            console.log($scope.hotel);
            getSimilarHotels();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })


        var getSimilarHotels = function () {
            console.log("$scope.hotel.city", $scope.hotel[0].city);
            $http({
                method: 'GET',
                url: api_url + '/api/v1/hotel?city=' + $scope.hotel[0].city
            }).then(function successCallback(response) {
                console.log("response city hotels", response.data.result.hotel);

                for (var i = 0; i < response.data.result.hotel.length; i++) {
                    if (response.data.result.hotel[i].id == $scope.hotel[0].id) {
                        response.data.result.hotel.splice(1, i); //to remove current showing hotel data
                    }
                    else {
                        $scope.similarhotels.push(response.data.result.hotel[i])
                    }
                }
                console.log("similar", $scope.similarhotels);



            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            })

        }



        /************************ slider jquery section  ************************************** */
        var i = 1;
        // var j=1;
        if (window.screen.availWidth >= 440) {
            console.log(window.screen.availWidth);
            $(".flex-next").click(function () {
                if ($scope.hotel[0].images.length > 10) {
                    var totalSlides = ($scope.hotel[0].images.length) / 10;
                }
                else {
                    var totalSlides = 1;
                }
                var onSlideImage = (slideIndex + 1) % 10
                // var lastSlides=totalSlides.toString().split(".")[1]+1;
                // if(onSlideImage==1){
                //   if ((totalSlides-1)>i){
                //     var transform=-800*i;
                //     document.body.style.setProperty('--txx',transform+'px');
                //     $(".demo").css("transform","translate3d(var(--txx), 0px, 0px)");
                //     $scope.currentDiv((i*10)+1);

                //     i++;
                //     return i;
                //   } 
                //   else if(((lastSlides)>j)&&((totalSlides-1)<i)){
                //     console.log("2nd if");
                //     var transform=-(80*j+(800*(i-1)));
                //     console.log("transform",transform);
                //     document.body.style.setProperty('--txx',transform+'px');
                //     $(".demo").css("transform","translate3d(var(--txx), 0px, 0px)");
                //     $scope.currentDiv((i*10)+1);

                //     j++;
                //     return j;

                //   }

                // }
                // else if(lastSlides < j) {
                //   console.log("3 rd if");
                //   $(".demo").css("transform","translate3d(0px, 0px, 0px)" );
                //   $scope.currentDiv(1);
                //   j=1;
                //   i=1;
                //   return i;
                //   return j;
                // }
                // else{
                //   slideIndex++;
                //   $scope.currentDiv(slideIndex);
                //   return slideIndex;
                // }
                if (onSlideImage == 1) {
                    if (totalSlides > i) {
                        var transform = -800 * i;
                        document.body.style.setProperty('--txx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--txx), 0px, 0px)");
                        $scope.currentDiv((i * 10) + 1);

                        i++;
                        return i;
                    }
                }
                else if (totalSlides < i) {
                    $(".demo").css("transform", "translate3d(0px, 0px, 0px)");
                    $scope.currentDiv(1);
                    i = 1;
                    return i;
                }
                else {
                    slideIndex++;
                    $scope.currentDiv(slideIndex);
                    return slideIndex;
                }

            });

            $(".flex-prev").click(function () {
                var backSlideImage = (slideIndex) % 10
                if (backSlideImage == 1) {
                    if (1 < i) {
                        i--;
                        var transform = -800 * (i - 1);
                        document.body.style.setProperty('--txx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--txx), 0px, 0px)");
                        $scope.currentDiv(i * 10);
                        return i;
                    }

                } else {
                    if (slideIndex > 1) {
                        slideIndex--;
                        $scope.currentDiv(slideIndex);
                        return slideIndex;
                    }
                }
            });

        }

        if (window.screen.availWidth <= 440) {

            $(".flex-next").click(function () {
                console.log(window.screen.availWidth);
                if ($scope.hotel[0].images.length > 3) {
                    var totalSlides = ($scope.hotel[0].images.length) / 3;
                }
                else {
                    var totalSlides = 1;
                }
                var onSlideImage = (slideIndex + 1) % 3;

                if (onSlideImage == 1) {
                    if (totalSlides > i) {
                        var transform = -240 * i;
                        document.body.style.setProperty('--stx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--stx), 0px, 0px)");
                        $scope.currentDiv((i * 3) + 1);

                        i++;
                        return i;
                    }
                }
                else if (totalSlides < i) {
                    $(".demo").css("transform", "translate3d(0px, 0px, 0px)");
                    $scope.currentDiv(1);
                    i = 1;
                    return i;
                }
                else {
                    slideIndex++;
                    $scope.currentDiv(slideIndex);
                    return slideIndex;
                }
            });

            $(".flex-prev").click(function () {

                var backSlideImage = (slideIndex) % 3
                if (backSlideImage == 1) {
                    if (1 < i) {
                        i--;
                        var transform = -240 * (i - 1);
                        document.body.style.setProperty('--stx', transform + 'px');
                        $(".demo").css("transform", "translate3d(var(--stx), 0px, 0px)");
                        $scope.currentDiv(i * 3);
                        return i;
                    }

                } else {
                    if (slideIndex > 1) {
                        slideIndex--;
                        $scope.currentDiv(slideIndex);
                        return slideIndex;
                    }
                }
            });

        }
        /************************************************************************************************/



    }]);
