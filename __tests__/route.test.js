import { createActionPoint, RouteWaypoint, RouteWaypointLeg } from "../src/models";
import { waypoints } from "../data/test/testData";
import { getCoordinates } from "../src/utility";
import {
  convertTo360_TEST,
  convertToNorthBearing_TEST,
  calculateMidLineBearing_TEST,
  determineBearingOrder_TEST,
  curveWaypointLeg_TEST,
  RouteToGeoJSON_TEST,
  calculateCircleCenterCoordinates_TEST,
} from "../src/route";

import { point, lineString, bearing, distance } from "@turf/turf";

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


import { distance } from "@turf/turf";

describe("curveWaypointLeg tests", () => {
  function circumcenter(a, b, c) {
    const ax = a[0],
      ay = a[1];
    const bx = b[0],
      by = b[1];
    const cx = c[0],
      cy = c[1];

    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 1e-12) return null; // nearly collinear

    const ax2ay2 = ax * ax + ay * ay;
    const bx2by2 = bx * bx + by * by;
    const cx2cy2 = cx * cx + cy * cy;

    const ux =
      (ax2ay2 * (by - cy) + bx2by2 * (cy - ay) + cx2cy2 * (ay - by)) / d;
    const uy =
      (ax2ay2 * (cx - bx) + bx2by2 * (ax - cx) + cx2cy2 * (bx - ax)) / d;

    return {
      type: "Feature",
      geometry: { type: "Point", coordinates: [ux, uy] },
      properties: {},
    };
  }

  test("valid lineString arc and tangentpoints are returned based on the middle point radius", () => {
    let WPs = [];
    for (let wp of waypoints) {
      WPs.push(
        new RouteWaypoint(
          parseInt(wp.routeWaypointID._text),
          wp._attributes.id,
          wp.routeWaypointName._text,
          getCoordinates(wp.geometry.pointProperty.Point.pos._text),
          false,
          parseFloat(wp.routeWaypointTurnRadius._text),
          wp.routeWaypointLeg._attributes.href.split("#")[1],
          {}
        )
      );
    }

    let result = curveWaypointLeg_TEST(WPs[0], WPs[1], WPs[2]);
    expect(result).not.toBeNull();
    expect(result.length).toBe(3);

    const [circleArc, tangent1, tangent2] = result;

    expect(tangent1).not.toBeNull();
    expect(tangent2).not.toBeNull();
    expect(tangent1.geometry.type).toBe("Point");
    expect(tangent2.geometry.type).toBe("Point");

    if (circleArc == null) {
      expect(tangent1.geometry.coordinates).toEqual(WPs[1].getCoordinates());
      expect(tangent2.geometry.coordinates).toEqual(WPs[1].getCoordinates());
      return;
    }

    expect(circleArc.geometry.type).toBe("LineString");


    expect(tangent1.properties.waypoint).toBe(WPs[1].getId());
    expect(tangent1.properties.linkedTo).toBe(WPs[0].getId());
    expect(tangent1.properties.routeWaypointLeg).toBe(
      WPs[1]?.getRouteWaypointLeg() || ""
    );
    expect(tangent1.properties.used).toBe(false);

    expect(tangent2.properties.waypoint).toBe(WPs[1].getId());
    expect(tangent2.properties.linkedTo).toBe(WPs[2].getId());
    expect(tangent2.properties.routeWaypointLeg).toBe(
      WPs[1]?.getRouteWaypointLeg() || ""
    );
    expect(tangent2.properties.used).toBe(false);

    if (circleArc == null) {
      expect(tangent1.geometry.coordinates).toEqual(WPs[1].getCoordinates());
      expect(tangent2.geometry.coordinates).toEqual(WPs[1].getCoordinates());
      return;
    }

    expect(circleArc.geometry.type).toBe("LineString");

    const coords = circleArc.geometry.coordinates;
    expect(coords.length).toBeGreaterThan(3);

    // Pick 3 well-separated points on the arc
    const a = coords[0];
    const b = coords[Math.floor(coords.length / 2)];
    const c = coords[coords.length - 1];

    const center = circumcenter(a, b, c);
    expect(center).not.toBeNull();

    const r = WPs[1].getRadius();
    const pa = {
      type: "Feature",
      geometry: { type: "Point", coordinates: a },
      properties: {},
    };
    const pb = {
      type: "Feature",
      geometry: { type: "Point", coordinates: b },
      properties: {},
    };
    const pc = {
      type: "Feature",
      geometry: { type: "Point", coordinates: c },
      properties: {},
    };

    const da = distance(center, pa, { units: "nauticalmiles" });
    const db = distance(center, pb, { units: "nauticalmiles" });
    const dc = distance(center, pc, { units: "nauticalmiles" });

    expect(da).toBeCloseTo(r, 2);
    expect(db).toBeCloseTo(r, 2);
    expect(dc).toBeCloseTo(r, 2);
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
        ));
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