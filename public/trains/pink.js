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
  
      directionsService.route(request, function (response, status) {
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