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
  
      directionsService.route(request, function (response, status) {
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