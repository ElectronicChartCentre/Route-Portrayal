import { RTZtoGeoJSON } from '../src/RTZ/index.js';
import { repairRTZText } from '../src/RTZ/repairText.js';

const route = (name = 'First &amp; Second', extra = '') => `<route version="1.0">
  <routeInfo routeName="Test route"/>
  <waypoints>
    <waypoint id="0" name="${name}" radius="0.0000" ${extra}>
      <position lat="55.9" lon="14.4"/>
      <leg portsideXTD="0.0000" starboardXTD="0.0000"/>
    </waypoint>
    <waypoint id="0" name="Last" radius="0.0000">
      <position lat="55.8" lon="14.3"/>
      <leg portsideXTD="0.0000" starboardXTD="0.0000"/>
    </waypoint>
  </waypoints>
</route>`;

describe('conservative RTZ text repair', () => {
  test.each(['\n', '\r\n'])('tracks original field locations across same-line and multiline repairs (%j)', newline => {
    const xml = [
      '<route><routeInfo routeName="Route & name" description="Route & description">',
      '<description>Text & description</description></routeInfo>',
      '<waypoints><waypoint name="Valid &amp; name"/>',
      '<waypoint name="Multiline',
      'name & text" description="Waypoint & description">',
      '<description>Waypoint & text</description></waypoint></waypoints></route>'
    ].join(newline);
    const values = [
      ['routeName', 'Route & name'],
      ['description', 'Route & description'],
      ['description', 'Text & description'],
      ['name', `Multiline${newline}name & text`],
      ['description', 'Waypoint & description'],
      ['description', 'Waypoint & text']
    ];
    const expected = values.map(([field, value]) => {
      const position = xml.indexOf(value);
      const prefix = xml.slice(0, position);
      return {
        field,
        line: prefix.split('\n').length,
        column: position - prefix.lastIndexOf('\n'),
        count: 1
      };
    });
    expect(repairRTZText(xml).repairs).toEqual(expected);
  });

  test('tracks every repaired field in a large route', () => {
    const count = 10000;
    const xml = '<route><waypoints>\n' +
      Array.from({ length: count }, () => '<waypoint name="A & B"/>').join('\n') +
      '\n</waypoints></route>';
    const repaired = repairRTZText(xml);
    expect(repaired.repairs).toEqual(Array.from({ length: count }, (_, index) => ({
      field: 'name', line: index + 2, column: 17, count: 1
    })));
    expect(repaired.xml).toBe(xml.replace(/A & B/g, 'A &amp; B'));
  });

  test('repairs bare ampersands without changing route geometry or properties', () => {
    const onWarning = jest.fn();
    const input = route('First & Second &amp; Third &#38; Fourth &#x26; Fifth');
    const expected = RTZtoGeoJSON(input.replace('First & Second', 'First &amp; Second'));
    expect(RTZtoGeoJSON(input, { onWarning })).toEqual(expected);
    expect(onWarning).toHaveBeenCalledTimes(1);
    expect(onWarning).toHaveBeenCalledWith(expect.objectContaining({
      code: 'RTZ_TEXT_REPAIRED',
      repairs: [{ field: 'name', line: 4, column: expect.any(Number), count: 1 }]
    }));
  });

  test('reports repairs to the console when no warning callback is supplied', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      RTZtoGeoJSON(route('First & Second'));
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('Navigation fields were not changed'));
    } finally {
      warn.mockRestore();
    }
  });

  test('does not warn or rewrite valid XML', () => {
    const onWarning = jest.fn();
    const input = route('First &amp; Second &#38; &#x26; &quot; &apos; &lt; &gt;');
    RTZtoGeoJSON(input, { onWarning });
    expect(onWarning).not.toHaveBeenCalled();
    expect(repairRTZText(input)).toEqual({ xml: input, repairs: [] });
  });

  test.each([
    '&\u00e9;',
    '&\u540d;',
    '&e\u0301;',
    '&name\u00b7suffix;',
    '&\u{10000};',
    '&bad!;',
    '&#invalid;',
    '&#xZZ;'
  ])('preserves entity-like reference %s for parser rejection', entity => {
    const input = route().replace('Test route', `A ${entity} B`);
    const onWarning = jest.fn();
    expect(repairRTZText(input)).toEqual({ xml: input, repairs: [] });
    expect(() => RTZtoGeoJSON(input, { onWarning })).toThrow(/Failed to parse XML/);
    expect(onWarning).not.toHaveBeenCalled();

    const mixed = input.replace('First &amp; Second', 'First & Second');
    expect(repairRTZText(mixed).xml).toBe(input);
    expect(() => RTZtoGeoJSON(mixed, { onWarning })).toThrow(/Failed to parse XML/);
    expect(onWarning).not.toHaveBeenCalled();
  });

  test.each([
    ['route name', '<route><routeInfo routeName="A & B"/></route>'],
    ['single-quoted name', "<route><waypoints><waypoint name='A & B'/></waypoints></route>"],
    ['description attribute', '<route><waypoints><waypoint description="A & B"/></waypoints></route>'],
    ['description text', '<route><routeInfo><description>A & B</description></routeInfo></route>'],
    ['namespaced name', '<r:route xmlns:r="urn:rtz"><r:waypoints><r:waypoint name="A & B"/></r:waypoints></r:route>'],
    ['multiline name', '<route><waypoints><waypoint\n name="A & B"/></waypoints></route>']
  ])('repairs %s only', (_, xml) => {
    expect(repairRTZText(xml).xml).toBe(xml.replace('A & B', 'A &amp; B'));
    expect(repairRTZText(xml).repairs).toHaveLength(1);
  });

  test.each([
    '<route><waypoints><waypoint name="A & B" radius="1 & 2"/></waypoints></route>',
    '<route><waypoints><waypoint name="A & B"><position lat="55 & 9"/></waypoint></waypoints></route>',
    '<route><extensions><waypoint name="A & B"/></extensions></route>',
    '<route><waypoints><waypoint name="A &unknown; B"/></waypoints></route>',
    '<route><waypoints><waypoint name="A &#0; B"/></waypoints></route>',
    '<route><waypoints><waypoint name="A < B & C"/></waypoints></route>',
    '<route><waypoints><waypoint name="A & B></waypoint></waypoints></route>',
    '<route><waypoints><waypoint name="A & B"></waypoints></route>'
  ])('still rejects invalid XML: %s', xml => {
    const onWarning = jest.fn();
    expect(() => RTZtoGeoJSON(xml, { onWarning })).toThrow(/Failed to parse XML/);
    expect(onWarning).not.toHaveBeenCalled();
  });

  test('does not modify navigation attributes while repairing a name', () => {
    const xml = route('A & B', 'speed="12.50"');
    expect(repairRTZText(xml).xml).toBe(xml.replace('A & B', 'A &amp; B'));
  });

  test('does not scan comments, CDATA, processing instructions or extension text as tags', () => {
    const xml = `<route>
<!-- <waypoint name="A & B"/> -->
<?test name="A & B"?>
<routeInfo><description><![CDATA[<waypoint name="A & B"/>]]></description></routeInfo>
<extensions><description>A & B</description></extensions>
</route>`;
    expect(repairRTZText(xml)).toEqual({ xml, repairs: [] });
  });

  test('does not repair documents containing a DOCTYPE declaration', () => {
    const xml = '<!DOCTYPE route><route><routeInfo routeName="A & B"/></route>';
    expect(repairRTZText(xml)).toEqual({ xml, repairs: [] });
  });
});
