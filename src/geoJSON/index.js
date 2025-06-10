import { curveWaypointLeg } from "../route.js";
import { convertGeoJsonWaypointToRouteWaypoint } from "./parser.js";
import { distance,point } from "@turf/turf";

export function editCurveSegment(gWP1,gWP2,gWP3,gLeg12,gLeg23,newRadius){
    let wp1 = convertGeoJsonWaypointToRouteWaypoint(gWP1);
    let wp2 = convertGeoJsonWaypointToRouteWaypoint(gWP2);
    let wp3 = convertGeoJsonWaypointToRouteWaypoint(gWP3);

    if(typeof gLeg12 === 'string') gLeg12 = JSON.parse(gLeg12);
    if(typeof gLeg23 === 'string') gLeg23 = JSON.parse(gLeg23);
    let l12 = JSON.parse(JSON.stringify(gLeg12));
    let l23 = JSON.parse(JSON.stringify(gLeg23));

    // Ensure the legs are in the correct order
    if(wp2.getRouteWaypointLeg() === l23.properties.id){
        [l12,l23] = [l23,l12];
    }
    // Ensure the waypoints are in the correct order
    const distance1 = distance(point(l12.geometry.coordinates[0]),point(wp1.getCoordinates()));
    const distance2 = distance(point(l12.geometry.coordinates[0]),point(wp3.getCoordinates()));
    if(distance2 < distance1){
        [wp1,wp3] = [wp3,wp1];
        [gWP1,gWP3] = [gWP3,gWP1];
    }

    wp2.setRadius(newRadius);

    const [circleArc,_,tangent2] = curveWaypointLeg(wp1, wp2, wp3);



    l12.geometry.coordinates = [l12.geometry.coordinates[0], ...circleArc.geometry.coordinates];
    l23.geometry.coordinates[0] = tangent2.geometry.coordinates;
    l12.properties.type = 'route-leg1';
    l23.properties.type = 'route-leg1';

    return [gWP1,wp2.toGeoJSON(),gWP3,l12,l23];

}