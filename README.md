# L.multiControl
Leaflet plugin to implements layers control with multiple functionality such as opacity, color, bringToFront, bringToBack, zoomToLayer, delete and legend.

![](https://media.giphy.com/media/G7qJ8OPXH9E77XdVJM/giphy-downsized-large.gif)

### [DEMO](https://serene-heyrovsky-2fb229.netlify.app/)

-----------------------------------------------------------------------------------
## Requirements

<ul>
  <li>Leaflet</li>
  <li>Font Awesome</li>
</ul>

This plugin require font awesome library to display icons in buttons.

## Install

### NPM

```
npm i leaflet-multicontrol
```  
## Supported features
<ul>
  <li>L.marker</li>
  <li>L.polygon</li>
  <li>L.GeoJSON</li>
</ul>

If you want to add support to specific feature please let me know in an issue or pull request.

## Usage Example

An easy way to implement layers control with multiple functionality. This plugin detects layer properties and will displays buttons (inputs) depend on it.

### Create features

```javascript
const marker = L.marker([51.5, -0.09]).addTo(map);
const marker2 = L.marker([51.51, -0.09]);
const marker3 = L.marker([51.52, -0.09]);
const polygon = L.polygon([[51.51, -0.1],[51.5, -0.08],[51.53, -0.07],[51.50, -0.06]], {color: '#FF0000'}).addTo(map);
const polygon2 = L.polygon([[51.51, -0.1],[51.5, -0.08],[51.53, -0.07],[51.50, -0.06]], {color: '#0122FF'}).addTo(map);

const mylines = [{
    "type": "LineString",
    "coordinates": [[-0.1,51.51], [-0.07,51.53]]
}, {
    "type": "LineString",
    "coordinates": [[-0.1,51.5], [-0.07,51.50]]
}];
const geojson = L.geoJSON(null).addTo(map);
geojson.addData(mylines);

const states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

const geojsonStates = L.geoJSON(states, {style: function(state) {
    return (state.properties.party === 'Republican') 
            ? {fillColor:'red', color:'red', opacity:1, legendLabel: state.properties.party} : {fillColor:'blue', color:'blue', opacity:1, legendLabel: state.properties.party}
}}).addTo(map);

```

### Implements

```javascript
const overlays = [
    {name: 'Marker', layer: marker},
    {name: 'Marker2', layer: marker2},
    {name: 'polygon', layer: polygon},
    {name: 'polygon2', layer: polygon2},
    {name: 'geojson', layer: geojson},
    {name: 'geojsonStates', layer: geojsonStates},
];

const legend = L.multiControl(overlays, {position:'topright', label: 'Control de capas'}).addTo(map);
```
#### Note: If you have a geojson with classification representation (such as example "geojsonStates") and you want visualize it in legend, you should add "legendLabel" property in L.path config that are included in style function.

L.multiControl receives two arguments:
<ul>
  <li>The first is an array of overlays objects</li>
  <li>The second is an object with control options</li>
</ul>

### Overlay config

| Property | Type   | Required  | Description                         |
| ------------|--- | -------- | ----------------------------------------- |
| name | String |true| Name of the layer. |
| layer     | Leaflet layer | true     | A leaflet layer included in Supported features |


### Options
| Option	  | Type | Default  | Description                       |
| ------------|--- | -------- | ----------------------------------------- |
| position	  |String | 'topright'    | Position of the control. Options: [leaflet control positions](https://docs.eegeo.com/eegeo.js/v0.1.665/docs/leaflet/L.Control/#control-positions) |
| label	  |String | 'Layer Control'    | Label that will be display in the header |

## Methods

| Method	  |  Description                       |
| ------------|----------------------------------------- |
| toggle()	   | Method to collapse / expand the control |
| addOverlay(overlay config)	   | Method to add Overlay into control |

## Rules

<ul>
  <li>Layers names must be unique</li>
</ul>
  


