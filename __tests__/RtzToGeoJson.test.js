import fs from 'fs';
import path from 'path';

import { RTZtoGeoJSON } from '../src/RTZ/index.js';

const types = ['waypoint', 'actionpoint-point', 'actionpoint-curve','actionpoint-surface',
  'route-leg-corridor-cl','route-leg-corridor-xtdl','route-leg-CL','route-leg-XTDL','route-leg'];

describe('RTZtoGeoJSON_TEST (integration with SampleFiles)', () => {
  const RTZ_DIR = path.resolve(__dirname, '../SampleFiles/RTZ');

  const rtzFiles = fs
    .readdirSync(RTZ_DIR)
    .filter(f => f.endsWith('.rtz'));

  rtzFiles.forEach((fileName) => {
    test(`converts ${fileName} into a valid GeoJSON FeatureCollection`, () => {
      const xml = fs.readFileSync(path.join(RTZ_DIR, fileName), 'utf8');
      const geojson = RTZtoGeoJSON(xml);

      expect(geojson).toHaveProperty('type', 'FeatureCollection');
      expect(Array.isArray(geojson.features)).toBe(true);

      expect(geojson.features.length).toBeGreaterThan(0);

      geojson.features.forEach(feature => {
        expect(feature).toHaveProperty('geometry');
        expect(feature).toHaveProperty('properties');
        expect(feature.properties).toHaveProperty('type');
        expect(types).toContain(feature.properties.type);
      });

    });
  });
});
