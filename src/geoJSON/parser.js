import { createActionPoint, RouteWaypoint,RouteWaypointLeg } from '../models/index.js';



export function parseGeoJsonToJS(geojson){
    if (typeof geojson === 'string') {
        geojson = JSON.parse(geojson);
    }

    if (!geojson || !geojson.features) {
        throw new Error('Invalid GeoJSON data');
    }

    let waypoints = [],
    legs = {},
    actionpoints = [];
    const features = geojson.features;

    for(let feature of features) {
        if (feature.properties.type === 'route-leg'){
            legs[feature.properties.id] = convertGeoJsonLegToRouteWaypointLeg(feature);
        }else if (feature.properties.type === 'waypoint'){
            const waypoint = convertGeoJsonWaypointToRouteWaypoint(feature);
            waypoints.push(waypoint);
        }else if (feature.properties.type.includes('actionpoint')){
            actionpoints.push(convertGeoJsonActionPointToRouteActionPoint(feature));
        }
    }
    return [legs, waypoints, actionpoints];
}





function convertGeoJsonWaypointToRouteWaypoint(geojson) {
    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON waypoint');
    }

    const id = geojson?.properties?.id;
    const coordinates = geojson?.geometry?.coordinates || [];
    const reference = geojson?.properties?.reference || '';
    const routeWaypointName = geojson?.properties?.name || '';
    const routeWaypointFixed = geojson?.properties?.fixed || false;
    const routeWaypointTurnRadius = parseFloat(geojson?.properties?.radius) || 0.0;
    const routeWaypointLeg = geojson?.properties?.routeWaypointLeg || '';
    const routeWaypointExternalReferenceID = geojson?.properties?.externalReferenceID || '';
    const routeWaypointExtensions = geojson?.properties?.extensions || {};

    return new RouteWaypoint(
        id,
        reference,
        routeWaypointName,
        coordinates,
        routeWaypointFixed,
        routeWaypointTurnRadius,
        routeWaypointLeg,
        routeWaypointExternalReferenceID,
        routeWaypointExtensions
    );

}

function convertGeoJsonLegToRouteWaypointLeg(geojson){
    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON waypoint');
    }
    const props = geojson?.properties;

    const id = props?.id;
    const routeWaypointLegStarboardXTDL = props?.routeWaypointLegStarboardXTDL || 0;
    const routeWaypointLegPortXTDL = props?.routeWaypointLegPortXTDL || 0;
    const routeWaypointLegStarboardCL = props?.routeWaypointLegStarboardCL || 0;
    const routeWaypointLegPortCL = props?.routeWaypointLegPortCL || 0;
    const routeWaypointLegSafetyContour = props?.routeWaypointLegSafetyContour || 0.0;
    const routeWaypointLegSafetyDepth = props?.routeWaypointLegSafetyDepth || 0.0;
    const routeWaypointLegGeometryType = props?.routeWaypointLegGeometryType || 1;
    const routeWaypointLegSOGMin =props?.routeWaypointLegSOGMin || 0.0;
    const routeWaypointLegSOGMax = props?.routeWaypointLegSOGMax || 0.0;
    const routeWaypointLegSTWMin = props?.routeWaypointLegSTWMin || 0.0;
    const routeWaypointLegSTWMax = props?.routeWaypointLegSTWMax || 0.0;
    const routeWaypointLegDraft = props?.routeWaypointLegDraft || 0.0;
    const routeWaypointLegDraftForward = props?.routeWaypointLegDraftForward|| 0.0;
    const routeWaypointLegDraftAft = props?.routeWaypointLegDraftAft || 0.0;
    const routeWaypointLegDraftMax = props?.routeWaypointLegDraftMax || 0.0;
    const routeWaypointLegAirDraftMax = props?.routeWaypointLegAirDraftMax || 0.0;
    const routeWaypointLegBeamMax = props?.routeWaypointLegBeamMax || 0.0;
    const routeWaypointLegLengthMax = props?.routeWaypointLegLengthMax || 0.0;
    const routeWaypointLegStaticUKC =props?.routeWaypointLegStaticUKC || 0.0;
    const routeWaypointLegDynamicUKC =props?.routeWaypointLegDynamicUKC || 0.0;
    const routeWaypointLegSafetyMargin = props?.routeWaypointLegSafetyMargin || 0.0;
    const routeWaypointLegNote = props?.routeWaypointLegNote || '';
    const routeWaypointLegIssue = props?.routeWaypointLegIssue || '';
    const routeWaypointLegExtensions = props?.routeWaypointLegExtensions || {};
    
    return new RouteWaypointLeg(
        id, routeWaypointLegStarboardXTDL, routeWaypointLegPortXTDL,
        routeWaypointLegStarboardCL, routeWaypointLegPortCL, routeWaypointLegSafetyContour,
        routeWaypointLegSafetyDepth, routeWaypointLegGeometryType, routeWaypointLegSOGMin,
        routeWaypointLegSOGMax, routeWaypointLegSTWMin, routeWaypointLegSTWMax, routeWaypointLegDraft,
        routeWaypointLegDraftForward, routeWaypointLegDraftAft, routeWaypointLegDraftMax, routeWaypointLegAirDraftMax,
        routeWaypointLegBeamMax, routeWaypointLegLengthMax, routeWaypointLegStaticUKC, routeWaypointLegDynamicUKC,
        routeWaypointLegSafetyMargin, routeWaypointLegNote, routeWaypointLegIssue, routeWaypointLegExtensions
    );
    
}


function convertGeoJsonActionPointToRouteActionPoint(geojson) {
    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON action point');
    }
    const props = geojson?.properties;

    const id = props?.id;
    const routeActionPointID = props?.routeActionPointID || '';
    const routeActionPointName = props?.routeActionPointName || '';
    const routeActionPointRadius = parseFloat(props?.routeActionPointRadius) || 0.0;
    const routeActionPointTimeToAct = parseFloat(props?.routeActionPointTimeToAct) || 0.0;
    const routeActionPointRequiredAction = props?.routeActionPointRequiredAction || '';
    const routeActionPointRequiredActionDescription = props?.routeActionPointRequiredActionDescription || '';
    const routeActionPointExtensions = props?.routeActionPointExtensions || {};
    const coordinates = geojson?.geometry?.coordinates;
    const type = props?.type.split('-')[1];

    return createActionPoint(
        type, id, routeActionPointID, routeActionPointName, coordinates,
        routeActionPointRadius, routeActionPointTimeToAct,
        routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions
    );
}
