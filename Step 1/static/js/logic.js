// Create the map object with options.
var myMap = L.map("map", {
  center: [0,0],
  zoom: 2
});

// Create the tile layer that will be the background of our map.
var graymap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }
).addTo(myMap);


// Make an AJAX call that retrieves our earthquake geoJSON data and make a promise
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {
  
  // Create a function to determine the color of the marker based on the magnitude of the earthquake.
  function getColor(depth) {
    switch (true) {
    case depth > 90:
      return "#ea2c2c";
    case depth > 70:
      return "#ea822c";
    case depth > 50:
      return "#ee9c00";
    case depth > 30:
      return "#eecc00";
    case depth > 10:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }
  // Create a function to determine the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  // Create a function for the style data for each of the earthquakes shown on the map
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]), 
      color: "#000000",
      radius: getRadius(feature.properties.mag), 
      stroke: true,
      weight: 0.5
    };
  }

  // add GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // turn each feature into a circleMarker on the map using geoJson data
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // set the style for each circleMarker 
    style: styleInfo,
    // create a popup for each marker to display the magnitude and location of the earthquake 
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
      );
    }
  }).addTo(myMap);

  // Create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });
  // Details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var mag = [-10, 10, 30, 50, 70, 90];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Loop through our intervals and generate a label with a colored square for each interval.
    for (var i = 0; i < mag.length; i++) {
      div.innerHTML += "<i style='background:"
        + colors[i]
        + "'></i> "
        + mag[i]
        + (mag[i + 1] ? "&ndash;" + mag[i + 1] + "<br>" : "+");
    }
    return div;
  };
  
  // Add legend to the map.
  legend.addTo(myMap);

  });

