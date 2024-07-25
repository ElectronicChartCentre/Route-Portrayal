import { RouteWaypointLeg } from "../src/models";
import { distance, lineString } from "@turf/turf";


describe('RouteWaypointLeg tests', () => {

    let leg;

    beforeEach(() => {
        const id = 'RTE.WPT.LEG.1';
        const routeWaypointLegStarboardXTDL = 100 ;
        const routeWaypointLegPortXTDL= 100;
        const routeWaypointLegStarboardCL= 200;
        const routeWaypointLegPortCL= 200;
        const routeWaypointLegSafetyContour = 10;
        const routeWaypointLegSafetyDepth = 20;
        const routeWaypointLegGeometryType = 1;
        const routeWaypointLegSOGMin = 1.0;
        const routeWaypointLegSOGMax = 1.0;
        const routeWaypointLegSTWMin = 1.0;
        const routeWaypointLegSTWMax = 1.0;
        const routeWaypointLegDraft = 1.0;
        const routeWaypointLegDraftForward = 1.0;
        const routeWaypointLegDraftAft = 1.0;
        const routeWaypointLegDraftMax = 1.0;
        const routeWaypointLegAirDraftMax = 1.0;
        const routeWaypointLegBeamMax = 1.0;
        const routeWaypointLegLengthMax = 1.0;
        const routeWaypointLegStaticUKC = 1.0;
        const routeWaypointLegDynamicUKC = 1.0;
        const routeWaypointLegSafetyMargin = 1.0;
        const routeWaypointLegNote = 'A note';
        const routeWaypointLegIssue = 'An issue message';
        const routeWaypointLegExtensions = {};


        leg = new RouteWaypointLeg(
            id, routeWaypointLegStarboardXTDL, routeWaypointLegPortXTDL,
            routeWaypointLegStarboardCL, routeWaypointLegPortCL,
            routeWaypointLegSafetyContour, routeWaypointLegSafetyDepth,
            routeWaypointLegGeometryType, routeWaypointLegSOGMin,
            routeWaypointLegSOGMax, routeWaypointLegSTWMin, routeWaypointLegSTWMax,
            routeWaypointLegDraft, routeWaypointLegDraftForward, routeWaypointLegDraftAft,
            routeWaypointLegDraftMax, routeWaypointLegAirDraftMax, routeWaypointLegBeamMax,
            routeWaypointLegLengthMax, routeWaypointLegStaticUKC, routeWaypointLegDynamicUKC,
            routeWaypointLegSafetyMargin, routeWaypointLegNote, routeWaypointLegIssue,
            routeWaypointLegExtensions);
    });

    test('RouteWaypointLeg constructor',()=>{

        expect(leg.id).toBe('RTE.WPT.LEG.1');
        expect(leg.routeWaypointLegStarboardXTDL).toBe(100);
        expect(leg.routeWaypointLegPortXTDL).toBe(100);
        expect(leg.routeWaypointLegStarboardCL).toBe(200);
        expect(leg.routeWaypointLegPortCL).toBe(200);
        expect(leg.routeWaypointLegSafetyContour).toBe(10);
        expect(leg.routeWaypointLegSafetyDepth).toBe(20);
        expect(leg.routeWaypointLegGeometryType).toBe(1);
        expect(leg.routeWaypointLegSOGMin).toBe(1.0);
        expect(leg.routeWaypointLegSOGMax).toBe(1.0);
        expect(leg.routeWaypointLegSTWMin).toBe(1.0);
        expect(leg.routeWaypointLegSTWMax).toBe(1.0);
        expect(leg.routeWaypointLegDraft).toBe(1.0);
        expect(leg.routeWaypointLegDraftForward).toBe(1.0);
        expect(leg.routeWaypointLegDraftAft).toBe(1.0);
        expect(leg.routeWaypointLegDraftMax).toBe(1.0);
        expect(leg.routeWaypointLegAirDraftMax).toBe(1.0);
        expect(leg.routeWaypointLegBeamMax).toBe(1.0);
        expect(leg.routeWaypointLegLengthMax).toBe(1.0);
        expect(leg.routeWaypointLegStaticUKC).toBe(1.0);
        expect(leg.routeWaypointLegDynamicUKC).toBe(1.0);
        expect(leg.routeWaypointLegSafetyMargin).toBe(1.0);
        expect(leg.routeWaypointLegNote).toBe('A note');
        expect(leg.routeWaypointLegIssue).toBe('An issue message');
        expect(leg.routeWaypointLegExtensions).toEqual({});
        expect(leg.type).toBe("route-leg");
        expect(leg.legCoordinates).toEqual([[],[]]);

    });

    test('RouteWaypointLeg constructor with invalid id',()=>{
        expect(()=>new RouteWaypointLeg(
            undefined, 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");
        
        expect(()=>new RouteWaypointLeg(
            '', 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");

        expect(()=>new RouteWaypointLeg(
            null, 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");
    });

    test('getter and setter methods, plus appendLegLineCoordinates',()=>{
        expect(leg.getId()).toBe('RTE.WPT.LEG.1');
        expect(leg.getCoordinates()).toEqual([[],[]]);
        expect(leg.getStarboardXTDL()).toBe(100);
        expect(leg.getPortXTDL()).toBe(100);
        expect(leg.getStarboardCL()).toBe(200);
        expect(leg.getPortCL()).toBe(200);

        // Setter methods
        expect(()=> leg.appendLegLineCoordinates([[5,3],[-2,-2]]))
        .toThrowError('No coordinates to append to');
        leg.setCoordinates([[1,2],[3,4]]);
        expect(leg.getCoordinates()).toEqual([[1,2],[3,4]]);
        leg.appendLegLineCoordinates([[5,3],[-2,-2]]);
        expect(leg.getCoordinates()).toEqual([[5,3],[1,2],[3,4]]);
        leg.appendLegLineCoordinates([[7,8],[2,3]]);
        expect(leg.getCoordinates()).toEqual([[7,8],[3,4],[1,2],[5,3]]);
    });


    test('toGeoJSON method',()=>{
        leg.setCoordinates([[1,2],[3,4]]);
        const geoJSON = leg.toGeoJSON();
        expect(geoJSON.type).toBe('Feature');
        expect(geoJSON.properties.id).toBe('RTE.WPT.LEG.1');
        expect(geoJSON.geometry.type).toBe('LineString');
        expect(geoJSON.geometry.coordinates).toEqual([[1,2],[3,4]]);
        expect(geoJSON.properties.type).toBe('route-leg');
        expect(geoJSON.properties.routeWaypointLegStarboardXTDL).toBe(100);
        expect(geoJSON.properties.routeWaypointLegPortXTDL).toBe(100);
        expect(geoJSON.properties.routeWaypointLegStarboardCL).toBe(200);
        expect(geoJSON.properties.routeWaypointLegPortCL).toBe(200);
        expect(geoJSON.properties.routeWaypointLegIssue).toEqual('An issue message');
    })

    test('offsetLine method',()=>{
        leg.setCoordinates([[1,1],[2,2],[3,3],[4,4]])

        const offset = leg.offsetLine(leg.toGeoJSON(),100); // offset by 100 meters starboard side

        const offset2 = leg.offsetLine(leg.toGeoJSON(),-100); // offset by 100 meters port side
        
        for (let i = 0; i < offset.geometry.coordinates.length; i++) {
            expect(distance(offset.geometry.coordinates[i],leg.toGeoJSON().geometry.coordinates[i],{units: 'meters'})).toBeCloseTo(100);
            expect(distance(offset2.geometry.coordinates[i],leg.toGeoJSON().geometry.coordinates[i],{units: 'meters'})).toBeCloseTo(100);
            expect(offset.geometry.coordinates[i]).not.toEqual(offset2.geometry.coordinates[i]);
            expect(distance(offset2.geometry.coordinates[i],offset.geometry.coordinates[i],{units: 'meters'})).toBeCloseTo(200);
        }
    });


    test('XTDL and CL to GeoJSON methods',()=>{
        const coords = [[1,1],[2,2],[3,3],[4,4]];
        leg.setCoordinates(coords);

        

        const starboardXTDL = leg.starboardXTDLtoGeoJSON();
        const portXTDL = leg.portXTDLtoGeoJSON();
        const starboardCL = leg.starboardCLtoGeoJSON();
        const portCL = leg.portCLtoGeoJSON();

        for (let i = 0; i < coords.length; i++) {
            expect(distance(starboardXTDL.geometry.coordinates[i],coords[i],{units: 'meters'})).toBeCloseTo(100);
            expect(distance(portXTDL.geometry.coordinates[i],coords[i],{units: 'meters'})).toBeCloseTo(100);
            expect(distance(starboardCL.geometry.coordinates[i],coords[i],{units: 'meters'})).toBeCloseTo(200);
            expect(distance(portCL.geometry.coordinates[i],coords[i],{units: 'meters'})).toBeCloseTo(200);
        }

        expect(starboardXTDL.properties.type).toBe('route-leg-XTDL');
        expect(starboardXTDL.properties.routeLegID).toBe('RTE.WPT.LEG.1');
        expect(starboardXTDL.properties.distance).toBe(100);
        expect(starboardXTDL.properties.side).toBe('starboard');


        expect(portXTDL.properties.type).toBe('route-leg-XTDL');
        expect(portXTDL.properties.routeLegID).toBe('RTE.WPT.LEG.1');
        expect(portXTDL.properties.distance).toBe(100);
        expect(portXTDL.properties.side).toBe('port');

        expect(starboardCL.properties.type).toBe('route-leg-CL');
        expect(starboardCL.properties.routeLegID).toBe('RTE.WPT.LEG.1');
        expect(starboardCL.properties.distance).toBe(200);
        expect(starboardCL.properties.side).toBe('starboard');

        expect(portCL.properties.type).toBe('route-leg-CL');
        expect(portCL.properties.routeLegID).toBe('RTE.WPT.LEG.1');
        expect(portCL.properties.distance).toBe(200);
        expect(portCL.properties.side).toBe('port');



    });


    test('createCorridorPolygons methods',()=>{

        let starboard = [[1,1],[2,2],[3,3]]
        let port = [[1,3],[2,4],[3,5]];
        expect(()=>RouteWaypointLeg.createCorridorPolygons(starboard,port)).toThrowError('Invalid input. Must be lineString.');


        starboard = lineString([[1,1],[2,2],[3,3]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        port = lineString([[1,3],[2,4],[3,5]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 123,
        });

        let expectedList = [[[1,1],[2,2],[3,3],[3,5],[2,4],[1,3],[1,1]]];

        let polygon = RouteWaypointLeg.createCorridorPolygons(starboard,port);
        expect(polygon.geometry.type).toBe('Polygon');
        expect(polygon.properties.type).toBe('route-leg-corridor-xtdl');
        expect(polygon.properties.routeLegID).toBe('RTE.WPT.LEG.1');
        expect(polygon.properties.portDistance).toBe(123);
        expect(polygon.properties.starboardDistance).toBe(100);
        expect(polygon.geometry.coordinates).toEqual(expectedList);


        starboard = lineString([[20,13],[21,13],[24,14]],{
            type: 'route-leg-CL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        port = lineString([[30,16],[32,16],[33,17]],{
            type: 'route-leg-CL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 123,
        });

        expectedList = [[[20,13],[21,13],[24,14],[33,17],[32,16],[30,16],[20,13]]];
        polygon = RouteWaypointLeg.createCorridorPolygons(starboard,port);
        expect(polygon.geometry.coordinates).toEqual(expectedList);
        expect(polygon.properties.type).toBe('route-leg-corridor-cl');


        // Test to make sure front coordinates are added to the polygon
        starboard = lineString([[1,1],[2,2],[3,3]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        port = lineString([[1,3],[2,4],[3,5]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        polygon = RouteWaypointLeg.createCorridorPolygons(starboard,port,{starboard:[1,0],port:[1,2]});
        expect(polygon.geometry.coordinates).toEqual([[[1,0],[1,1],[2,2],[3,3],[3,5],[2,4],[1,3],[1,2],[1,0]]]);


        // Test to make sure back coordinates are removed before
        // making the polygon.
        starboard = lineString([[1,1],[2,2],[3,3]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        port = lineString([[1,3],[2,4],[3,5]],{
            type: 'route-leg-XTDL',
            routeLegID: 'RTE.WPT.LEG.1',
            distance: 100,
        });
        polygon = RouteWaypointLeg.createCorridorPolygons(starboard,port,null,false);
        expect(polygon.geometry.coordinates).toEqual([[[1,1],[2,2],[2,4],[1,3],[1,1]]]);



    });


    test('updateLegCorridors method',()=>{

        // The distance is different
        let leg1 = lineString([[1,1],[2,1],[3,1]],{distance: 100});
        let leg2 = lineString([[4,2],[5,2],[6,2]],{distance: 200});
        let list = [leg1,leg2];
        RouteWaypointLeg.updateLegCorridors(list);
        expect(leg1.geometry.coordinates).toEqual([[1,1],[2,1],[3,1],[4,2]]);
        expect(leg2.geometry.coordinates).toEqual([[4,2],[5,2],[6,2]]);

        leg1 = lineString([[1,1],[4,1],[3,1]],{distance: 100});
        list = [leg1,leg2];
        RouteWaypointLeg.updateLegCorridors(list);
        expect(leg1.geometry.coordinates).toEqual([[1,1],[4,1],[4,2]]);
        expect(leg2.geometry.coordinates).toEqual([[4,2],[5,2],[6,2]]);

        // The distance is the same
        leg1 = lineString([[1,1],[2,1],[3,1]],{distance: 100});
        leg2 = lineString([[4,2],[5,2],[6,2]],{distance: 100});
        list = [leg1,leg2];
        RouteWaypointLeg.updateLegCorridors(list);
        expect(leg1.geometry.coordinates).toEqual([[1,1],[2,1],[3,1]]);
        expect(leg2.geometry.coordinates).toEqual([[3,1],[5,2],[6,2]]);


        leg1 = lineString([[1,1],[4,1],[3,1]],{distance: 100});
        leg2 = lineString([[4,2],[5,2],[6,2]],{distance: 100});
        list = [leg1,leg2];
        RouteWaypointLeg.updateLegCorridors(list);
        expect(leg1.geometry.coordinates).toEqual([[1,1],[4,1]]);
        expect(leg2.geometry.coordinates).toEqual([[4,1],[5,2],[6,2]]);


        

    });
});