import {point, lineString, polygon}  from '@turf/turf';
class RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        this.id = id;
        this.routeActionPointID = routeActionPointID;
        this.routeActionPointName = routeActionPointName || '';
        this.routeActionPointRadius = routeActionPointRadius || 0.0;
        this.routeActionPointTimeToAct = routeActionPointTimeToAct || 0.0;
        this.routeActionPointRequiredAction = routeActionPointRequiredAction || 0;
        this.routeActionPointRequiredActionDescription = routeActionPointRequiredActionDescription || '';
        this.routeActionPointExtensions = routeActionPointExtensions;
        this.coordinates = [];
        this.type = 'actionpoint';
    }

    getId(){
        return this.id;
    }
    getCoordinates(){
        return this.coordinates;
    }
    setCoordinates(coordinates){
        this.coordinates = coordinates;
    }

    getProperties(){

        return{
            id: this.id,
            type: this.type,
            routeActionPointID: this.routeActionPointID,
            routeActionPointName: this.routeActionPointName,
            routeActionPointRadius: this.routeActionPointRadius,
            routeActionPointTimeToAct: this.routeActionPointTimeToAct,
            routeActionPointRequiredAction: this.routeActionPointRequiredAction,
            routeActionPointRequiredActionDescription: this.routeActionPointRequiredActionDescription,
            routeActionPointExtensions: this.routeActionPointExtensions
        }
    }

}



export class PointActionPoint extends RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-point';
        this.coordinates = coordinates || [];
    }

    toGeoJSON(){
        return point(this.coordinates, this.getProperties())
    }
}




export class CurveActionPoint extends RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-curve';
        if(coordinates.length < 2) throw new Error("Line must have at least 2 points");
        this.coordinates = coordinates || [[],[]];
    }

    toGeoJSON(){
        return lineString(this.coordinates, this.getProperties())
    }

}



export class SurfaceActionPoint extends RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-surface';
        if(coordinates.length < 3) throw new Error("Polygon must have at least 3 points");
        if(coordinates[0][0] !== coordinates[coordinates.length-1][0] || 
           coordinates[0][1] !== coordinates[coordinates.length-1][1]){
            coordinates.push(coordinates[0]);
           } 
        this.coordinates = coordinates || [[],[]];
    }

    toGeoJSON(){
        return polygon([this.coordinates], this.getProperties())
    }

}


export function createActionPoint(type, id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
    routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
    routeActionPointExtensions ){
    switch(type){
        case "point":
            return new PointActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
        case "curve":
            return new CurveActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
        case "surface":
            return new SurfaceActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
    }
}
