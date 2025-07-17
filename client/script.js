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
    center: [5.7, 58.9],
    zoom: 9
})
import {S421ToGeoJSON, RTZtoGeoJSON, createLayers, createCorridorLayers, EditRouteWaypoint} from '../dist/routePortrayal.esm.mjs';
let geojson;

try {
    const response = await fetch('http://localhost:3000')
    const data = await response.text();
    if (data == null) {
        throw new Error('No data');
    }
    geojson = S421ToGeoJSON(text);
   
    document.querySelector('#info').textContent = '';
} catch (e) {
    document.querySelector('#info').textContent = 'No source file found online. Upload a file to display a route.';
}


map.on('load', async () => {

    const form = document.querySelector('form');
    const fileInput = document.querySelector('input[type="file"]');
    const select = document.querySelector('select');
    const editForm = document.querySelector('#form-edit');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = fileInput.files[0];
       if(!file){
            document.querySelector('#info').textContent = 'No file selected';
            return;
       }
        reader.readAsText(file, "UTF-8");
        reader.onload = async (e) => {
            const text = e.target.result;
            try{
                if(select.value === 'rtz'){
                    geojson = RTZtoGeoJSON(text);
                }else{
                    geojson = S421ToGeoJSON(text);
                }
            }catch(e){
                document.querySelector('#info').textContent = 'Invalid file format: '+ e ;
            }
            
            if (geojson) {
                document.querySelector('#info').textContent = '';
                if (map.getSource('geojsonSource')) {
                    map.getSource('geojsonSource').setData(geojson);
                } else {
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

            }

        };
    });
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(geojson){
            const waypointID = document.querySelector('#wpid').value;
            let name = document.querySelector('#wpname').value;
            let radius = document.querySelector('#wprad').value;
            let longitude = document.querySelector('#wplong').value;
            let latitude = document.querySelector('#wplat').value;
            let coordinates;

            if(name=== '')name = null;
            if(radius === '') radius = null;
            if(longitude === '' || latitude === ''){
                coordinates = null;
            }else{
                coordinates = [parseFloat(longitude), parseFloat(latitude)];
            }

            try {
                geojson = EditRouteWaypoint(geojson, parseInt(waypointID), {
                    name: name,
                    radius: parseFloat(radius),
                    coordinates: coordinates 
                });
                map.getSource('geojsonSource').setData(geojson);
                document.querySelector('#info').textContent = 'Route updated successfully';
            } catch (error) {
                document.querySelector('#info').textContent = 'Error updating route: ' + error.message;
            }

        }
    })

    if (geojson) {
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


const checkXTDL = document.querySelector('#chk-xtdl');
const checkCL = document.querySelector('#chk-cl');

checkXTDL.addEventListener('change', (e) => {
    if (e.target.checked) {
        map.setLayoutProperty('route-leg-corridor-xtdl', 'visibility', 'visible');
    } else {
        map.setLayoutProperty('route-leg-corridor-xtdl', 'visibility', 'none');
    }
});
checkCL.addEventListener('change', (e) => {
    if (e.target.checked) {
        map.setLayoutProperty('route-leg-corridor-cl', 'visibility', 'visible');
    } else {
        map.setLayoutProperty('route-leg-corridor-cl', 'visibility', 'none');
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

map.on('mouseenter','waypoint-circle',(e) =>{
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    const id = feature.properties.id;
    const name = feature.properties.name || '';
    const radius = feature.properties.radius || '';
    const coordinates = feature.geometry.coordinates;
    const leg = feature.properties.routeWaypointLeg || '';
    const reference = feature.properties.reference || '';
    const fixed = feature.properties.fixed;
    const externalRefID = feature.properties.externalReferenceID || '';
    const html = `<strong>Waypoint ID: ${id}</strong><br>
    Name: ${name}<br>
    Radius: ${radius} meters<br>
    Coordinates: [${coordinates[0]}, ${coordinates[1]}]<br>
    Leg: ${leg}<br>
    Reference: ${reference}<br>
    Fixed: ${fixed}<br>
    External Reference ID: ${externalRefID}`;
    popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
})
map.on('mouseleave','waypoint-circle', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

function showCurrentWaypointParams(e){
    e.preventDefault();
    const id = parseInt(document.querySelector('#wpid').value);
    if(geojson){
        const waypoint = geojson.features.find(f => f.properties.id === id);
        if(waypoint){
            document.querySelector('#wpid').value = waypoint.properties.id;
            document.querySelector('#wpname').value = waypoint.properties.name || '';
            document.querySelector('#wprad').value = waypoint.properties.radius || '';
            document.querySelector('#wplong').value = waypoint.geometry.coordinates[0] || '';
            document.querySelector('#wplat').value = waypoint.geometry.coordinates[1] || '';
            document.querySelector('#message').textContent = '';
        }else{
            document.querySelector('#message').textContent = 'Waypoint not found';
        }
    }else{
        document.querySelector('#message').textContent = 'No route loaded';
    }
}
const b = document.querySelector('#showCurrentBtn');
b.addEventListener('click', showCurrentWaypointParams);