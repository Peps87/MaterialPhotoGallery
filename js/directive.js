var pippo = angular.module('appMaterialPhotoGallery');


pippo.constant('Const', {
    BREAKPOINTS: {
        XS: 768,
        SM: 992,
        MD: 1200
    }
});

pippo.directive('helloWorld', function($timeout, Const) {
    return {
        restrict: 'E',
        templateUrl: '../template/direttiva.html',
        replace: false,
        scope: {
            photos: "="
        },
        link: function(scope, element, attrs) {

            var itemMd = attrs.itemMd;
            var itemSm = attrs.itemSm;
            var itemXs = attrs.itemXs;
            var offset = 80;
            var numberPhotos = 0;

            $timeout(function() {
                numberPhotos = scope.photos.length;
                calculateItem(itemMd, "item-md");
                calculateItem(itemSm, "item-sm");
                calculateItem(itemXs, "item-xs");

                $timeout(function() {
                    photoAdapter();

                    $(".fotonuova").on('load', function() {
                        if (this.naturalHeight > this.naturalWidth) {
                            $(this).addClass('vertical-photo')
                        }
                    });
                });

            });



            $(window).resize(photoAdapter);


            function photoAdapter() {
                var width = window.innerWidth;
                var breakpoint = calculateBreakpoint(width);
                console.log('detected breakpoint', breakpoint, width);
                if (breakpoint == Const.BREAKPOINTS.XS) {
                    var widthXs = (width - offset) / itemXs;
                    var heightXs = (widthXs / 4) * 3;
                    $(element).find(".photo").width(widthXs);
                    $(element).find(".photo").height(heightXs);
                } else if (breakpoint == Const.BREAKPOINTS.SM) {
                    var widthSm = (width - offset) / itemSm;
                    var heightSm = (widthSm / 4) * 3;
                    $(element).find(".photo").width(widthSm);
                    $(element).find(".photo").height(heightSm);
                } else if (breakpoint == Const.BREAKPOINTS.MD) {
                    var widthMd = (width - offset) / itemMd;
                    var heightMd = (widthMd / 4) * 3;
                    $(element).find(".photo").width(widthMd);
                    $(element).find(".photo").height(heightMd);
                }

            }


            function calculateBreakpoint(width) {

                if (width <= Const.BREAKPOINTS.XS) {
                    return Const.BREAKPOINTS.XS;
                } else if (width < Const.BREAKPOINTS.MD) {
                    return Const.BREAKPOINTS.SM;
                } else {
                    return Const.BREAKPOINTS.MD;
                }
            }

            function calculateItem(item, classe) {
                var differenza = numberPhotos % item;
                if (differenza != 0) {
                    itemVuoti = item - differenza;
                    var pippo = { alt: "", src: "", classe: classe };
                    for (i = 0; i < itemVuoti; i++) {
                        scope.photos.push(pippo);
                    }
                }
            }





        }
    };
});