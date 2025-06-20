import { RouteToGeoJSON } from "../route.js";
import { parseGeoJsonToJS } from "./parser.js";



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