import { RouteToGeoJSON } from "../route.js";
import { parseGeoJsonToJS } from "./parser.js";

/**
 * Canonical rebuild of a route GeoJSON.
 * Useful after structural edits like insert/delete waypoint.
 */
export function RebuildRouteGeoJSON(geojson) {
  const [legs, waypoints, actionpoints] = parseGeoJsonToJS(geojson);
  return RouteToGeoJSON(legs, waypoints, actionpoints);
}
