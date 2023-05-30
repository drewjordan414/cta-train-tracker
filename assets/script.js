// Housekeeping
const apiKey = "5e45022e107345de8ab3edb8a97f9b94"
const mapBox = "pk.eyJ1IjoiZHJld2pvcmRhbjQwNCIsImEiOiJjbGlhbnF6bjQwMG1jM2ZuMjRpcHBoeHRyIn0.s6T-06OAwld32_Y9wTKsog"

// Leaflet Map
const mymap = L.map('mapid').setView([41.8781, -87.6298], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// const mymap = L.map('mapid').setView([41.8781, -87.6298], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'your-style-id',
//   accessToken: mapBox,
// }).addTo(mymap);

// CTA API
fetch('https://api.transitchicago.com/api/1.0/cta/' + API_ENDPOINT)
  .then(response => response.json())
  .then(data => {
    // Process the data and update the map or display the train information
  })
  .catch(error => {
    console.error('Error:', error);
  });



// Weather API


