'use strict';
angular.module('com.sayban.phonegap.camera', ['com.sayban.phonegap.ready']).
factory('camera', function($rootScope, phonegapReady) {
    return {
        capturePhoto: phonegapReady(function(onSuccess, onError, options) {
            navigator.camera.getPicture(function() {
                var that = this,
                    args = arguments;
                alert('onsuccess: ');
                if(onSuccess) {
                    $rootScope.$apply(function() {
                        onPhotoSuccess.apply(that, args);
                    });
                }
            }, function() {
                var that = this,
                    args = arguments;
                alert('Failed because: ');
                if(onError) {
                    $rootScope.$apply(function() {
                        onError.apply(that, args);
                    });
                }
            }, options);
        });
    }
});