import { parseXML } from "../utility.js";  
import { RouteToGeoJSON } from '../route.js';
import { parseRTZtoJS } from './parser.js';
import { parseGeoJsonToJS } from '../geoJSON/parser.js';
import { js2xml } from 'xml-js';



export function RTZtoGeoJSON(xml){
    const route = parseXML(xml).route;
    const [legs, waypoints, actionpoints] = parseRTZtoJS(route)
  
    return RouteToGeoJSON(legs,waypoints,actionpoints);
}

function formatCoordinate(value) {
    return Number(value).toFixed(8);
}

function metersToNauticalMiles(value) {
    return (Number(value) || 0) / 1852;
}

function geometryTypeToRTZValue(value) {
    return Number(value) === 2 ? 'Orthodrome' : 'Loxodrome';
}

function buildLegAttributes(legProperties) {
    const attrs = {
        starboardXTD: metersToNauticalMiles(legProperties.routeWaypointLegStarboardXTDL).toFixed(8),
        portsideXTD: metersToNauticalMiles(legProperties.routeWaypointLegPortXTDL).toFixed(8),
        geometryType: geometryTypeToRTZValue(legProperties.routeWaypointLegGeometryType)
    };

    const optional = {
        safetyContour: legProperties.routeWaypointLegSafetyContour,
        safetyDepth: legProperties.routeWaypointLegSafetyDepth,
        draughtForward: legProperties.routeWaypointLegDraftForward,
        draughtAft: legProperties.routeWaypointLegDraftAft,
        staticUKC: legProperties.routeWaypointLegStaticUKC,
        dynamicUKC: legProperties.routeWaypointLegDynamicUKC,
        legInfo: legProperties.routeWaypointLegIssue,
        legNote1: legProperties.routeWaypointLegNote
    };

    Object.entries(optional).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && Number(value) !== 0) {
            attrs[key] = String(value);
        }
    });

    return attrs;
}

function parseInputJSON(input) {
    if (typeof input === 'string') {
        try {
            return JSON.parse(input);
        } catch (error) {
            throw new Error('Invalid JSON input');
        }
    }
    return input;
}

function getGeoJSONFromInput(input) {
    const parsed = parseInputJSON(input);

    if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid input: expected GeoJSON or route JSON object');
    }

    // Accept plain GeoJSON FeatureCollection
    if (parsed.type === 'FeatureCollection' && Array.isArray(parsed.features)) {
        return { geojson: parsed, routeName: undefined };
    }

    // Accept app route JSON payloads that embed GeoJSON
    if (parsed.geojson?.type === 'FeatureCollection' && Array.isArray(parsed.geojson.features)) {
        return {
            geojson: parsed.geojson,
            routeName: typeof parsed.routeName === 'string' ? parsed.routeName : undefined
        };
    }

    throw new Error('Invalid input: no GeoJSON FeatureCollection found');
}

export function GeoJSONtoRTZ(input, routeName = 'Converted route') {
    const { geojson, routeName: routeNameFromInput } = getGeoJSONFromInput(input);
    const [legs, waypoints] = parseGeoJsonToJS(geojson);

    if (!waypoints || waypoints.length === 0) {
        throw new Error('No waypoints found in GeoJSON route');
    }

    const finalRouteName = routeNameFromInput || routeName;

    const orderedWaypoints = [...waypoints].sort((a, b) => Number(a.getId()) - Number(b.getId()));
    const waypointElements = orderedWaypoints.map((waypoint, index) => {
        const waypointGeoJSON = waypoint.toGeoJSON();
        const leg = legs[waypoint.getRouteWaypointLeg()];
        const legProperties = leg ? leg.toGeoJSON().properties : {};
        const id = waypointGeoJSON.properties.id ?? (index + 1);

        return {
            _attributes: {
                id: String(id),
                revision: '0',
                name: waypointGeoJSON.properties.name || `WP-${id}`,
                radius: String(waypointGeoJSON.properties.radius ?? 0)
            },
            position: {
                _attributes: {
                    lat: formatCoordinate(waypointGeoJSON.geometry.coordinates[1]),
                    lon: formatCoordinate(waypointGeoJSON.geometry.coordinates[0])
                }
            },
            leg: {
                _attributes: buildLegAttributes(legProperties)
            }
        };
    });

    const rtzObject = {
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'UTF-8'
            }
        },
        route: {
            _attributes: {
                xmlns: 'http://www.cirm.org/RTZ/1/2',
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                version: '1.2'
            },
            routeInfo: {
                _attributes: {
                    routeName: finalRouteName
                }
            },
            waypoints: {
                waypoint: waypointElements
            },
            schedules: {},
            extensions: {}
        }
    };

    return js2xml(rtzObject, { compact: true, spaces: 4 });
}

export function JSONtoRTZ(routeJSON, routeName = 'Converted route') {
    return GeoJSONtoRTZ(routeJSON, routeName);
}


