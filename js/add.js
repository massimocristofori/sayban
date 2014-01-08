var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    // Get image handle
    //
    //
    $location.path( "/add" );
    var saybanImage = document.getElementById('saybanImage');
    // Unhide image elements
    //
    saybanImage.style.display = 'block';
    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    saybanImage.src = "data:image/jpeg;base64," + imageData;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
// A button will call this function
//

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}
// A button will call this function
//

function capturePhotoEdit() {
    alert("max");
    $location.path( "#/add" );
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}
// A button will call this function
//

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.


function onFail(message) {
    alert('Failed because: ' + message);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(onCPSuccess, onFail);
}

function onCPSuccess(position) {
    var positionLabel = document.getElementById("positionLabel");
    positionLabel.value = position.coords.latitude + " " + position.coords.longitude;
}