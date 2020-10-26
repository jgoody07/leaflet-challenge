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
)

// Create the satelite layer that will be the background of our map
var satellite = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
    }
  )

// Create the satelite layer that will be the background of our map
var outdoor = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/outdoors-v11",
      accessToken: API_KEY
    }
  )

// creat an object to hold  an array of layers.
var myMap = L.map("map", {
    center: [
      40.7, -94.5
    ],
    zoom: 3,
    layers: [graymap, satellite, outdoor]
  });
// Layer group for Earthquakes
let earthquakes = new L.LayerGroup();

// Layer group for tech plates
let techplates = new L.LayerGroup();

// create radio buttons map options
let basemapOpt = {
    "Satellite": satellite,
    "Outdoor": outdoor,
    "Graymap": graymap}

// Create layer options
let overlayOpt = {
    "Earthquakes": earthquakes,
    "Techtonic Plates": techplates
}

L.control.layers(basemapOpt, overlayOpt).addTo(myMap) 