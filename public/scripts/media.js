(function(){
    'use strict';
    console.log('this runs');

    // document.onready = function() {
        console.log('this runs too');

        var video;

        function checkMedia() {
            if (navigator.getUserMedia) return;
            if (navigator.webkitGetUserMedia) navigator.getUserMedia = navigator.webkitGetUserMedia;
            if (navigator.mozGetUserMedia) navigator.getUserMedia = navigator.mozGetUserMedia;
            if (navigator.msGetUserMedia) navigator.getUserMedia = navigator.msGetUserMedia;
        }

        checkMedia();

        function errorCallback(e) {
            console.log('Error:', e);
        }

        var mediaOptions = {
            video: {
                mandatory: {
                    minWidth: 640,
                    minHeight: 360
                }
            },
            audio: true,
        };
        function successCallback(mediaStream) {
            if (!video) video = document.querySelector('video');
            video.src = window.URL.createObjectURL(mediaStream);
            video.onloadedmetadata = function(e) {
                errorCallback(e);
            };
        }

        navigator.getUserMedia(mediaOptions, successCallback, errorCallback);

        var socket = io.connect('http://localhost');
        socket.on('console', function(data) {
            console.log(data.message);
        });


    // };
})();