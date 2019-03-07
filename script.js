// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L, Mustache */

var map = L.map('map').setView([34.03, -82.20], 5);

var popupTemplate = document.querySelector('.popup-template').innerHTML;

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 20
}).addTo(map);

fetch('https://cdn.glitch.com/c4800747-940d-4b1d-95ec-5b931ad404e4%2FNew_York_City_Baseball_Stadiums_new.geojson?1551314908507')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var baseballStadiums = L.geoJson(data, {
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      style: function (geoJsonFeature) {
        return {
          fillColor: '#221BBB',
          radius: 6  ,
          fillOpacity: 1,
          stroke: false,
      };
    },
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
        console.log(layer.feature.properties);  
      var sidebarContentArea = document.querySelector('.sidebar-content');
          console.log(sidebarContentArea);
          sidebarContentArea.innerHTML = Mustache.render(popupTemplate, layer.feature.properties);
    });
    },
    });
      baseballStadiums.addTo(map);
      map.fitBounds(baseballStadiums.getBounds());
    });

if (map.scrollWheelZoom) {
  map.scrollWheelZoom.disable();
}