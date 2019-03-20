// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L, Mustache */

var map = L.map('map');

var popupTemplate = document.querySelector('.popup-template').innerHTML;

var baseballStadiums;

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/ddouglasgoody/cjt51r9e52vh31fnzfxnai5is/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGRvdWdsYXNnb29keSIsImEiOiJjamx6b3dpODYwcm81M2tudzl2MXVpbmY2In0.vvdeorhZQhm2WxrIcM3YMA', {
  maxZoom: 15
}).addTo(map);

fetch('https://cdn.glitch.com/c4800747-940d-4b1d-95ec-5b931ad404e4%2Fnyc_baseball_stadiums_20190318.geojson?1552950475220')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    baseballStadiums = L.geoJson(data, {
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      style: function (geoJsonFeature) {
        console.log(geoJsonFeature);
        // If status is Current, change color to green
        if (geoJsonFeature.properties.status === 'Current') {
          return {
            fillColor: '#f90202',
            fillOpacity: 1,
            radius: 6,
            stroke: false
          };
        }
        else {
          // Else return the default style
          return {
            fillColor: '#201C0A',
            fillOpacity: 0.8,
            radius: 6,
            stroke: false
          };
        }
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

// function selectStadium(name) {
//   // TODO:
//   // * find stadium
//   baseballStadiums.eachLayer(function (layer) {
//     console.log(layer.feature.properties.stadium, name);
//     if (layer.feature.properties.stadium === name) {
//       // We found it!
//       // * zoom to stadium
//       // * show stadium data in sidebar
//     }
//   });
// }

// var stadPicker = document.querySelector('.stad-picker');

// // When the stadium picker changes, load data for that borough
// stadPicker.addEventListener('change', function () {
//   // loadData(stadPicker.value);
//   console.log(stadPicker.value)
// });

var sourcesBtn = document.querySelector('#sourcesBtn');
sourcesBtn.addEventListener('click', function() {
  document.getElementById("sourcesOver").style.display = "block";
});

function sourcesOverOff() {
  document.getElementById("sourcesOver").style.display = "none";
};

var homeButton = document.querySelector('.home-button');
homeButton.addEventListener('click', function () {
  map.fitBounds(baseballStadiums.getBounds());
});

if (map.scrollWheelZoom) {
  map.scrollWheelZoom.disable();
}