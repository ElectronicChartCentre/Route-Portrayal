import { RouteWaypoint } from '../models/index.js';

export function convertGeoJsonWaypointToRouteWaypoint(geojson) {
    if(typeof geojson == 'string') {
        geojson = JSON.parse(geojson);
    }

    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON waypoint');
    }
    //console.log(geojson);

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

export function convertGeoJsonLegToRouteWaypointLeg(geojson){
    if(typeof geojson == 'string') {
        geojson = JSON.parse(geojson);
    }

    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON waypoint');
    }
    console.log(geojson);
    
}

