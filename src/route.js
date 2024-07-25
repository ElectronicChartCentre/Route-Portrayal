import {
    featureCollection,  point, lineString,
    bearing, lineArc, destination, lineIntersect
} from '@turf/turf'; 
import { RouteWaypointLeg } from "./models/index.js";


export function RouteToGeoJSON(waypointLegs, waypoints, actionPoints) {
    const tangentPoints = [];
    const geoJSON = featureCollection([]);

    if(waypoints == null || waypoints.length === 0 ){
        throw new Error('No waypoints found');
    }

    // Handle special case when the route only contains two waypoints
    if (waypoints.length === 2) {
        let leg;
        if (waypointLegs !== null && Object.keys(waypointLegs).length === 1) {
            leg = waypointLegs[Object.keys(waypointLegs)[0]];
        } else {
            leg = new RouteWaypointLeg(waypoints[0].getRouteWaypointLeg() ||
                waypoints[1].getRouteWaypointLeg() || 'RTE.WPT.LEG.0');
        }
        leg.setCoordinates([waypoints[0].getCoordinates(), waypoints[1].getCoordinates()])
        // Add features to feature collection
        geoJSON.features.push(leg.toGeoJSON());
        waypoints.forEach(wp => geoJSON.features.push(wp.toGeoJSON()));
        geoJSON.features.push(...actionPoints);
        return geoJSON;
    }

    // Create waypointleg curves
    for (let i = 1; i < waypoints.length - 1; i++) {
        const [circleCenter, tanget1, tangent2] = curveWaypointLeg(waypoints[i - 1], waypoints[i], waypoints[i + 1]);
        if (circleCenter != null) { 
            waypointLegs[circleCenter.properties.routeWaypointLeg].setCoordinates([...circleCenter.geometry.coordinates]);
        } else {
            waypointLegs[waypoints[i].getRouteWaypointLeg()].setCoordinates([waypoints[i].getCoordinates()]);
        }
        tangentPoints.push(tanget1, tangent2);
    }
    // Create leg lines between curves and add them to corresponding waypointLegs
    for (let point of tangentPoints) {
        if (point.properties.used) {
            continue;
        }
        let linkedTo = point.properties.linkedTo;
        let linkedPoint = tangentPoints.find(p => p.properties.waypoint === linkedTo &&
            p.properties.linkedTo === point.properties.waypoint);

        if (linkedPoint != undefined && !linkedPoint.properties.used) {
            waypointLegs[point.properties.routeWaypointLeg]
                .appendLegLineCoordinates([point.geometry.coordinates, linkedPoint.geometry.coordinates]);
            linkedPoint.properties.used = true;
            point.properties.used = true;
        } else if (linkedTo === waypoints[0].getId()) {
            waypointLegs[point.properties.routeWaypointLeg]
                .appendLegLineCoordinates([waypoints[0].getCoordinates(), point.geometry.coordinates]);
            point.properties.used = true;
        } else if (linkedTo === waypoints[waypoints.length - 1].getId()) {
            waypointLegs[point.properties.routeWaypointLeg]
                .setCoordinates([point.geometry.coordinates, waypoints[waypoints.length - 1].getCoordinates()]);
            point.properties.used = true;
        }
    }

    // Add features to feature collection
    const xtdlStarboard = [],
        xtdlPort = [],
        clStarboard = [],
        clPort = [],
        xtdlPolygons = [],
        clPolygons = [];
    Object.values(waypointLegs).forEach(leg => {
        if (leg.getCoordinates()[0].length > 0) {
            geoJSON.features.push(leg.toGeoJSON());

            if (leg.getStarboardXTDL() !== 0) xtdlStarboard.push(leg.starboardXTDLtoGeoJSON());
            if (leg.getPortXTDL() !== 0) xtdlPort.push(leg.portXTDLtoGeoJSON());
            if (leg.getStarboardCL() !== 0) clStarboard.push(leg.starboardCLtoGeoJSON());
            if (leg.getPortCL() !== 0) clPort.push(leg.portCLtoGeoJSON());

            if (xtdlStarboard.length > 1) RouteWaypointLeg.updateLegCorridors(xtdlStarboard);
            if (xtdlPort.length > 1) RouteWaypointLeg.updateLegCorridors(xtdlPort);
            if (clStarboard.length > 1) RouteWaypointLeg.updateLegCorridors(clStarboard);
            if (clPort.length > 1) RouteWaypointLeg.updateLegCorridors(clPort);
        }
    });

    
    if (xtdlStarboard.length > 0 && xtdlStarboard.length === xtdlPort.length){
        createCorridors(xtdlStarboard, xtdlPort, xtdlPolygons);
    }

    if (clStarboard.length > 0 && clStarboard.length === clPort.length){
        createCorridors(clStarboard, clPort, clPolygons);
    }

    geoJSON.features.push(...xtdlStarboard, ...xtdlPort, ...clStarboard, ...clPort, ...xtdlPolygons, ...clPolygons);
    waypoints.forEach(wp => geoJSON.features.push(wp.toGeoJSON()));
    geoJSON.features.push(...actionPoints);
    return geoJSON;
}

// For now, this function assumes that the corridor distance is the
// same for both starboard and port side. This is not always the case
// and should be fixed in the future.
function createCorridors(starboard, port, polygons) {
    let front, back;
    for(let i = 0; i < starboard.length; i++){
        front = {
            starboard: null,
            port: null
        };
        back = true;
        if(starboard[i-1]){
            if(starboard[i-1].properties.distance < starboard[i].properties.distance){
                front.starboard = starboard[i-1].geometry.coordinates[starboard[i-1].geometry.coordinates.length-2]
                front.port = port[i-1].geometry.coordinates[port[i-1].geometry.coordinates.length-2]
            }
        }
        if(starboard[i+1]){
            if(starboard[i+1].properties.distance > starboard[i].properties.distance){
                back = false
            }
        }
        polygons.push(RouteWaypointLeg.createCorridorPolygons(starboard[i], port[i], front, back));
    }

}



function curveWaypointLeg(W1, W2, W3) {
    // No curve is needed if the turn radius is 0 or less
    if (W2.getRadius() <= 0.0) {
        const t1 = point(W2.getCoordinates(), {
            "waypoint": W2.getId(),
            "linkedTo": W1.getId(),
            "routeWaypointLeg": W2?.getRouteWaypointLeg() || "",
            "used":false
        });
        const t2 = point(W2.getCoordinates(), {
            "waypoint": W2.getId(),
            "linkedTo": W3.getId(),
            "routeWaypointLeg": W3?.getRouteWaypointLeg() || "",
            "used":false
        });
        return [null, t1, t2];
    }
    // Create imaginary lines between the waypoints
    const line1 = lineString([W1.getCoordinates(), W2.getCoordinates()]);
    const line2 = lineString([W2.getCoordinates(), W3.getCoordinates()]);
    // Calculate the bearings
    const bearing21 = bearing(W2.toGeoJSON(), W1.toGeoJSON());
    const bearing23 = bearing(W2.toGeoJSON(), W3.toGeoJSON());
    // Calculate the midline bearing
    let midLineBearing = calculateMidLineBearing(bearing21, bearing23);

    // Calculate the circle center and the tangent points between the circle and the imaginary lines
    const [circleCenter, tangent1, tangent2] = calculateCircleCenterCoordinates(midLineBearing, W2, line1, line2);

    // Specify the tangent points, making it easier to delete them later
    tangent1.properties = {
        "waypoint": W2.getId(),
        "linkedTo": W1.getId(),
        "routeWaypointLeg":W2?.getRouteWaypointLeg() || "",
        "used": false
    };
    tangent2.properties = {
        "waypoint": W2.getId(),
        "linkedTo": W3.getId(),
        "routeWaypointLeg":W3?.getRouteWaypointLeg() || "",
        "used": false
    };
    if(circleCenter == null){
        return [circleCenter, tangent1, tangent2];
    }

    // Calculate bearing from circle center to tangent points
    const cBearing1 = bearing(circleCenter, tangent1);
    const cBearing2 = bearing(circleCenter, tangent2);

    // Confirm that the order of the bearings is correct for drawing the circle arc
    const [b1, b2] = determineBearingOrder(cBearing1, cBearing2);

    // Create the lineString for the circle arc
    const circleArc = lineArc(circleCenter, W2.getRadius(), b1, b2, { steps: 100 });

    circleArc.properties = {
        "routeWaypointLeg":W2?.getRouteWaypointLeg() || ""
    };
    return [
        circleArc,
        tangent1,
        tangent2
    ];
}


function determineBearingOrder(b1, b2) {
    b1 = convertTo360(b1) % 360;
    b2 = convertTo360(b2) % 360;

    if (b1 > b2) {
        let temp = b1;
        b1 = b2;
        b2 = temp;
    }

    let difference = b2 - b1;

    if (difference > 180) {
        // The difference is greater than 180, so the shortest way/angle is through 0 degrees N.
        // Therefore, the largest angle will be returned first, then the smallest
        return [convertToNorthBearing(b2), convertToNorthBearing(b1)];
    } else {
        // The difference is less than 180, so the smallest angle will be returned first, then the larger one
        return [convertToNorthBearing(b1), convertToNorthBearing(b2)];
    }
}


function calculateCircleCenterCoordinates(midLineBearing, W2, line1, line2) {
    let circleCenter, circle, difference, t1, t2;
    let distance = 30; // Distance from W2 to circle center in km. Can be improved to be dynamic
    let previousDistance = distance * 2;
    let count = 0;
    while (true) {
        circleCenter = destination(W2.toGeoJSON(), distance, midLineBearing);
        circle = lineArc(circleCenter, W2.getRadius(), 0, 360, { steps: 100 });
        t1 = lineIntersect(circle, line1);
        t2 = lineIntersect(circle, line2);
        difference = Math.abs(previousDistance - distance);
        if (t1.features.length === 0 || t2.features.length === 0) {
            // Decrease the distance
            previousDistance = distance;
            distance -= difference * 0.5;
        } else if (t1.features.length === 1 && t2.features.length === 1) {
            // Increase the distance
            previousDistance = distance;
            distance += difference * 0.5;
        }
        else if (t1.features.length > 1 || t2.features.length > 1) {
            if (Math.abs(previousDistance - distance) < 1e-5) {
                // Intersections are found that satisfy the conditions
                break;
            }
            previousDistance = distance;
            distance += difference * 0.5;
        }

        if (count > 60) {
            return [null, point(W2.getCoordinates()), point(W2.getCoordinates())];
        }
        count++;

    }
    return [circleCenter, t1.features[0], t2.features[0]];

}

function calculateMidLineBearing(bearing1, bearing2) {
    let b1 = convertTo360(bearing1) % 360;
    let b2 = convertTo360(bearing2) % 360;

    // Make sure b1 is the smallest bearing
    if (b1 > b2) {
        let temp = b1;
        b1 = b2;
        b2 = temp;
    }
    const difference = b2 - b1;

    if (difference > 180) {
        let angle = (b1 + difference / 2) % 360;
        return convertToNorthBearing((angle + 180) % 360);
    } else {
        return convertToNorthBearing((b1 + difference / 2) % 360);
    }
}

function convertTo360(bearing) {
    if (bearing < -180 || bearing > 180) {
        throw new Error('Bearing must be between -180 and 180 degrees');
    }
    if (bearing < 0) {
        bearing += 360;
    }
    return bearing;
}

function convertToNorthBearing(bearing) {
    bearing = bearing % 360;
    if (bearing > 180) {
        bearing -= 360;
    }
    return bearing;
}

// Only for testing
export {
    convertTo360 as convertTo360_TEST,
    convertToNorthBearing as convertToNorthBearing_TEST,
    calculateMidLineBearing as calculateMidLineBearing_TEST,
    calculateCircleCenterCoordinates as calculateCircleCenterCoordinates_TEST,
    determineBearingOrder as determineBearingOrder_TEST,
    curveWaypointLeg as curveWaypointLeg_TEST,
    createCorridors as createCorridors_TEST,
    RouteToGeoJSON as RouteToGeoJSON_TEST
};