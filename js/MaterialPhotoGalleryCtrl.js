angular.module('appMaterialPhotoGallery', [])
    .controller('MaterialPhotoGalleryCtrl', function($scope, $http, $timeout) {
        var vm = this;
        (function($) {
            $(function() {
                var api_key = false;
                var positionAreaVisible = $(window).scrollTop();
                var areaVisible = window.innerHeight;
                var fotoIdOld = "";
                var translateOldXposition = "";
                var translateOldYposition = "";
                var fotoUrlold = "";


                $(window).scroll(function() {
                    positionAreaVisible = $(window).scrollTop();
                    areaVisible = window.innerHeight;
                });



                var closeFoto = function() {
                    if (angular.isDefined(fotoIdOld) && fotoIdOld != "") {
                        var fotoElementStatic = $("#static_container_" + fotoIdOld);
                        var fotoElementCnt = $("#container_" + fotoIdOld);
                        var fotoElementX = $("#" + fotoIdOld);
                        var fotoElementY = $("#interno_" + fotoIdOld);
                        var singlePhoto = $("#myPhoto_" + fotoIdOld);
                        var initialPositionSTATIC = fotoElementStatic.offset();
                        var initialPositionECX = fotoElementCnt.offset();
                        var lastPositionX = fotoElementX.offset();
                        var lastPositionY = fotoElementY.offset();
                        var calcYtranslateForSTATIC = initialPositionSTATIC.top - initialPositionECX.top;
                        var translateStaticPosition = "translateY(" + calcYtranslateForSTATIC + "px)";
                        translateOldXposition = "translateX(0px)";
                        translateOldYposition = "translateY(0px)" + " scale(1,1)";
                        var inner = initialPositionSTATIC.top - positionAreaVisible;
                        fotoElementCnt.css({ "top": inner, "position": "fixed" });
                        fotoElementX.css("transform", translateOldXposition);
                        fotoElementY.css({ "transform": translateOldYposition });
                        singlePhoto.removeAttr("style")
                        fotoElementY.removeClass("active");
                        fotoElementX.css("transform", "none");
                        fotoElementY.css("transform", "none");
                        $timeout(function() {
                            singlePhoto.css({ "height": "100%" });
                            fotoElementCnt.removeAttr("style");
                        }, 500);
                    }
                }



                $(window).click(function() {
                    closeFoto();
                    fotoIdOld = "";
                });



                vm.openPhoto = function(fotoId, fotoUrl) {
                    closeFoto();
                    if (fotoId != fotoIdOld) {
                        var ElementCONTAINER = $("#container_" + fotoId);
                        var ElementContainerX = $("#" + fotoId);
                        var ElementContainerY = $("#interno_" + fotoId);
                        var singlePhoto = $("#myPhoto_" + fotoId);
                        var hY = ElementContainerY.innerHeight();
                        var lY = ElementContainerY.innerWidth();
                        var l = lY / 2;
                        var h = hY / 2;
                        var initialPositionECX = ElementCONTAINER.offset();
                        var widthWindow = $(window).width();
                        var lCenterAreaVisible = (widthWindow / 2) - 17;
                        var hCenterAreaVisible = ((areaVisible / 2) + positionAreaVisible) - h;
                        var calcXtranslate = lCenterAreaVisible - initialPositionECX.left;
                        var calcYtranslate = hCenterAreaVisible - initialPositionECX.top;
                        var cssXtranslate = "translateX(" + calcXtranslate + "px)";
                        var cssYtranslate = "translateY(" + calcYtranslate + "px)" + " scale(4,4.25)";
                        ElementContainerX.css("transform", cssXtranslate);
                        ElementContainerY.css({ "transform": cssYtranslate });
                        ElementContainerY.addClass("active");
                        singlePhoto.css({ "height": "72%", "border-top-left-radius": "5%", "border-top-right-radius": "5%", "border-bottom-left-radius": "0", "border-bottom-right-radius": "0" });
                        var inner = initialPositionECX.top - positionAreaVisible;
                        ElementCONTAINER.css({ "top": inner, "position": "fixed" });
                        fotoIdOld = fotoId;
                        fotoUrlold = fotoUrl;
                        event.stopPropagation();
                    } else {
                        fotoIdOld = "";
                        fotoUrlold = "";
                    }
                }


                vm.spinner = true;

                function getImgs(setId) {
                    var URL = "https://api.flickr.com/services/rest/" +
                        "?method=flickr.people.getPhotos" +
                        "&api_key=APIKEY" +
                        "&user_id=" + setId +
                        "&privacy_filter=1" +
                        "&per_page=90" +
                        "&format=json&nojsoncallback=1";

                    $scope.fotografie = [];


                    $http.get(URL, {}).then(function(data) {
                        console.log("FotoFlickr", data);
                        angular.forEach(data.data.photos.photo, function(photo) {
                            var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
                            photo.url = img_src;
                            $scope.fotografie.push(photo);

                            vm.spinner = false;

                        });
                    });
                    console.log("fotografie", $scope.fotografie);
                }

                getImgs("ID");
                $('.button-collapse').sideNav();
                $(".dropdown-button").dropdown();
                $('.parallax').parallax();































            }); // end of document ready
        })(jQuery); // end of jQuery name space

    });