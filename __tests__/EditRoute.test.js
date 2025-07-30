import fs from 'fs';
import path from 'path';

import {EditRouteWaypointNewRoute, EditRouteWaypoint} from '../src/geoJSON/index.js';

const types = ['waypoint', 'actionpoint-point', 'actionpoint-curve','actionpoint-surface',
  'route-leg-corridor-cl','route-leg-corridor-xtdl','route-leg-CL','route-leg-XTDL','route-leg'];

describe('EditRouteWaypointNewRoute_TEST (integration with SampleFiles)', () => {
  const GEOJSON_DIR = path.resolve(__dirname, '../SampleFiles/GeoJSON');

  const jsonfiles = fs
    .readdirSync(GEOJSON_DIR)
    .filter(f => f.endsWith('.json'));


    test(`${jsonfiles[0]} EditRouteWaypointNewRoute test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[0]}`), 'utf8');
        const geojson = EditRouteWaypointNewRoute(json,4,{
            reference: 'ref-4',
            fixed: true,
            externalReferenceID: 'ext-4',
            routeWaypointLeg: 'RTE.WPT.LEG.4',
            extensions:{remarks: 'This is a test waypoint'}


        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 4));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([14.36584855,55.92565437]);
        expect(waypoint4.properties.radius).toBe(0.3);
        expect(waypoint4.properties.name).toBe('Åhus Buoy No 5');
        expect(waypoint4.properties.reference).toBe('ref-4');
        expect(waypoint4.properties.fixed).toBe(true);
        expect(waypoint4.properties.externalReferenceID).toBe('ext-4');
        expect(waypoint4.properties.routeWaypointLeg).toBe('RTE.WPT.LEG.4');
        expect(waypoint4.properties.extensions).toEqual({remarks: 'This is a test waypoint'});


        expect(()=>EditRouteWaypointNewRoute(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypointNewRoute(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');

    })


    test(`${jsonfiles[1]} EditRouteWaypointNewRoute test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[1]}`), 'utf8');
        const geojson = EditRouteWaypointNewRoute(json,5,{
            radius: 0.4,
            coordinates: [
                    5.56832327,
                    59.15087647
            ],
            name: 'Waypoint 5',


        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 5));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([5.56832327, 59.15087647]);
        expect(waypoint4.properties.radius).toBe(0.4);
        expect(waypoint4.properties.name).toBe('Waypoint 5');
        expect(waypoint4.properties.reference).toBe('RTE.WPT.5');
        expect(waypoint4.properties.fixed).toBe(false);
        expect(waypoint4.properties.externalReferenceID).toBe('');
        expect(waypoint4.properties.routeWaypointLeg).toBe('RTE.WPT.LEG.5');
        expect(waypoint4.properties.extensions).toEqual({});

        expect(()=>EditRouteWaypointNewRoute(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypointNewRoute(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');

    })


    test(`${jsonfiles[2]} EditRouteWaypointNewRoute test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[2]}`), 'utf8');
        const geojson = EditRouteWaypointNewRoute(json,5,{
            radius: 0.8,
            coordinates: [
                    18.744942,
                    56.446594
                ],
            name: 'Waypoint 5',
            reference: 'ref-5',
            fixed: true,
            externalReferenceID: 'ext-5',
            routeWaypointLeg: 'RTE.WPT.LEG.5',
            extensions:{remarks: 'This is a test waypoint'}


        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 5));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([18.744942,56.446594]);
        expect(waypoint4.properties.radius).toBe(0.8);
        expect(waypoint4.properties.name).toBe('Waypoint 5');
        expect(waypoint4.properties.reference).toBe('ref-5');
        expect(waypoint4.properties.fixed).toBe(true);
        expect(waypoint4.properties.externalReferenceID).toBe('ext-5');
        expect(waypoint4.properties.routeWaypointLeg).toBe('RTE.WPT.LEG.5');
        expect(waypoint4.properties.extensions).toEqual({remarks: 'This is a test waypoint'});


        expect(()=>EditRouteWaypointNewRoute(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypointNewRoute(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');

    })
});



describe('EditRouteWaypoint_TEST (integration with SampleFiles)', () => {
  const GEOJSON_DIR = path.resolve(__dirname, '../SampleFiles/GeoJSON');

  const jsonfiles = fs
    .readdirSync(GEOJSON_DIR)
    .filter(f => f.endsWith('.json'));


    test(`${jsonfiles[0]} EditRouteWaypoint test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[0]}`), 'utf8');
        const geojson = EditRouteWaypoint(json,4,{
            reference: 'ref-4',
            fixed: true,
            externalReferenceID: 'ext-4',
            extensions:{remarks: 'This is a test waypoint'}

        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 4));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([14.36584855,55.92565437]);
        expect(waypoint4.properties.radius).toBe(0.3);
        expect(waypoint4.properties.name).toBe('Åhus Buoy No 5');
        expect(waypoint4.properties.reference).toBe('ref-4');
        expect(waypoint4.properties.fixed).toBe(true);
        expect(waypoint4.properties.externalReferenceID).toBe('ext-4');
        expect(waypoint4.properties.extensions).toEqual({remarks: 'This is a test waypoint'});


        expect(()=>EditRouteWaypoint(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypoint(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');

    })


    test(`${jsonfiles[1]} EditRouteWaypoint test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[1]}`), 'utf8');
        const geojson = EditRouteWaypoint(json,5,{
            radius: 0.4,
            coordinates: [
                    5.56832327,
                    59.15087647
            ],
            name: 'Waypoint 5',

        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 5));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([5.56832327, 59.15087647]);
        expect(waypoint4.properties.radius).toBe(0.4);
        expect(waypoint4.properties.name).toBe('Waypoint 5');
        expect(waypoint4.properties.reference).toBe('RTE.WPT.5');
        expect(waypoint4.properties.fixed).toBe(false);
        expect(waypoint4.properties.externalReferenceID).toBe('');
        expect(waypoint4.properties.routeWaypointLeg).toBe('RTE.WPT.LEG.5');
        expect(waypoint4.properties.extensions).toEqual({});


        expect(()=>EditRouteWaypoint(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypoint(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');
        expect(()=>EditRouteWaypoint(null,4,{name:'test'})).toThrow('Invalid parameters provided for EditRouteWaypoint')
        expect(()=>EditRouteWaypoint(geojson,'aaa',{name:'test'})).toThrow('Invalid parameters provided for EditRouteWaypoint')
        expect(()=>EditRouteWaypoint(geojson,4,null)).toThrow('Invalid parameters provided for EditRouteWaypoint')

    })


    test(`${jsonfiles[2]} EditRouteWaypoint test`,()=>{
        const json = fs.readFileSync(path.join(GEOJSON_DIR, `${jsonfiles[2]}`), 'utf8');
        const geojson = EditRouteWaypoint(json,5,{
            radius: 0.8,
            coordinates: [
                    18.744942,
                    56.446594
                ],
            name: 'Waypoint 5',
            reference: 'ref-5',
            fixed: true,
            externalReferenceID: 'ext-5',
            extensions:{remarks: 'This is a test waypoint'}


        });

        expect(geojson).toHaveProperty('type', 'FeatureCollection');
        expect(Array.isArray(geojson.features)).toBe(true);

        expect(geojson.features.length).toBeGreaterThan(0);

        geojson.features.forEach(feature => {
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.properties).toHaveProperty('type');
            expect(types).toContain(feature.properties.type);
        });

        const waypoint4 = geojson.features.find(feature => (feature.properties.type==='waypoint' && feature.properties.id === 5));
        expect(waypoint4).toBeDefined();
        expect(waypoint4.geometry.coordinates).toEqual([18.744942,56.446594]);
        expect(waypoint4.properties.radius).toBe(0.8);
        expect(waypoint4.properties.name).toBe('Waypoint 5');
        expect(waypoint4.properties.reference).toBe('ref-5');
        expect(waypoint4.properties.fixed).toBe(true);
        expect(waypoint4.properties.externalReferenceID).toBe('ext-5');
        expect(waypoint4.properties.extensions).toEqual({remarks: 'This is a test waypoint'});


        expect(()=>EditRouteWaypoint(geojson,3,{})).toThrow('No parameters provided for update');
        expect(()=>EditRouteWaypoint(geojson,1111,{name:'test'})).toThrow('No waypoint found with ID: 1111');

    })
});
