import fs from 'fs';
import path from 'path';

import { RTZtoGeoJSON } from '../src/RTZ/index.js';

describe('RTZtoGeoJSON_TEST (integration with SampleFiles)', () => {
  const RTZ_DIR = path.resolve(__dirname, '../SampleFiles/RTZ');

  const rtzFiles = fs
    .readdirSync(RTZ_DIR)
    .filter(f => f.endsWith('.rtz'));

  rtzFiles.forEach((fileName) => {
    test(`converts ${fileName} into a valid GeoJSON FeatureCollection`, () => {
      const xml = fs.readFileSync(path.join(RTZ_DIR, fileName), 'utf8');
      const geojson = RTZtoGeoJSON(xml);

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
});
