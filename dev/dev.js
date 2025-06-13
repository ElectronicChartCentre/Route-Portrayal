import { writeFile, readFile} from 'fs/promises';

import { EditRouteWaypoint } from '../src/main.js';




geoJsonToModelDev();


async function geoJsonToModelDev() {
  let geojson = null;
  try {
    // ../SampleFiles/GeoJSON/RTE-TEST-GFULL-S421.json
    // ../SampleFiles/GeoJSON/NCA_Stavanger_Feinstein_OUT-RTZ.json
    const data = await readFile('../SampleFiles/GeoJSON/NCA_Stavanger_Feinstein_OUT-RTZ.json', 'utf8');
    geojson = JSON.parse(data);
  } catch (e) {
    console.error('Error reading JSON file:', e);
  }
  if(geojson){
    const newRoute = EditRouteWaypoint(geojson, 5, {
      name: "WP-7",
      radius:0.4,
    });

    const jsonData = JSON.stringify(newRoute, null, 2);
    try {
      await writeFile('./d1.json', jsonData);
      console.log('Operation completed');
    } catch (err) {
      console.error('Error:', err);
    }

  }
}

