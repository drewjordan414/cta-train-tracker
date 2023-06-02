// Housekeeping
const ctaKey = "5e45022e107345de8ab3edb8a97f9b94";
const googleMapKey =  "AIzaSyA33nfJr_RnsUSUcdi4RmKvxuqfwdSniuc";
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

  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  fetchTrainData(map);
  setInterval(() => fetchTrainData(map), 15000);
}

// window.initMap = initMap;






