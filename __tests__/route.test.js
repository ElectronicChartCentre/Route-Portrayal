import { lineString } from '@turf/turf';
import { createActionPoint, RouteWaypoint, RouteWaypointLeg } from "../src/models";
import { waypoints, curveWaypointLegResult } from "../data/test/testData";
import { getCoordinates } from "../src/utility";
import {
    convertTo360_TEST, convertToNorthBearing_TEST,
    calculateMidLineBearing_TEST, determineBearingOrder_TEST,
    curveWaypointLeg_TEST, createCorridors_TEST, RouteToGeoJSON_TEST
} from "../src/route";



describe('convertTo360 tests', ()=>{
    test('bearings between 0 and 180 degrees stay the same',()=>{
        let degrees = [45.323,59,180,0,90.45533];
        let expectedResult = [45.323,59,180,0,90.45533];
        for(let i = 0; i < degrees.length; i++){
            expect(convertTo360_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertTo360_TEST(degrees[i])).toBeGreaterThanOrEqual(0);
            expect(convertTo360_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });

    test('bearings between -180 and 0 are converted to a values bewteen 180 and 360',()=>{
        let degrees = [-90.45, -178.5, -1, -20.555,-180];
        let expectedResult = [269.55, 181.5, 359, 339.445,180];
        for(let i = 0; i < degrees.length; i++){
            expect(convertTo360_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertTo360_TEST(degrees[i])).toBeGreaterThanOrEqual(180);
            expect(convertTo360_TEST(degrees[i])).toBeLessThanOrEqual(360);
        }
    });

    test('invalid bearings throws an error',()=>{
        let degrees = [-190, 190, 361, -181];
        for(let i = 0; i < degrees.length; i++){
            expect(()=>{convertTo360_TEST(degrees[i])}).toThrow();
        }
    });

});


describe('convertToNorthBearing tests', ()=>{
    test('bearings between 0 and 180 degrees stay the same',()=>{
        let degrees = [45.323,59,180,0,90.45533];
        let expectedResult = [45.323,59,180,0,90.45533];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(0);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });

    test('bearings between 180 and 360 are converted to a values bewteen -180 and 0',()=>{
        let degrees = [200.334, 181, 330, 359];
        let expectedResult = [-159.666, -179, -30, -1];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(-180);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(0);
        }
    });

    test('bearings below 0 and above 360 still get converted',()=>{
        let degrees = [-90.45, -178.5, -1, -20.555,-180, 361, 370];
        let expectedResult = [-90.45, -178.5, -1, -20.555,-180, 1, 10];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(-180);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });
});

describe('calculateMidLineBearing tests', ()=>{
    test('the middle angle is returned from bearings between 0 and 180 degrees', ()=>{
        let bearing1 = 45;
        let bearing2 = 135;
        let expectedResult = 90;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = 10;
        bearing2 = 166;
        expectedResult = 88;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });
    test('the middle angle is returned from bearings between -180 and 0 degrees', ()=>{
        let bearing1 = -30;
        let bearing2 = -160;
        let expectedResult = -95;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -160;
        bearing2 = -60;
        expectedResult = -110;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });

    test('the middle angle is returned from bearings between -90 and 90 degrees', ()=>{
        let bearing1 = -30;
        let bearing2 = 60;
        let expectedResult = 15;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -78;
        bearing2 = 24;
        expectedResult = -27;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -120;
        bearing2 = 120;
        expectedResult = 180;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -155;
        bearing2 = 95;
        expectedResult = 150;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });

});

describe('determineBearingOrder tests', ()=>{
    test('the smallest bearing is returned first when both bearings are between 0 and 180 degrees',()=>{
        let bearing1 = 45;
        let bearing2 = 135;
        let expectedResult = [bearing1,bearing2];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
        bearing1 = 170;
        bearing2 = 160.66;
        expectedResult = [bearing2,bearing1];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
    });

    test('the smallest bearing is returned first when both bearings are between -180 and 0 degrees',()=>{
        let bearing1 = -170;
        let bearing2 = -10;
        let expectedResult = [bearing1,bearing2];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
        bearing1 = -5;
        bearing2 = -15;
        expectedResult = [bearing2,bearing1];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
    });

    test('bearing between -90 and 0 should come before bearing between 0 and 90',()=>{
        let bearing1 = -45;
        let bearing2 = 20;
        let expectedResult = [bearing1,bearing2];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
        bearing1 = 89;
        bearing2 = -89;
        expectedResult = [bearing2,bearing1];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
    });

    test('bearing between 90 and 180 should come before bearing between -180 and -90',()=>{
        let bearing1 = 135;
        let bearing2 = -160;
        let expectedResult = [bearing1,bearing2];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);
        bearing1 = -90;
        bearing2 = 179;
        expectedResult = [bearing2,bearing1];
        expect(determineBearingOrder_TEST(bearing1, bearing2)).toStrictEqual(expectedResult);

    });

});


describe('curveWaypointLeg tests', ()=>{

    test('valid lineString arc and tangentpoints are returned based on the middle point radius',()=>{
        let WPs = [];
        for(let wp of waypoints){
            WPs.push(new RouteWaypoint(
                parseInt(wp.routeWaypointID._text),
                wp._attributes.id,
                wp.routeWaypointName._text,
                getCoordinates(wp.geometry.pointProperty.Point.pos._text),
                false,
                parseFloat(wp.routeWaypointTurnRadius._text),
                wp.routeWaypointLeg._attributes.href.split('#')[1],
                {}
            ));
        }
        
        let result = curveWaypointLeg_TEST(WPs[0], WPs[1], WPs[2]);
        expect(result).not.toBeNull();
        expect(result.length).toBe(3);
        expect(result).toEqual(curveWaypointLegResult);
    });

});

describe('createCorridors tests',()=>{
    test('test to make sure the corridor polygons are created as expected',()=>{
        const polygons = [],
        starboard = [],
        port = [];

        starboard.push(lineString([[1,1],[2,2],[3,3]],{distance: 100, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}));
        port.push(lineString([[0,0],[-1,-1],[-2,-2]],{distance: 100, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}))

        starboard.push(lineString([[2,2],[3,3],[4,4]],{distance: 200, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}));
        port.push(lineString([[1,1],[0,0],[-1,-1]],{distance: 200, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}))

        starboard.push(lineString([[3,3],[4,4],[5,5]],{distance: 100, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}));
        port.push(lineString([[2,2],[1,1],[0,0]],{distance: 100, routeLegID:"WPT.LEG1.1", type:"route-leg-CL"}))


        createCorridors_TEST(starboard, port, polygons);
        expect(polygons.length).toBe(3);
        expect(polygons[0].geometry.coordinates).toEqual([[[1,1],[2,2],[-1,-1],[0,0],[1,1]]]);
        expect(polygons[1].geometry.coordinates).toEqual([[[2,2],[2,2],[3,3],[4,4],[-1,-1],[0,0],[1,1],[-1,-1],[2,2]]]);
        expect(polygons[2].geometry.coordinates).toEqual([[[3,3],[4,4],[5,5],[0,0],[1,1],[2,2],[3,3]]]);

    });
});


describe('RouteToGeoJSON method',()=>{

    let waypoints, legs, actionpoints;

    beforeEach(()=>{
        waypoints = [];
        legs = {};
        actionpoints = [];
        for(let i = 1; i< 6;i++){
            waypoints.push(new RouteWaypoint(
                i,
                "WPT"+i,
                "Waypoint "+i,
                [i,i],
                false,
                3.0,
                "WPT.LEG."+i,
                "",
                {}
            ));
        }
        for(let i = 1; i< 6;i++){
            legs["WPT.LEG."+i] = new RouteWaypointLeg(
                "WPT.LEG."+i, 100, 100, 150,150,20,20,1,
                0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,
                '','',{}
            );
        }

        actionpoints.push(createActionPoint(
            "point","RTE.ACT.PT.1",1,"Actionpoint 1",[2.1,2.1],1.1,2.0,0,'',{}
        ).toGeoJSON());
    });

    test('error is thrown when no waypoints are specified',()=>{
        expect(()=>{RouteToGeoJSON_TEST({},null,[])}).toThrow('No waypoints found');
        expect(()=>{RouteToGeoJSON_TEST({},[],[])}).toThrow('No waypoints found');
    });

    test('handle special case when the route only contains two waypoints',()=>{
        let reducedWaypoints = [];
        let leg = {
            'WPT.LEG.1': legs['WPT.LEG.1']
        }
        reducedWaypoints.push(waypoints[0]);
        reducedWaypoints.push(waypoints[1]);
       
        let result = RouteToGeoJSON_TEST(leg,reducedWaypoints,actionpoints);
        expect(result.features.length).toBe(4);
        expect(result.features[0].properties.id).toEqual('WPT.LEG.1');
        expect(result.features[1].properties.id).toBe(1);
        expect(result.features[2].properties.id).toBe(2);
        expect(result.features[3].properties.id).toEqual('RTE.ACT.PT.1');


        reducedWaypoints[0].routeWaypointLeg = '';
        reducedWaypoints[1].routeWaypointLeg = '';
        result = RouteToGeoJSON_TEST(null,reducedWaypoints,actionpoints);
        expect(result.features.length).toBe(4);
        expect(result.features[0].properties.id).toEqual('RTE.WPT.LEG.0');
    });

    test('the route is converted to a geojson object with all features included',()=>{
        waypoints[3].routeWaypointTurnRadius = 0.0;
        let result = RouteToGeoJSON_TEST(legs,waypoints,actionpoints);
        expect(result).not.toBeNull();
        expect(result.type).toBe('FeatureCollection');
        expect(result.features.length).toBe(34);

        let wps=[],lgs=[],aps=[],xtdl=[],
        cl=[],xtdlPoly=[],clPoly=[];
        for(let feature of result.features){
            if(feature.properties.type === 'waypoint') wps.push(feature);
            else if(feature.properties.type === 'route-leg') lgs.push(feature);
            else if(feature.properties.type === 'actionpoint-point') aps.push(feature);
            else if(feature.properties.type === 'route-leg-XTDL') xtdl.push(feature);
            else if(feature.properties.type === 'route-leg-CL') cl.push(feature);
            else if(feature.properties.type === 'route-leg-corridor-xtdl') xtdlPoly.push(feature);
            else if(feature.properties.type === 'route-leg-corridor-cl') clPoly.push(feature);
        }

        expect(wps.length).toBe(5);
        expect(lgs.length).toBe(4);
        expect(aps.length).toBe(1);
        expect(xtdl.length).toBe(8);
        expect(cl.length).toBe(8);
        expect(xtdlPoly.length).toBe(4);
        expect(clPoly.length).toBe(4);
    });
});