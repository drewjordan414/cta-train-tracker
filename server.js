var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Refactor all the route functions into a single one
function setupLine(google, map, start, end, buttonId, color) {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsDisplay.setMap(map);

  var method = 'TRANSIT';
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode[method]
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });

  // Add an event listener to the button
  var button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    directionsDisplay.setMap(null);
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeColor: color,
        strokeWeight: '8',
        strokeOpacity: '.75',
      }
    });
    directionsDisplay.setMap(map);
  });
}

// Use the above function for each line
setupLine(google, map, "Blue Line, O'Hare Station, 10000 W O'Hare Ave, Chicago, IL 60666", "Blue Line, Forest Park Station, 711 Des Plaines Ave, Forest Park, IL 60130", "blueButton", 'blue');
// ... repeat for other lines with the appropriate parameters

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
