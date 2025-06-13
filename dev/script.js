const style = {
    "version": 8,
    "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    "sources": {
        "osm": {
            "type": "raster",
            "tiles": ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"],
            "tileSize": 256,
            "maxzoom": 19
        }
    },
    "layers": [
        {
            "id": "osm",
            "type": "raster",
            "source": "osm" // This must match the source key above
        }
    ]
};

const map = new maplibregl.Map({
    container: 'map', 
    style: style, 
    center: [5.7, 59.0304],
    zoom: 9
})
import {createLayers, createCorridorLayers} from '../dist/routePortrayal.esm.mjs';
let geojson;

try {
    const response = await fetch('./d1.json')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data == null) {
        throw new Error('No data');
    }
    geojson = data;
   
    document.querySelector('#info').textContent = '';
} catch (e) {
    document.querySelector('#info').textContent = 'No source file found online. Upload a file to display a route.';
}


map.on('load', async () => {


    if (geojson) {
        console.log(geojson)
        map.addSource('geojsonSource', {
            'type': 'geojson',
            'data': geojson
        });
        if(map.getStyle().layers.length < 2){
            const corridorLayers = createCorridorLayers('geojsonSource');
            for (let layer of corridorLayers) {
                map.addLayer(layer);
            }
            const layers = createLayers('geojsonSource');
            for (let layer of layers) {
                map.addLayer(layer);
            }
        }
    }
});



const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'route-leg-xtdl',(e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    const id = feature.properties.routeLegID;
    const html = `<strong>${id}</strong><br> Distance: ${feature.properties.distance} meters <br> Side: ${feature.properties.side}<br>Type: XTD(L)`;
    popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
});

map.on('mouseleave','route-leg-xtdl', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

map.on('mouseenter', 'route-leg-cl',(e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    const id = feature.properties.routeLegID;
    const html = `<strong>${id}</strong><br> Distance: ${feature.properties.distance} meters <br> Side: ${feature.properties.side}<br>Type: CL`;
    popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
});

map.on('mouseleave','route-leg-cl', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});