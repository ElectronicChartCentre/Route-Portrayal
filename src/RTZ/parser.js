import { RouteWaypoint, RouteWaypointLeg } from "../models/index.js"; 


class DefaultValues{
    constructor(radius,starboardXTD,portsideXTD,safetyContour,safetyDepth){
        this.radius = radius;
        this.starboardXTD = parseInt(starboardXTD * 1852);
        this.portsideXTD = parseInt(portsideXTD * 1852);
        this.safetyContour = safetyContour;
        this.safetyDepth = safetyDepth;
    }
}


function generateRTZRouteWaypoint(waypoint, defaultValues){
    return new RouteWaypoint(
        parseInt(waypoint._attributes.id),
        'RTE.WPT.'+ waypoint._attributes.id,
        waypoint._attributes.name || '',
        [parseFloat(waypoint.position._attributes.lon), parseFloat(waypoint.position._attributes.lat)],
        false,
        parseFloat(waypoint._attributes.radius) || defaultValues.radius,
        'RTE.WPT.LEG.' + waypoint._attributes.id,
        '',
        {}
    );
}


function generateRTZRouteWaypointLeg(waypoint, defaultValues){
    return new RouteWaypointLeg(
        'RTE.WPT.LEG.' + waypoint._attributes.id,
        parseInt(parseFloat(waypoint.leg?._attributes?.starboardXTD) * 1852) || defaultValues.starboardXTD,
        parseInt(parseFloat(waypoint.leg._attributes.portsideXTD) * 1852) || defaultValues.portsideXTD,
        0,0,
        parseInt(waypoint.leg?._attributes?.safetyContour) || defaultValues.safetyContour,
        parseInt(waypoint.leg?._attributes?.safetyDepth) || defaultValues.safetyDepth,
        parseInt(waypoint.leg?._attributes?.geometryType) || 1,
        0.0,0.0,0.0,0.0,0.0,
        parseFloat(waypoint.leg?._attributes?.draughtForward) || 0.0,
        parseFloat(waypoint.leg?._attributes?.draughtAft) || 0.0,
        0.0,0.0,0.0,0.0,
        parseFloat(waypoint.leg?._attributes?.staticUKC) || 0.0,
        parseFloat(waypoint.leg?._attributes?.dynamicUKC) || 0.0,
        0.0,
        (waypoint.leg?._attributes?.legNote1 || '')+(waypoint.leg?._attributes?.legNote2 || ''),
        waypoint.leg?._attributes?.legInfo || '',
        {}
    );
}

export function parseRTZtoJS(route){

    const waypoints = [],
    legs = {},
    actionpoints = [];

    // Waypoints
    let defaultWaypoint = route.waypoints.defaultWaypoint;
    // Default values
    const defaultValues = new DefaultValues(
        parseFloat(defaultWaypoint._attributes.radius) || 0.0,
        parseFloat(defaultWaypoint.leg._attributes.starboardXTD) || 0.0,
        parseFloat(defaultWaypoint.leg._attributes.portsideXTD) || 0.0,
        parseInt(defaultWaypoint.leg._attributes.safetyContour) || 0,
        parseInt(defaultWaypoint.leg._attributes.safetyDepth) || 0
    );

    for(let waypoint of route.waypoints.waypoint){
        try{
            let WP = generateRTZRouteWaypoint(waypoint, defaultValues);
            if(WP !== null) waypoints.push(WP);

            let leg = generateRTZRouteWaypointLeg(waypoint,defaultValues);
            if(leg !== null) legs[leg.getId()] = leg;
            

        }catch(err){
            console.log("Skipping waypoint due to: ",err);
        }
    }

    return [legs, waypoints, actionpoints];

}