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
            var xs = 429;
            var sm = 767;
            var md = 960;
            var offset = 20;
            var width = $("#gallery").width();
            var breakpoint = calculateBreakpoint(width);

            console.log('detected breakpoint', breakpoint);

            setTimeout(function() {
                if (breakpoint == 'xs') {
                    var widthXs = (width / itemXs) - offset;
                    var heightXs = (widthXs / 4) * 3;
                    $(element).find(".photo").width(widthXs);
                    $(element).find(".photo").height(heightXs);
                } else if (breakpoint == 'sm') {
                    var widthSm = (width / itemSm) - offset;
                    var heightSm = (widthSm / 4) * 3;
                    $(element).find(".photo").width(widthSm);
                    $(element).find(".photo").height(heightSm);
                } else if (breakpoint == 'md') {
                    var widthMd = (width / itemMd) - offset;
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



            $(window).resize(function() {
                var width = $("#gallery").width();
                var breakpoint = calculateBreakpoint(width);
                console.log('detected breakpoint', breakpoint);
                if (breakpoint == 'xs') {
                    var widthXs = (width / itemXs) - offset;
                    var heightXs = (widthXs / 4) * 3;
                    $(element).find(".photo").width(widthXs);
                    $(element).find(".photo").height(heightXs);
                } else if (breakpoint == 'sm') {
                    var widthSm = (width / itemSm) - offset;
                    var heightSm = (widthSm / 4) * 3;
                    $(element).find(".photo").width(widthSm);
                    $(element).find(".photo").height(heightSm);
                } else if (breakpoint == 'md') {
                    var widthMd = (width / itemMd) - offset;
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





        }
    };
});