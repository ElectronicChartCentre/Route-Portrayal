import fs from 'fs';
import path from 'path';

import {S421ToGeoJSON} from '../src/S421/index.js';

describe('S421toGeoJSON_TEST (integration with SampleFiles)', () => {
  const S421_DIR = path.resolve(__dirname, '../SampleFiles/S421');

  const s421files = fs
    .readdirSync(S421_DIR)
    .filter(f => f.endsWith('.s421')|| f.endsWith('.gml'));


  s421files.forEach((fileName) => {
    test(`converts ${fileName} into a valid GeoJSON FeatureCollection`, () => {
      const xml = fs.readFileSync(path.join(S421_DIR, fileName), 'utf8');
      const geojson = S421ToGeoJSON(xml);

      //It’s a GeoJSON FeatureCollection
      expect(geojson).toHaveProperty('type', 'FeatureCollection');
      expect(Array.isArray(geojson.features)).toBe(true);

      //It has at least one feature
      expect(geojson.features.length).toBeGreaterThan(0);

      //Every feature has geometry + properties
      geojson.features.forEach(feature => {
        expect(feature).toHaveProperty('geometry');
        expect(feature).toHaveProperty('properties');
      });

      //Snapshot the entire output so diffs are easy
      expect(geojson).toMatchSnapshot();
    });
  });
  test('Route will be null if no valid S421 xml is passed in',()=>{
    const xml = "THIS IS NOT A VALID S421 FILE";

    const geojson = S421ToGeoJSON(xml);
    expect(geojson).toBeNull()
  })
});
