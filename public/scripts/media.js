(function(undefined) {

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

    navigator.getUserMedia({
        video: true,
        audio: true,
    }, function(mediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(mediaStream);
        video.onloadedmetadata = function(e) {
            errorCallback(e)
        }

    }, errorCallback);

})(undefined);