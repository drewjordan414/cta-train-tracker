// Housekeeping
const apiKey = "5e45022e107345de8ab3edb8a97f9b94"
const mapBox = "pk.eyJ1IjoiZHJld2pvcmRhbjQwNCIsImEiOiJjbGlhbnF6bjQwMG1jM2ZuMjRpcHBoeHRyIn0.s6T-06OAwld32_Y9wTKsog"

// Leaflet Map
const mymap = L.map('mapid').setView([41.8781, -87.6298], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


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


