var pippo = angular.module('appMaterialPhotoGallery');

pippo.directive('helloWorld', function($timeout) {
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
            console.log('itemMd', itemMd);
            var xs = 768;
            var sm = 992;
            var md = 1200;
            var offset = 80;
            var width = window.innerWidth;
            var breakpoint = calculateBreakpoint(width);
            var numberPhotos = 0;

            console.log('detected breakpoint', breakpoint);


            $timeout(function() {
                numberPhotos = scope.photos.length;
                calculateItem(itemMd, "item-md");
                calculateItem(itemSm, "item-sm");
                calculateItem(itemXs, "item-xs");

                $timeout(function() {
                    if (breakpoint == 'xs') {
                        var widthXs = (width - offset) / itemXs;
                        var heightXs = (widthXs / 4) * 3;
                        $(element).find(".photo").width(widthXs);
                        $(element).find(".photo").height(heightXs);
                    } else if (breakpoint == 'sm') {
                        var widthSm = (width - offset) / itemSm;
                        var heightSm = (widthSm / 4) * 3;
                        $(element).find(".photo").width(widthSm);
                        $(element).find(".photo").height(heightSm);
                    } else if (breakpoint == 'md') {
                        var widthMd = (width - offset) / itemMd;
                        var heightMd = (widthMd / 4) * 3;
                        $(element).find(".photo").width(widthMd);
                        $(element).find(".photo").height(heightMd);
                    }
                    $(".fotonuova").on('load', function() {
                        if (this.naturalHeight > this.naturalWidth) {
                            $(this).addClass('vertical-photo')
                        }
                    });
                });

            });



            $(window).resize(function() {
                var width = window.innerWidth;
                var breakpoint = calculateBreakpoint(width);
                console.log('detected breakpoint', breakpoint, width);
                if (breakpoint == 'xs') {
                    var widthXs = (width - offset) / itemXs;
                    var heightXs = (widthXs / 4) * 3;
                    $(element).find(".photo").width(widthXs);
                    $(element).find(".photo").height(heightXs);
                } else if (breakpoint == 'sm') {
                    var widthSm = (width - offset) / itemSm;
                    var heightSm = (widthSm / 4) * 3;
                    $(element).find(".photo").width(widthSm);
                    $(element).find(".photo").height(heightSm);
                } else if (breakpoint == 'md') {
                    var widthMd = (width - offset) / itemMd;
                    var heightMd = (widthMd / 4) * 3;
                    $(element).find(".photo").width(widthMd);
                    $(element).find(".photo").height(heightMd);
                }

            });


            function calculateBreakpoint(width) {

                if (width <= xs) {
                    return 'xs';
                } else if (width < md) {
                    return 'sm';
                } else {
                    return 'md';
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