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
      var end = "Blue Line, Forest Park Station, 711 Des Plaines Ave, Forest Park, IL 60130";
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