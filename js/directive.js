var pippo = angular.module('appMaterialPhotoGallery');

pippo.directive('helloWorld', function() {
    return {
        restrict: 'E',
        templateUrl: '../template/direttiva.html',
        replace: true
    };
});