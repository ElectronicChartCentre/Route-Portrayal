import { 
    RouteWaypoint, RouteWaypointLeg, createActionPoint 
} from "../models/index.js";
import {  getCoordinates } from "../utility.js";

export function generateS421RouteWaypoint(object){
    if (Object.keys(object.geometry).length === 0) {
        throw new Error('geometry is required for waypoint');
    }

    const coordinates = getCoordinates(object?.geometry?.pointProperty?.Point?.pos?._text);
    if (coordinates[0] == NaN || coordinates[1] == NaN) {
        throw new Error(' invalid coordinates');
    }
    const reference = object?._attributes?.id || '';
    const id = parseInt(object?.routeWaypointID?._text);
    const routeWaypointName = object?.routeWaypointName?._text || '';
    const routeWaypointFixed = object?.routeWaypointFixed?._text === 'true' ? true : false;
    const routeWaypointTurnRadius = parseFloat(object?.routeWaypointTurnRadius?._text) || 0.0;
    const routeWaypointLeg = object?.routeWaypointLeg?._attributes?.href?.split('#')[1] || '';
    const routeWaypointExternalReferenceID = object?.routeWaypointExternalReferenceID?._text || '';
    let routeWaypointExtensions = {};

    if(object?.routeWaypointExtensions instanceof Object){
        routeWaypointExtensions = {
            manufacturerId: object?.routeWaypointExtensions?._attributes?.routeExtensionsManufacturerId || '',
            routeExtensionsName: object?.routeWaypointExtensions?._attributes?.routeExtensionsName || '',
            version: parseInt(object?.routeWaypointExtensions?._attributes?.routeExtensionsVersion) || 0,
            note: object?.routeWaypointExtensions?.routeExtensionsNote?._text || ''
        }
    }

    return new RouteWaypoint(
        id, reference, routeWaypointName, coordinates,
        routeWaypointFixed, routeWaypointTurnRadius,
        routeWaypointLeg, routeWaypointExternalReferenceID,
        routeWaypointExtensions);
}



export function generateS421RouteWaypointLeg(object){
    const id = object._attributes.id;
    const routeWaypointLegStarboardXTDL = parseInt(object?.routeWaypointLegStarboardXTDL?._text) || 0;
    const routeWaypointLegPortXTDL = parseInt(object?.routeWaypointLegPortXTDL?._text) || 0;
    const routeWaypointLegStarboardCL = parseInt(object?.routeWaypointLegStarboardCL?._text) || 0;
    const routeWaypointLegPortCL = parseInt(object?.routeWaypointLegPortCL?._text) || 0;
    const routeWaypointLegSafetyContour = parseFloat(object?.routeWaypointLegSafetyContour?._text) || 0.0;
    const routeWaypointLegSafetyDepth = parseFloat(object?.routeWaypointLegSafetyDepth?._text) || 0.0;
    const routeWaypointLegGeometryType = parseInt(object?.routeWaypointLegGeometryType?._text) || 1;
    const routeWaypointLegSOGMin = parseFloat(object?.routeWaypointLegSOGMin?._text) || 0.0;
    const routeWaypointLegSOGMax = parseFloat(object?.routeWaypointLegSOGMax?._text) || 0.0;
    const routeWaypointLegSTWMin = parseFloat(object?.routeWaypointLegSTWMin?._text) || 0.0;
    const routeWaypointLegSTWMax = parseFloat(object?.routeWaypointLegSTWMax?._text) || 0.0;
    const routeWaypointLegDraft = parseFloat(object?.routeWaypointLegDraft?._text) || 0.0;
    const routeWaypointLegDraftForward = parseFloat(object?.routeWaypointLegDraftForward?._text) || 0.0;
    const routeWaypointLegDraftAft = parseFloat(object?.routeWaypointLegDraftAft?._text) || 0.0;
    const routeWaypointLegDraftMax = parseFloat(object?.routeWaypointLegDraftMax?._text) || 0.0;
    const routeWaypointLegAirDraftMax = parseFloat(object?.routeWaypointLegAirDraftMax?._text) || 0.0;
    const routeWaypointLegBeamMax = parseFloat(object?.routeWaypointLegBeamMax?._text) || 0.0;
    const routeWaypointLegLengthMax = parseFloat(object?.routeWaypointLegLengthMax?._text) || 0.0;
    const routeWaypointLegStaticUKC = parseFloat(object?.routeWaypointLegStaticUKC?._text) || 0.0;
    const routeWaypointLegDynamicUKC = parseFloat(object?.routeWaypointLegDynamicUKC?._text) || 0.0;
    const routeWaypointLegSafetyMargin = parseFloat(object?.routeWaypointLegSafetyMargin?._text) || 0.0;
    const routeWaypointLegNote = object?.routeWaypointLegNote?._text || '';
    const routeWaypointLegIssue = object?.routeWaypointLegIssue?._text || '';
    let routeWaypointLegExtensions = {};
    if(object?.routeWaypointLegExtensions instanceof Object){
        routeWaypointLegExtensions = {
            manufacturerId: object?.routeWaypointLegExtensions?._attributes?.routeExtensionsManufacturerId || '',
            routeExtensionsName: object?.routeWaypointLegExtensions?._attributes?.routeExtensionsName || '',
            version: parseInt(object?.routeWaypointLegExtensions?._attributes?.routeExtensionsVersion) || 0,
            note: object?.routeWaypointLegExtensions?.routeExtensionsNote?._text || ''
        }
    }

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


export function generateS421ActionPoint(object){
    const id = object._attributes.id;
    const routeActionPointID = parseInt(object?.routeActionPointID?._text);
    const routeActionPointName = object?.routeActionPointName?._text || '';
    const routeActionPointRadius = parseFloat(object?.routeActionPointRadius?._text) || 0.0;
    const routeActionPointTimeToAct = parseFloat(object?.routeActionPointTimeToAct?._text) || 0.0;
    const routeActionPointRequiredAction = parseInt(object?.routeActionPointRequiredAction?._text) || 0;
    const routeActionPointRequiredActionDescription = object?.routeActionPointRequiredActionDescription?._text || '';
    let routeActionPointExtensions = {};

    if(object?.routeActionPointExtensions instanceof Object){
        routeActionPointExtensions = {
            manufacturerId: object?.routeActionPointExtensions?._attributes?.routeExtensionsManufacturerId || '',
            routeExtensionsName: object?.routeActionPointExtensions?._attributes?.routeExtensionsName || '',
            version: parseInt(object?.routeActionPointExtensions?._attributes?.routeExtensionsVersion) || 0,
            note: object?.routeActionPointExtensions?.routeExtensionsNote?._text || ''
        }
    }
    let coordinates = [];
    let type;
    switch(Object.getOwnPropertyNames(object.geometry)[0]){
        case 'pointProperty':
            coordinates = getCoordinates(object.geometry.pointProperty.Point.pos._text);
            if (coordinates[0] == NaN || coordinates[1] == NaN) {
                return null;
            }
            type = "point";
            break;
        case 'curveProperty':
            for(let position of object.geometry.curveProperty.Curve.segments.LineStringSegment.pos){
                coordinates.push(getCoordinates(position._text));
            }
            if (coordinates.length < 2){
                return null;
            }
            type = "curve";
            break;
        case 'surfaceProperty':
            const coords = object.geometry.surfaceProperty.Surface.patches.PolygonPatch.exterior.LinearRing.posList._text.split(' ');
            for(let i = 0; i < coords.length-1; i+=2){
                try{
                    coordinates.push([parseFloat(coords[i+1]),parseFloat(coords[i])]);
                }catch(e){
                    console.log(`Error: ${e}`);
                    return null;
                }
            }
            type = "surface";
            break;
        default:
            console.log('Unknown action point type');
            return null;
    }
    return createActionPoint(
        type, id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions
    ).toGeoJSON();
}