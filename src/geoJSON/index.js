import { distance, point } from "@turf/turf";
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
        fixed, externalReferenceID, routeWaypointLeg, extensions  } = updateParams;

    if ([coordinates, radius, reference, name, fixed, externalReferenceID,
         routeWaypointLeg, extensions ]
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
    // if(routeWaypointLeg) waypoint.properties.routeWaypointLeg = routeWaypointLeg;
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


    const prevPrevWp = convertGeoJsonWaypointToRouteWaypoint(waypoints[index - 2]);
    const prevWp = convertGeoJsonWaypointToRouteWaypoint(waypoints[index - 1]);
    const wp = convertGeoJsonWaypointToRouteWaypoint(waypoints[index]);
    const nextWp = convertGeoJsonWaypointToRouteWaypoint(waypoints[index + 1]);
    const nextNextWp = convertGeoJsonWaypointToRouteWaypoint(waypoints[index + 2]);

    const startLegID = prevPrevWp.getRouteWaypointLeg() || '';
    const endLegID = waypoints[index + 3]?.properties.routeWaypointLeg || '';


    const [prevArc] = curveWaypointLeg(prevPrevWp, prevWp, wp);
    const [arc] = curveWaypointLeg(prevWp, wp, nextWp);
    const [nextArc] = curveWaypointLeg(wp, nextWp, nextNextWp);

    const prevLeg = convertGeoJsonLegToRouteWaypointLeg(legs[prevWp.getRouteWaypointLeg()]);
    const leg = convertGeoJsonLegToRouteWaypointLeg(legs[wp.getRouteWaypointLeg()]);
    const nextLeg = convertGeoJsonLegToRouteWaypointLeg(legs[nextWp.getRouteWaypointLeg()]);
    const nextNextLeg = convertGeoJsonLegToRouteWaypointLeg(legs[nextNextWp.getRouteWaypointLeg()]);


    prevLeg.setCoordinates(prevArc ? prevArc.geometry.coordinates : [prevWp.getCoordinates()]);
    leg.setCoordinates(arc ? arc.geometry.coordinates : [wp.getCoordinates()]);
    nextLeg.setCoordinates(nextArc ? nextArc.geometry.coordinates : [nextWp.getCoordinates()]);
    nextNextLeg.setCoordinates(legs[nextNextWp.getRouteWaypointLeg()].geometry.coordinates);


    prevLeg.appendLegLineCoordinates([legs[prevWp.getRouteWaypointLeg()].geometry.coordinates[0],legs[prevWp.getRouteWaypointLeg()].geometry.coordinates[0]]);
    leg.appendLegLineCoordinates([prevLeg.getCoordinates()[prevLeg.getCoordinates().length - 1],prevLeg.getCoordinates()[prevLeg.getCoordinates().length - 1]]);
    nextLeg.appendLegLineCoordinates([leg.getCoordinates()[leg.getCoordinates().length - 1],leg.getCoordinates()[leg.getCoordinates().length - 1]]);
    
    nextNextLeg.getCoordinates()[0] = nextLeg.getCoordinates()[nextLeg.getCoordinates().length - 1];

    const xtdlStarboard = [],
          xtdlPort = [],
          clStarboard = [],
          clPort = [];

    [prevLeg,leg,nextLeg,nextNextLeg].forEach((leg,index) => {
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


    endsOfSegment(starboardXTDL[startLegID], xtdlStarboard[0]);
    endsOfSegment(xtdlStarboard[xtdlStarboard.length-1], starboardXTDL[endLegID], false);

    endsOfSegment(portXTDL[startLegID], xtdlPort[0]);
    endsOfSegment(xtdlPort[xtdlPort.length-1], portXTDL[endLegID], false);

    endsOfSegment(starboardCL[startLegID], clStarboard[0]);
    endsOfSegment(clStarboard[clStarboard.length-1], starboardCL[endLegID], false);

    endsOfSegment(portCL[startLegID], clPort[0]);
    endsOfSegment(clPort[clPort.length-1], portCL[endLegID], false);


    let xtdlPoly = [];
    let clPoly = [];
    for(let i = 0; i < xtdlStarboard.length; i++){
        xtdlPoly.push(RouteWaypointLeg.createCorridorPolygons(xtdlStarboard[i], xtdlPort[i]));
    }
    for(let i = 0; i < clStarboard.length; i++){
        clPoly.push(RouteWaypointLeg.createCorridorPolygons(clStarboard[i], clPort[i]));
    }

    xtdlPoly.forEach((p =>{
        xtdlPolygons[p.properties.routeLegID].geometry.coordinates = p.geometry.coordinates;
    }))
    clPoly.forEach((p =>{
        clPolygons[p.properties.routeLegID].geometry.coordinates = p.geometry.coordinates;
    }))


    xtdlStarboard.forEach(l =>{
        starboardXTDL[l.properties.routeLegID].geometry.coordinates = l.geometry.coordinates;
    })
    xtdlPort.forEach(l =>{
        portXTDL[l.properties.routeLegID].geometry.coordinates = l.geometry.coordinates;
    })
    clStarboard.forEach(l =>{
        starboardCL[l.properties.routeLegID].geometry.coordinates = l.geometry.coordinates;
    })
    clPort.forEach(l =>{
        portCL[l.properties.routeLegID].geometry.coordinates = l.geometry.coordinates;
    })


    legs[prevLeg.getId()].geometry.coordinates = prevLeg.getCoordinates();
    legs[leg.getId()].geometry.coordinates = leg.getCoordinates();
    legs[nextLeg.getId()].geometry.coordinates = nextLeg.getCoordinates();
    legs[nextNextLeg.getId()].geometry.coordinates = nextNextLeg.getCoordinates();


    return geojson;

}


function endsOfSegment(first, second, front=true){
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