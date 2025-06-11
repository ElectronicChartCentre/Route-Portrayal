import { writeFile, readFile} from 'fs/promises';

import { editCurveSegment } from '../src/geoJSON/index.js';
import { parseGeoJsonToJS } from '../src/geoJSON/parser.js';


/* Comment and uncomment to run different dev scenarios*/

//editCurveSegementDev();
geoJsonToModelDev();



async function editCurveSegementDev(){
  let geojson = null;
  try {
    const data = await readFile('route1.json', 'utf8');
    geojson = JSON.parse(data);
  } catch (e) {
    console.error('Error reading JSON file:', e);
  }
  if(geojson){
    const features = geojson.features;
    const waypoints = features.filter(f => f.properties.type === 'waypoint');
    const legs = features.filter(f => f.properties.type === 'route-leg');
    const WP1 = waypoints.find(f => f.properties.id === 1);
    const WP2 = waypoints.find(f => f.properties.id === 2);
    const WP3 = waypoints.find(f => f.properties.id === 3);
    const leg12 = legs.find(f => f.properties.id === 'RTE.WPT.LEG.2');
    const leg23 = legs.find(f => f.properties.id === 'RTE.WPT.LEG.3');


    const [w1,w2,w3,l12,l23] = editCurveSegment(WP1, WP2, WP3, leg12, leg23, 0.6);

    console.log(geojson.features.length)
    geojson.features.push(w1,w2,w3,l12,l23);

    const jsonData = JSON.stringify(geojson, null, 2);
    try {
      await writeFile('./d1.json', jsonData);
      console.log('Operation completed');
    } catch (err) {
      console.error('Error:', err);
    }
  }
}

async function geoJsonToModelDev() {
  let geojson = null;
  try {
    const data = await readFile('../SampleFiles/GeoJSON/RTE-TEST-GFULL-S421.json', 'utf8');
    geojson = JSON.parse(data);
  } catch (e) {
    console.error('Error reading JSON file:', e);
  }
  if(geojson){
    const [legs, waypoints, actionpoints] = parseGeoJsonToJS(geojson);
    console.log('Legs:', legs);
    console.log('Waypoints:', waypoints);
    console.log('Action Points:', actionpoints);
  }
}

