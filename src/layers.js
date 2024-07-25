import * as constants from './constants.js';


export function createLayers(sourceName, layerIdPrefix = ""){
    return [
        {   // ROUTE LEG - LINE
            'id': layerIdPrefix + 'route-leg-line',
            'type': 'line',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg'],
            'layout': constants.LINE_LAYOUT_DEFAULT,
            'paint': {
                'line-color': constants.LINE_COLOR_DEFAULT,
                'line-width': constants.LINE_WIDTH_DEFAULT,
                'line-dasharray':constants.ROUTE_LEG_DASHARRAY
            }
        },
        {   // ROUTE LEG - LINE TEXT
            'id': layerIdPrefix + 'route-leg-line-text',
            'type': 'symbol',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg'],
            'layout': {
              'symbol-placement': 'line',
              'text-field': '{routeWaypointLegIssue}',
              'text-size': constants.TEXT_SIZE,
              'text-offset': constants.TEXT_OFFSET,
              'text-anchor': constants.TEXT_ANCHOR
            },
            'paint': constants.TEXT_PAINT_DEFAULT
        },
        {   // ROUTE WAYPOINT
            'id': layerIdPrefix + 'waypoint-circle',
            'type': 'circle',
            'source': sourceName,
            'filter': ['==', 'type', 'waypoint'],
            'paint':{
                'circle-radius': 2,
                'circle-color': 'transparent',
                'circle-stroke-width': 2,
                'circle-stroke-color': constants.LINE_COLOR_DEFAULT
            }
        },
        {   // ACTIONPOINT - POINT
            'id': layerIdPrefix + 'actionpoint-point',
            'type': 'circle',
            'source': sourceName,
            'filter': ['==', 'type', 'actionpoint-point'],
            'paint':{
                'circle-radius': 3,
                'circle-color': constants.LINE_COLOR_DEFAULT,
            }
        },
        {   // ACTIONPOINT - POINT TEXT
            'id': layerIdPrefix + 'actionpoint-point-text',
            'type': 'symbol',
            'source': sourceName,
            'filter': ['==', 'type', 'actionpoint-point'],
            'layout': {
                'text-field': '{routeActionPointRequiredActionDescription}',
                'text-size': constants.TEXT_SIZE,
                'text-anchor': constants.TEXT_ANCHOR,
                'text-offset': constants.TEXT_OFFSET,
            },
            'paint': constants.TEXT_PAINT_DEFAULT
        },
        {   // ACTIONPOINT - LINE
            'id': layerIdPrefix + 'actionpoint-line',
            'type': 'line',
            'source': sourceName,
            'filter': ['==', 'type', 'actionpoint-curve'],
            'layout': constants.LINE_LAYOUT_DEFAULT,
            'paint': {
                'line-color': constants.LINE_COLOR_DEFAULT,
                'line-width': constants.LINE_WIDTH_DEFAULT,
                'line-dasharray':constants.ACTIONPOINT_DASHARRAY
            }
        },
        {   // ACTIONPOINT - LINE TEXT
            'id': layerIdPrefix + 'actionpoint-line-text',
            'type': 'symbol',
            'source': sourceName,
            'filter': ['in', ['get','type'],['literal',['actionpoint-curve','actionpoint-surface']]],
            'layout': {
              'symbol-placement': 'line',
              'text-field': '{routeActionPointRequiredActionDescription}',
              'text-size': constants.TEXT_SIZE,
              'text-offset': constants.TEXT_OFFSET,
              'text-anchor': constants.TEXT_ANCHOR
            },
            'paint': { 
                'text-color': constants.TEXT_COLOR_DEFAULT,
                'text-opacity': 0.5
            }
        },
        {   // ACTIONPOINT - SURFACE LINE
            'id': layerIdPrefix + 'actionpoint-surface-line',
            'type': 'line',
            'source': sourceName,
            'filter': ['==', 'type', 'actionpoint-surface'],
            'layout': constants.LINE_LAYOUT_DEFAULT,
            'paint': {
                'line-color': constants.LINE_COLOR_DEFAULT,
                'line-width': constants.LINE_WIDTH_DEFAULT
            }
        },
        {   // XTDL - LINE
            'id': layerIdPrefix + 'route-leg-xtdl',
            'type': 'line',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg-XTDL'],
            'layout': constants.LINE_LAYOUT_DEFAULT,
            'paint': {
                'line-color': ['case',['==',['get','side'],'starboard'], constants.NAVIGATION_GREEN, constants.NAVIGATION_RED],
                'line-width': constants.LINE_WIDTH_DEFAULT
            }
        },
        {   // CL - LINE
            'id': layerIdPrefix + 'route-leg-cl',
            'type': 'line',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg-CL'],
            'layout': constants.LINE_LAYOUT_DEFAULT,
            'paint': {
                'line-color': constants.CL_COLOR,
                'line-width': constants.CL_LINE_WIDTH,
                'line-dasharray':constants.CL_DASHARRAY
            }
        }
    ];
}


export function createCorridorLayers(sourceName, layerIdPrefix = ""){
    return [
        {   // ROUTE LEG CORRIDOR - CL (Only for showcasing the polygons. Could be removed)
            'id': layerIdPrefix + 'route-leg-corridor-cl',
            'type': 'fill',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg-corridor-cl'],
            'paint': {
                'fill-color': constants.CL_CORRIDOR_COLOR
            }
        },
        {   // ROUTE LEG CORRIDOR - XTDL (Only for showcasing the polygons. Could be removed)
            'id': layerIdPrefix + 'route-leg-corridor-xtdl',
            'type': 'fill',
            'source': sourceName,
            'filter': ['==', 'type', 'route-leg-corridor-xtdl'],
            'paint': {
                'fill-color': constants.XTDL_CORRIDOR_COLOR
            }
        }
    ];
}
