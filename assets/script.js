// Housekeeping
const ctaKey = "5e45022e107345de8ab3edb8a97f9b94";
const googleMap =  "AIzaSyA33nfJr_RnsUSUcdi4RmKvxuqfwdSniuc";
const mapKey = "AIzaSyA33nfJr_RnsUSUcdi4RmKvxuqfwdSniuc";
// const mapBox = "pk.eyJ1IjoiZHJld2pvcmRhbjQwNCIsImEiOiJjbGlhbnF6bjQwMG1jM2ZuMjRpcHBoeHRyIn0.s6T-06OAwld32_Y9wTKsog";
const trainDriection = {
    "red":{
        1: "Howard-Bound",
        5: "95th/Dan Ryan-Bound"
    },
    "blue":{
        1: "O'Hare-Bound",
        5: "Forest Park-Bound"
    },
    "brn":{
        1: "Kimball-Bound",
        5: "Loop-Bound"
    },
    "g":{
        1: "Harlem/Lake-Bound",
        5: "Cottage Grove-Bound"
    },
    "org":{
        1: "Loop-Bound",
        5: "Midway-Bound"
    },
    "p":{
        1: "Linden-Bound",
        5: "Loop-Bound"
    },
    "pink":{
        1: "54th/Cermak-Bound",
        5: "Loop-Bound"
    },
    "y":{
        1: "Skokie-Bound",
        5: "Howard-Bound"
    },
}


//map using google tranit map api
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 41.8781, lng: -87.6298 }, // Center the map to Chicago
    });
  
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
}

window.initMap = initMap;



