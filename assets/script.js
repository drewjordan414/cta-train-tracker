// Housekeeping
const ctaKey = "5e45022e107345de8ab3edb8a97f9b94";
const googleMapKey =  "AIzaSyD3RG2QsU0mu1zklWXto3wL2QUaIF6WHbM";
// const mapBox = "pk.eyJ1IjoiZHJld2pvcmRhbjQwNCIsImEiOiJjbGlhbnF6bjQwMG1jM2ZuMjRpcHBoeHRyIn0.s6T-06OAwld32_Y9wTKsog";
const trainDirection = {
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

// const directionAngle = {
//   "Howard-Bound": 0,
//   "95th/Dan Ryan-Bound": 180,
//   "O'Hare-Bound": 45,
//   "Forest Park-Bound": 225,
//   "Kimball-Bound": 90,
//   "Loop-Bound": 135,
//   "Harlem/Lake-Bound": 135,
//   "Cottage Grove-Bound": 180,
//   "Midway-Bound": 225,
//   "Linden-Bound": 270,
//   "54th/Cermak-Bound": 315,
//   "Skokie-Bound": 0,
// };

const trainColors = {
  red: "#C60C30",
  blue: "#00A1DE",
  brn: "#62361B",
  g: "#009B3A",
  org: "#F9461C",
  p: "#522398",
  pink: "#E27EA6",
  y: "#F9E300",
};

let trainMarkers = [];

// Local Storage for Search History //

const searchInput = document.getElementById('SearchBar');

window.addEventListener('load', function() {
  const savedSearchText = localStorage.getItem('searchText');
  if (savedSearchText) {
    searchInput.value = savedSearchText;
  }
});

searchInput.addEventListener('input', function() {
  const searchText = searchInput.value;
  localStorage.setItem('searchText', searchText);
});


// Fetch train data from CTA API and update map

function fetchTrainData(map) {
  const trainDataUrl = `https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=red,blue,brn,g,org,p,pink,y&outputType=JSON`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  fetch(proxyUrl + trainDataUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing train markers from the map
      clearTrainMarkers();

      // Parse train data and create new markers
      data.ctatt.route.forEach((route) => {
        route.train.forEach((train) => {
          const arrowIcon = {
            url: '/Users/drewjordan/Documents/bootcamp/homework/cta-train-tracker/assets/images/arrow-38632.svg', // Path to your SVG
            scaledSize: new google.maps.Size(20, 20), // Size of your icon
            rotation: parseFloat(train.heading) + 90, // Assuming 'heading' value is in degrees, and the arrow in the SVG points to the right
            fillColor: trainColors[route.rt], // Set the marker color based on the train line
            fillOpacity: 4,
            strokeWeight: 2,
          };

          const marker = new google.maps.Marker({
            position: {
              lat: parseFloat(train.lat),
              lng: parseFloat(train.lon),
            },
            icon: arrowIcon, // Use the custom arrow icon
            map: map,
          });

          // Add marker to the array
          trainMarkers.push(marker);
        });
      });
    })
    
    .catch((error) => {
      console.error("Error fetching train data:", error);
    });
}



// Clear train markers from the map
function clearTrainMarkers() {
  // Loop through the train markers array and set the map property to null
  trainMarkers.forEach((marker) => {
    marker.setMap(null);
  });

  // Clear the train markers array
  trainMarkers = [];
}


// Get train arrival time based on station and stop description
function getTrainArrivalTime(destination, stopDescription) {
  const trainDirection = Object.entries(trainDirection).find(
    ([_, value]) => value[1] === destination
  );

  if (trainDirection) {
    const route = trainDirection[0];
    const direction = trainDirection[1][stopDescription];
    if (route && direction) {
      // Replace this with logic to get the actual arrival time
      // placeholder
      const arrivalTime = "12:30 PM";
      return arrivalTime;
    }
  }

  return "N/A";
}

// Initialize the map and fetch train data
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 41.8781, lng: -87.6298 }, // Center the map to Chicago
  });

  redLine(google, map);
  blueLine(google, map);
  brownLine(google, map);
  greenLine(google, map);
  orangeLine(google, map);
  pinkLine(google, map);
  purpleLine(google, map);
  yellowLine(google, map);

  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  fetchTrainData(map);
  setInterval(() => fetchTrainData(map), 15000);
}





window.initMap = initMap;

function redLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Red Line, Howard Station, 1649 W Howard St, Chicago, IL 60626";
  var end = "Red Line, 95th/Dan Ryan Station, 15 W 95th St, Chicago, IL 60628";
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
  var button = document.getElementById("redButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: '8',
      strokeOpacity: '.75',
      zIndex: -5
    }
  });
  directionsDisplay.setMap(map);
}
initialize();
}

function blueLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Blue Line, O'Hare Station, 10000 W O'Hare Ave, Chicago, IL 60666";
  var end = "Blue Line, UiC-Halsted Station, 430 S Halsted St, Chicago, IL 60607";
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
  var button = document.getElementById("blueButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'blue',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function brownLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Brown Line, Kimball Station, 4755 N Kimball Ave, Chicago, IL 60625";
  var end = "Brown Line, Loop Station, 100 W Lake St, Chicago, IL 60601";
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
  var button = document.getElementById("brownButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: '#964B00',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function greenLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Green Line, Harlem/Lake Station, 1 Harlem Ave, Forest Park, IL 60130";
  var end = "Green Line, Ashland/63rd Station, 6315 S Ashland Ave, Chicago, IL 60636";
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
  var button = document.getElementById("greenButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'green',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function orangeLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Orange Line, Midway Station, 4612 W 59th St, Chicago, IL 60629";
  var end = "Orange Line, washington/wabash Station, 29 N Wabash Ave, Chicago, IL 60602";
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
  var button = document.getElementById("orangeButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'orange',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function pinkLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Pink Line, 54th/Cermak Station, 2100 S Cermak Rd, Chicago, IL 60608";
  var end = "Pink Line, Washington/Wells Station, 100 N Wells St, Chicago, IL 60606";
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
  var button = document.getElementById("pinkButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'pink',
      strokeWeight: '8',
      strokeOpacity: '.80',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function purpleLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Linden Station, 349 Linden Ave, Wilmette, IL 60091";
  var end = "Howard Station, 1649 W Howard St, Chicago, IL 60626";
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
  var button = document.getElementById("purpleButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'purple',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}

function yellowLine(google, map) {

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var rendererOptions = {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: 'null'
    }
  };

  directionsDisplay = new google.maps.DirectionsRenderer
  (rendererOptions);

  directionsDisplay.setMap(map);

  var start = "Yellow Line, Dempster Station, 5001 W Dempster St, Skokie, IL 60077";
  var end = "Yellow Line, Howard Station, 1649 W Howard St, Chicago, IL 60626";
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
  var button = document.getElementById("yellowButton");
  button.addEventListener("click", changePolylineColor);
}

function changePolylineColor() {
  directionsDisplay.setMap(null);
  directionsDisplay.setOptions({
    polylineOptions: {
      strokeColor: 'yellow',
      strokeWeight: '8',
      strokeOpacity: '.75',
    }
  });
  directionsDisplay.setMap(map);
}

initialize();
}






