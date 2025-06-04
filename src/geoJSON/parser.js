//import { RouteWaypoint } from "../models";

export function convertGeoJsonWaypointToWaypoint(geojson) {
    if(typeof geojson == 'string') {
        geojson = JSON.parse(geojson);
    }

    if (!geojson || !geojson.properties || !geojson.geometry) {
        throw new Error('Invalid GeoJSON waypoint');
    }
    console.log(geojson);

    const id = geojson?.properties?.id;

  
}

