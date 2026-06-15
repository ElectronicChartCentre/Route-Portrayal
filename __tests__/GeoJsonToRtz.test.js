import fs from 'fs';
import path from 'path';

import { GeoJSONtoRTZ, RTZtoGeoJSON } from '../src/RTZ/index.js';

function getWaypoints(geojson) {
  return geojson.features
    .filter((feature) => feature?.properties?.type === 'waypoint')
    .sort((a, b) => Number(a.properties.id) - Number(b.properties.id));
}

describe('GeoJSONtoRTZ tests', () => {
  const GEOJSON_DIR = path.resolve(__dirname, '../SampleFiles/GeoJSON');
 // const OUTPUT_DIR = path.resolve(__dirname, '../SampleFiles/RTZ/GeneratedFromGeoJSON');
  const geojsonFiles = fs
    .readdirSync(GEOJSON_DIR)
    .filter((fileName) => fileName.endsWith('.json'));
/*
test('writes RTZ files from GeoJSON samples for manual inspection', () => {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    geojsonFiles.forEach((fileName) => {
      const geojsonPath = path.join(GEOJSON_DIR, fileName);
      const sourceGeoJSON = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));
      const routeName = path.parse(fileName).name;
      const outputFileName = `${routeName}.rtz`;
      const outputPath = path.join(OUTPUT_DIR, outputFileName);

      const xml = GeoJSONtoRTZ(sourceGeoJSON, routeName);
      fs.writeFileSync(outputPath, xml, 'utf8');

      expect(fs.existsSync(outputPath)).toBe(true);
      expect(xml).toContain(`routeName="${routeName}"`);
    });
  });  */

  geojsonFiles.forEach((fileName) => {
    test(`converts ${fileName} to RTZ xml and back to GeoJSON`, () => {
      const geojsonPath = path.join(GEOJSON_DIR, fileName);
      const sourceGeoJSON = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

      const routeName = path.parse(fileName).name;
      const xml = GeoJSONtoRTZ(sourceGeoJSON, routeName);

      expect(typeof xml).toBe('string');
      expect(xml).toContain('<route');
      expect(xml).toContain('<waypoint');
      expect(xml).toContain(`routeName="${routeName}"`);

      const roundTripGeoJSON = RTZtoGeoJSON(xml);

      const sourceWaypoints = getWaypoints(sourceGeoJSON);
      const roundTripWaypoints = getWaypoints(roundTripGeoJSON);

      expect(roundTripWaypoints.length).toBe(sourceWaypoints.length);

      sourceWaypoints.forEach((waypoint, index) => {
        expect(roundTripWaypoints[index].geometry.coordinates[0]).toBeCloseTo(waypoint.geometry.coordinates[0], 6);
        expect(roundTripWaypoints[index].geometry.coordinates[1]).toBeCloseTo(waypoint.geometry.coordinates[1], 6);
        expect(roundTripWaypoints[index].properties.radius).toBeCloseTo(waypoint.properties.radius, 6);
      });
    });
  });
});
