// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([34.03, -82.20], 5);

// Add base layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 20
}).addTo(map);

fetch('https://cdn.glitch.com/c4800747-940d-4b1d-95ec-5b931ad404e4%2FNew_York_City_Baseball_Stadiums.json?1550539366281')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var baseballStadiums = L.geoJson(data, {
      
      // We make the points circles instead of markers so we can style them
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      
      // Then we can style them as we would other features
      style: function (geoJsonFeature) {
        return {
          fillColor: '#4C004C',
          radius: 6  ,
          fillOpacity: 1,
          stroke: false,
          // stroke: 0.02,
          // color: '#2b2a2a',
        };
      }
    });
  
    // Add data to the map
    baseballStadiums.addTo(map);
  
  //   // Move the map view so that the baseballStadiums is visible
    map.fitBounds(baseballStadiums.getBounds());
  });

// disable map zoom when using scroll
if (map.scrollWheelZoom) {
  map.scrollWheelZoom.disable();
}