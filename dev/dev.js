import { writeFile, readFile} from 'fs/promises';

import { convertGeoJsonWaypointToWaypoint } from '../src/geoJSON/parser.js';


let geojson = null;
try {
  const data = await readFile('route1.json', 'utf8');
  geojson = JSON.parse(data);
  // console.log(geojson);
} catch (e) {
  console.error('Error reading JSON file:', e);
}

if(geojson){
  const features = geojson.features;
  const waypoints = features.filter(f => f.properties.type === 'waypoint');
  const legs = features.filter(f => f.properties.type === 'route-leg');
  const WP1 = waypoints.find(f => f.properties.id === 6);
  const WP2 = waypoints.find(f => f.properties.id === 7);
  const WP3 = waypoints.find(f => f.properties.id === 8);
  const leg12 = legs.find(f => f.properties.id === 'RTE.WPT.LEG.7');
  const leg23 = legs.find(f => f.properties.id === 'RTE.WPT.LEG.8');


  //console.log(WP1, WP2, WP3);
  //console.log(leg12, leg23);
  convertGeoJsonWaypointToWaypoint(WP1);



  // for(let feature of features){
  //   console.log(feature.properties.type, feature.properties.id);
  // }
}






// const data = { hello: 'world' };
// const jsonData = JSON.stringify(data, null, 2);

// try {
//   await writeFile('./dev/data.json', jsonData);
//   console.log('Filen ble lagret!');
// } catch (err) {
//   console.error('Feil:', err);
// }
