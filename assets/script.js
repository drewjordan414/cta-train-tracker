// Housekeeping
const apiKey = "5e45022e107345de8ab3edb8a97f9b94";
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

// Leaflet Map
const mymap = L.map('mapid').setView([41.8781, -87.6298], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Fetch route data from the CTA API for each route.
Object.keys(trainDriection).forEach((route) => {
    fetch('https://cors-anywhere.herokuapp.com/http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=' + apiKey + '&rt=' + route + '&outputType=JSON')
        .then(response => response.json())
        .then(data => {
            const trains = data.ctatt.route[0].train;
            trains.forEach(train => {
                const lat = train.lat;
                const lon = train.lon;
                const direction = trainDriection[route][train.direction]; // replace 'train.direction' with actual property in your data
                const marker = L.marker([lat, lon]).addTo(mymap);
                marker.bindPopup(`<b>${route} Line Train</b><br>Direction: ${direction}`).openPopup();
            });
        })
        .catch(error => console.error('Error:', error));
});

fetch("https://cors-anywhere.herokuapp.com/https://data.cityofchicago.org/resource/8pix-ypme.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(stop => {
            const lat = parseFloat(stop.latitude);
            const lon = parseFloat(stop.longitude);
            const mapMarker = L.marker([lat, lon]).addTo(mymap);
            mapMarker.bindPopup(`<b>${stop.stop_name}</b><br>${stop.routes}`).openPopup();
        });
    })
    .catch (error => console.error('Error:', error));



