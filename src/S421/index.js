import { RouteToGeoJSON } from "../route.js";
import { parseXML } from "../utility.js";
import { 
    generateS421RouteWaypoint,
    generateS421RouteWaypointLeg,
    generateS421ActionPoint
 } from "./parser.js";


export function S421ToGeoJSON(xml) {
    try {
        const route = parseXML(xml),
        waypointLegs = {},
        waypoints = [],
        actionPoints = [];

        for(let obj of route.Dataset.member){
             // RouteWayPointLegs
            if('RouteWaypointLeg' in obj){
                let leg = generateS421RouteWaypointLeg(obj.RouteWaypointLeg);
                waypointLegs[leg.getId()] = leg;
            } else if ('routeWaypointLeg' in obj){
                let leg = generateS421RouteWaypointLeg(obj.routeWaypointLeg);
                waypointLegs[leg.getId()] = leg;
            }
            // RouteWaypoints
            if ('RouteWaypoint' in obj) {
                try{
                    waypoints.push(generateS421RouteWaypoint(obj.RouteWaypoint));
                }catch(e){
                    console.log(`INFO: Skipping waypoint due to: ${e}`);
                }
            }
            // RouteActionPoints
            if ('RouteActionPoint' in obj) {
                const AP = generateS421ActionPoint(obj.RouteActionPoint);
                if (AP != null) {
                    actionPoints.push(AP);
                }
            }
        }

        return RouteToGeoJSON(waypointLegs, waypoints, actionPoints);

    } catch (err) {
        console.error(err);
        return null;
    }
}