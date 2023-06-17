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
  
      directionsService.route(request, function (response, status) {
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