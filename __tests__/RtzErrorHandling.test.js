import { RTZtoGeoJSON } from '../src/RTZ/index.js';

describe('RTZtoGeoJSON error handling', () => {
  test('reports XML parser details when a repair cannot produce a complete route', () => {
    const xml = `<route>
  <routeInfo vesselName="Bad & Vessel"/>
</route>`;

    expect(() => RTZtoGeoJSON(xml)).toThrow(
      /Failed to parse XML: Invalid character in entity name[\s\S]*Line: \d+[\s\S]*Column: \d+/
    );
  });

  test.each([null, '', '<notRoute/>'])('rejects missing route input: %s', (xml) => {
    expect(() => RTZtoGeoJSON(xml)).toThrow(/Invalid RTZ file/);
  });

  test('preserves escaped waypoint names and imports without defaultWaypoint', () => {
    const xml = `<route version="1.0">
  <routeInfo routeName="Good &amp; Route"/>
  <waypoints>
    <waypoint id="0" name="First &amp; Second" radius="0.0000">
      <position lat="55.9" lon="14.4"/>
      <leg portsideXTD="0.0000" starboardXTD="0.0000"/>
    </waypoint>
    <waypoint id="0" name="Last" radius="0.0000">
      <position lat="55.8" lon="14.3"/>
      <leg portsideXTD="0.0000" starboardXTD="0.0000"/>
    </waypoint>
  </waypoints>
</route>`;

    const geojson = RTZtoGeoJSON(xml);
    expect(geojson.type).toBe('FeatureCollection');
    const waypoints = geojson.features.filter(feature => feature.properties.type === 'waypoint');
    expect(waypoints).toHaveLength(2);
    expect(waypoints.map(feature => feature.properties.name)).toEqual(['First & Second', 'Last']);
    expect(waypoints.map(feature => feature.geometry.coordinates)).toEqual([
      [14.4, 55.9],
      [14.3, 55.8]
    ]);
  });
});
