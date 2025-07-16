import { RouteWaypointLeg } from "../models/RouteWaypointLeg.js";
import { curveWaypointLeg, RouteToGeoJSON } from "../route.js";
import { parseGeoJsonToJS, convertGeoJsonWaypointToRouteWaypoint,
     convertGeoJsonLegToRouteWaypointLeg} from "./parser.js";



export function EditRouteWaypoint(geojson, waypointID, updateParams ){
    const { 
        coordinates, radius, reference, name,
        fixed, externalReferenceID, routeWaypointLeg, extensions  } = updateParams;

    if ([coordinates, radius, reference, name, fixed, externalReferenceID,
         routeWaypointLeg, extensions ]
         .every(param => param === undefined || param === null)) {
            
        throw new Error("No parameters provided for update");
    }

    const [legs, waypoints, actionpoints] = parseGeoJsonToJS(geojson);

    const waypoint = waypoints.find(wp => wp.getId() === waypointID);
    if(!waypoint) {
        throw new Error(`No waypoint found with ID: ${waypointID}`);
    }

    if(coordinates) waypoint.setCoordinates(coordinates);
    if(radius) waypoint.setRadius(radius);
    if(reference) waypoint.setReference(reference);
    if(name) waypoint.setRouteWaypointName(name);
    if(fixed !== undefined) waypoint.setRouteWaypointFixed(fixed);
    if(externalReferenceID) waypoint.setRouteWaypointExternalReferenceID(externalReferenceID);
    if(routeWaypointLeg) waypoint.setRouteWaypointLeg(routeWaypointLeg);
    if(extensions) waypoint.setRouteWaypointExtensions(extensions);

    return RouteToGeoJSON(legs, waypoints, actionpoints);
}


export function EditSingleRouteWaypoint(geojson, waypointID, updateParams) {
    if (!geojson || isNaN(waypointID) || !updateParams) {
        throw new Error("Invalid parameters provided for EditSingleRouteWaypoint");
    }
    const { 
        coordinates, radius, reference, name,
        fixed, externalReferenceID, extensions  } = updateParams;

    if ([coordinates, radius, reference, name, fixed, externalReferenceID,extensions]
         .every(param => param === undefined || param === null)) {
        throw new Error("No parameters provided for update");
    }
    if (typeof geojson === 'string') {
        geojson = JSON.parse(geojson);
    }
    const waypoint = geojson.features.find(f => f.properties.type == 'waypoint' && f.properties.id === waypointID);
    if(!waypoint) {
        throw new Error(`No waypoint found with ID: ${waypointID}`);
    }

    if(coordinates) waypoint.geometry.coordinates = coordinates;
    if(radius) waypoint.properties.radius = radius;
    if(reference) waypoint.properties.reference = reference;
    if(name) waypoint.properties.name = name;
    if(fixed !== undefined) waypoint.properties.fixed = fixed;
    if(externalReferenceID) waypoint.properties.externalReferenceID = externalReferenceID;
    if(extensions) waypoint.properties.extensions = extensions;

    if(!coordinates && !radius) return geojson;
    
    const   waypoints = [],
            legs = {},
            starboardXTDL = {},
            portXTDL = {},
            starboardCL = {},
            portCL = {},
            xtdlPolygons = {},
            clPolygons = {};

    for(let feature of geojson.features){
        switch(feature.properties.type) {
            case 'route-leg':
                legs[feature.properties.id] = feature;
                break;
            case 'waypoint':
                waypoints.push(feature);
                break;
            case 'route-leg-XTDL':
                if(feature.properties.side === 'starboard') {
                    starboardXTDL[feature.properties.routeLegID] = feature;
                }else{
                    portXTDL[feature.properties.routeLegID] = feature;
                }
                break;
            case 'route-leg-CL':
                if(feature.properties.side === 'starboard') {
                    starboardCL[feature.properties.routeLegID] = feature;
                }else{
                    portCL[feature.properties.routeLegID] = feature;
                }
                break;
            case 'route-leg-corridor-xtdl':
                xtdlPolygons[feature.properties.routeLegID] = feature;
                break;
            case 'route-leg-corridor-cl':
                clPolygons[feature.properties.routeLegID] = feature;
                break;
        }
    }
    const index = waypoints.findIndex(wp => wp.properties.id === waypointID);
    if (index === -1) {
        throw new Error(`Waypoint with ID ${waypointID} not found`);
    }

    // TODO: Handle if waypoint is at one of the ends of the route
    if (index === 0 || index === waypoints.length - 1) {
        throw new Error("Cannot edit waypoint at the start or end of the route");
    }

    let w1,w2,w3,w4,w5;
    if(waypoints[index - 2]) w1 = convertGeoJsonWaypointToRouteWaypoint(waypoints[index - 2]);
    if(waypoints[index - 1]) w2 = convertGeoJsonWaypointToRouteWaypoint(waypoints[index - 1]);
    if(waypoints[index])     w3 = convertGeoJsonWaypointToRouteWaypoint(waypoints[index]);
    if(waypoints[index + 1]) w4 = convertGeoJsonWaypointToRouteWaypoint(waypoints[index + 1]);
    if(waypoints[index + 2]) w5 = convertGeoJsonWaypointToRouteWaypoint(waypoints[index + 2]);

    const startLegID = w1?.getRouteWaypointLeg() || '';
    const endLegID = waypoints[index + 3]?.properties.routeWaypointLeg || '';


    let prevArc, arc, nextArc;
    if(w1 && w2 && w3) [prevArc] = curveWaypointLeg(w1, w2, w3);
    [arc] = curveWaypointLeg(w2, w3, w4);
    if(w3 && w4 && w5) [nextArc] = curveWaypointLeg(w3, w4, w5);

    let w2Leg, w3Leg, w4Leg, w5Leg;
    console.log('w2', w2.getRouteWaypointLeg());
    if(w2.getRouteWaypointLeg()) w2Leg = convertGeoJsonLegToRouteWaypointLeg(legs[w2.getRouteWaypointLeg()]);
    w3Leg = convertGeoJsonLegToRouteWaypointLeg(legs[w3.getRouteWaypointLeg()]);
    w4Leg = convertGeoJsonLegToRouteWaypointLeg(legs[w4.getRouteWaypointLeg()]);
    if(w5) w5Leg = convertGeoJsonLegToRouteWaypointLeg(legs[w5.getRouteWaypointLeg()]);


    w2Leg?.setCoordinates(prevArc ? prevArc.geometry.coordinates : [w2.getCoordinates()]);
    w3Leg.setCoordinates(arc ? arc.geometry.coordinates : [w3.getCoordinates()]);
    w4Leg.setCoordinates(nextArc ? nextArc.geometry.coordinates : [w4.getCoordinates()]);
    w5Leg?.setCoordinates(legs[w5.getRouteWaypointLeg()].geometry.coordinates);


    w2Leg?.appendLegLineCoordinates([legs[w2.getRouteWaypointLeg()].geometry.coordinates[0],
                                    legs[w2.getRouteWaypointLeg()].geometry.coordinates[0]]);
    w3Leg.appendLegLineCoordinates([w2Leg?.getCoordinates()[w2Leg?.getCoordinates().length - 1] || w2.getCoordinates(),
                                    w2Leg?.getCoordinates()[w2Leg?.getCoordinates().length - 1] || w2.getCoordinates()]);
    w4Leg.appendLegLineCoordinates([w3Leg.getCoordinates()[w3Leg.getCoordinates().length - 1],
                                    w3Leg.getCoordinates()[w3Leg.getCoordinates().length - 1]]);
    if(w5Leg) w5Leg.getCoordinates()[0] = w4Leg.getCoordinates()[w4Leg.getCoordinates().length - 1];

    const xtdlStarboard = [],
          xtdlPort = [],
          clStarboard = [],
          clPort = [];

    [w2Leg,w3Leg,w4Leg,w5Leg].forEach((leg,index) => {
        if(!leg) return;
        if(leg.getStarboardXTDL() !== 0 && leg.getPortXTDL() !== 0){
                xtdlStarboard.push(leg.starboardXTDLtoGeoJSON(index));
                xtdlPort.push(leg.portXTDLtoGeoJSON(index));
        }
        if(leg.getStarboardCL() !== 0 && leg.getPortCL() !== 0){
            clStarboard.push(leg.starboardCLtoGeoJSON(index));
            clPort.push(leg.portCLtoGeoJSON(index));
        }
    })

    RouteWaypointLeg.updateLegCorridors(xtdlStarboard, xtdlPort);
    RouteWaypointLeg.updateLegCorridors(clStarboard, clPort);


    if(startLegID){
        connectEndSegments(starboardXTDL[startLegID], xtdlStarboard[0]);
        connectEndSegments(portXTDL[startLegID], xtdlPort[0]);
        connectEndSegments(starboardCL[startLegID], clStarboard[0]);
        connectEndSegments(portCL[startLegID], clPort[0]);
    }
    if(endLegID){
        connectEndSegments(xtdlStarboard[xtdlStarboard.length-1], starboardXTDL[endLegID], false);
        connectEndSegments(xtdlPort[xtdlPort.length-1], portXTDL[endLegID], false);
        connectEndSegments(clStarboard[clStarboard.length-1], starboardCL[endLegID], false);
        connectEndSegments(clPort[clPort.length-1], portCL[endLegID], false);
    }

    const xtdlPoly = [];
    const clPoly = [];
    for(let i = 0; i < xtdlStarboard.length; i++){
        xtdlPoly.push(RouteWaypointLeg.createCorridorPolygons(xtdlStarboard[i], xtdlPort[i]));
    }
    for(let i = 0; i < clStarboard.length; i++){
        clPoly.push(RouteWaypointLeg.createCorridorPolygons(clStarboard[i], clPort[i]));
    }

    updateCoordinates(xtdlPoly, xtdlPolygons);
    updateCoordinates(clPoly, clPolygons);
    updateCoordinates(xtdlStarboard, starboardXTDL);
    updateCoordinates(xtdlPort, portXTDL);
    updateCoordinates(clStarboard, starboardCL);
    updateCoordinates(clPort, portCL);

    if(w2Leg) legs[w2Leg.getId()].geometry.coordinates = w2Leg.getCoordinates();
    legs[w3Leg.getId()].geometry.coordinates = w3Leg.getCoordinates();
    legs[w4Leg.getId()].geometry.coordinates = w4Leg.getCoordinates();
    if(w5Leg) legs[w5Leg.getId()].geometry.coordinates = w5Leg.getCoordinates();


    return geojson;

}


function connectEndSegments(first, second, front=true){
    if(!first || !second) return;

    if(front){
        if(second.properties.distance > first.properties.distance){
            second.geometry.coordinates.unshift(first.geometry.coordinates[first.geometry.coordinates.length - 1]);
        }else{
            second.geometry.coordinates[0] = first.geometry.coordinates[first.geometry.coordinates.length - 1];
        }
    }else{
        if(first.properties.distance > second.properties.distance){
            first.geometry.coordinates.push(second.geometry.coordinates[0]);
        }
    }
}

function updateCoordinates(source, target){
    source.forEach(s => target[s.properties.routeLegID].geometry.coordinates = s.geometry.coordinates);
}