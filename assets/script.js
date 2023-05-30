// Housekeeping
const ctaKey = "5e45022e107345de8ab3edb8a97f9b94";
const googleMap =  "AIzaSyA33nfJr_RnsUSUcdi4RmKvxuqfwdSniuc";
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
        zoom: 10,
        center: { lat: 41.8781, lng: -87.6298 }, // Center the map to Chicago
    });
  
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
}

window.initMap = initMap;



// // Fetch route data from the CTA API for each route.
// Object.keys(trainDriection).forEach((route) => {
//     fetch('https://cors-anywhere.herokuapp.com/http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=' + ctaKey + '&rt=' + route + '&outputType=JSON')
//         .then(response => response.json())
//         .then(data => {
//             const trains = data.ctatt.route[0].train;
//             trains.forEach(train => {
//                 const lat = train.lat;
//                 const lon = train.lon;
//                 const direction = trainDriection[route][train.direction]; // replace 'train.direction' with actual property in your data
//                 const marker = L.marker([lat, lon]).addTo(mymap);
//                 marker.bindPopup(`<b>${route} Line Train</b><br>Direction: ${direction}`).openPopup();
//             });
//         })
//         .catch(error => console.error('Error:', error));
// });

// fetch("https://data.cityofchicago.org/api/views/zbnc-zirh/rows.json?accessType=DOWNLOAD")
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(stop => {
//             const lat = parseFloat(stop.latitude);
//             const lon = parseFloat(stop.longitude);
//             const mapMarker = L.marker([lat, lon]).addTo(mymap);
//             mapMarker.bindPopup(`<b>${stop.stop_name}</b><br>${stop.routes}`).openPopup();
//         });
//     })
//     .catch (error => console.error('Error:', error));



