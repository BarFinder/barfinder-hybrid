
/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * https://developers.google.com/maps/documentation/javascript/geolocation
 * https://developers.google.com/web/fundamentals/native-hardware/user-location/#ask_permission_responsibly
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */

function initMap() {
  let mapCanvas = document.getElementById("map");
  let mapOptions = {
      center: new google.maps.LatLng(59.33, 18.06),
      zoom: 12,
      disableDefaultUI: true
      /*streetViewControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: { mapTypeIds: [] }*/
  };

  let map = new google.maps.Map(mapCanvas, mapOptions);

  // Create info window
  let infowindow = new google.maps.InfoWindow();

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });


  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      /*markers.push(new google.maps.Marker({
        map: map,
        icon: image, //icon to use the coctail icon
        title: place.name,
        position: place.geometry.location
      }));*/

      let marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<h2>'+place.name+'</h2><p>' + place.formatted_address + '</p>');
        infowindow.open(map, this);
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  

  $$( "#locationButton" ).on('click',function() {

    let infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation
    if ( navigator.geolocation ) {
      function success(position) {
        // Location found, show map with these coordinates
        let pos = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }

      function fail(error) {
        handleLocationError(true, infoWindow, map.getCenter());  // Failed to find location
      }

      // Find the users current position.  Cache the location for 5 minutes (5*60*1000), timeout after 6 seconds
      navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 300000, enableHighAccuracy:false, timeout: 6000});

      

    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()); 
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    }

  });
  

  // Add an overlay to the map of current lat/lng with a beer icon
  let image = {
    url: "https://avatars0.githubusercontent.com/u/35840202?s=200&v=4",
    //size: new google.maps.Size(160, 160),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 10),
    scaledSize: new google.maps.Size(30, 30)
  };
  
}
