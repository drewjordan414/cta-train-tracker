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
  
      directionsService.route(request, function (response, status) {
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