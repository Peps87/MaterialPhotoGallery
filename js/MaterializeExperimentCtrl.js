angular.module('myApp', [])
    .controller('MaterializeExperimentCtrl', function($scope, $http) {
        var vm = this;
        (function($) {
            $(function() {
                var api_key = false;
                var positionAreaVisible = $(window).scrollTop();
                var areaVisible = window.innerHeight;
                var fotoIdOld = "";
                var translateOldXposition = "";
                var translateOldYposition = "";

                $(window).scroll(function() {
                    positionAreaVisible = $(window).scrollTop();
                    areaVisible = window.innerHeight;
                    console.log(positionAreaVisible);
                });


                var closeFoto = function() {
                    if (angular.isDefined(fotoIdOld) && fotoIdOld != "") {
                        var fotoElementCnt = $("#container_" + fotoIdOld);
                        var fotoElementX = $("#" + fotoIdOld);
                        var fotoElementY = $("#interno_" + fotoIdOld);

                        //fotoElementX.removeClass("active");

                        var initialPositionECX = fotoElementCnt.offset();
                        var lastPositionX = fotoElementX.offset();
                        var lastPositionY = fotoElementY.offset();
                        var calcXtranslateForClose = initialPositionECX.left - lastPositionX.left;
                        var calcYtranslateForClose = initialPositionECX.top - lastPositionY.top;
                        //  translateOldXposition = "translateX(" + calcXtranslateForClose + "px)";
                        // translateOldYposition = "translateY(" + calcYtranslateForClose + "px)" + " scale(1)";
                        translateOldXposition = "translateX(0px)";
                        translateOldYposition = "translateY(0px)" + " scale(1)";
                        fotoElementX.css("transform", translateOldXposition, "z-index", "0");
                        fotoElementY.css("transform", translateOldYposition, "z-index", "0");

                    }

                }



                $(window).click(function() {

                    closeFoto();

                });





                vm.openPhoto = function(fotoId) {

                    closeFoto();
                    if (fotoId != fotoIdOld) {
                        var ElementCONTAINER = $("#container_" + fotoId);
                        var ElementContainerX = $("#" + fotoId);
                        var ElementContainerY = $("#interno_" + fotoId);
                        var initialPositionECX = ElementCONTAINER.offset();
                        var widthWindow = $(window).width();
                        var lCenterAreaVisible = (widthWindow / 2) - 17;
                        var hCenterAreaVisible = (areaVisible / 2) + positionAreaVisible;
                        var calcXtranslate = lCenterAreaVisible - initialPositionECX.left;
                        var calcYtranslate = hCenterAreaVisible - initialPositionECX.top;
                        var cssXtranslate = "translateX(" + calcXtranslate + "px)";
                        var cssYtranslate = "translateY(" + calcYtranslate + "px)" + " scale(3.1)";
                        ElementContainerX.css("transform", cssXtranslate, "z-index", "1");
                        ElementContainerY.css("transform", cssYtranslate, "z-index", "1");
                        //  ElementContainerX.addClass("active");



                        fotoIdOld = fotoId;


                        event.stopPropagation();
                    } else {
                        fotoIdOld = "";
                    }



                }













                vm.spinner = true;

                function getImgs(setId) {
                    var URL = "https://api.flickr.com/services/rest/" +
                        "?method=flickr.people.getPhotos" +
                        "&api_key=df8e349b8c5e1142899264fd53972591" +
                        "&user_id=" + setId +
                        "&privacy_filter=1" +
                        "&per_page=30" +
                        "&format=json&nojsoncallback=1";

                    $scope.fotografie = [];


                    $http.get(URL, {}).then(function(data) {
                        console.log("FotoFlickr", data);
                        angular.forEach(data.data.photos.photo, function(photo) {
                            var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg";
                            photo.url = img_src;
                            $scope.fotografie.push(photo);

                            vm.spinner = false;

                        });
                    });
                    console.log("fotografie", $scope.fotografie);
                }











                getImgs("32454651@N08");
                $('.button-collapse').sideNav();
                $(".dropdown-button").dropdown();
                $('.parallax').parallax();













            }); // end of document ready
        })(jQuery); // end of jQuery name space

    });