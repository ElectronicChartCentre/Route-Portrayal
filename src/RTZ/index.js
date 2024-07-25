import { parseXML } from "../utility.js";  
import { RouteToGeoJSON } from '../route.js';
import { parseRTZtoJS } from './parser.js';



export function RTZtoGeoJSON(xml){
    const route = parseXML(xml).route;
    const [legs, waypoints, actionpoints] = parseRTZtoJS(route)
  
    return RouteToGeoJSON(legs,waypoints,actionpoints);
}


