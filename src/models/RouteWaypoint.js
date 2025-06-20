import { point } from '@turf/turf';

export class RouteWaypoint{
    constructor(id, reference, routeWaypointName, coordinates,
        routeWaypointFixed, routeWaypointTurnRadius,
        routeWaypointLeg, routeWaypointExternalReferenceID,
        routeWaypointExtensions){

        this.id = id;
        if(this.id == null || this.id == undefined || isNaN(this.id)){
            throw new Error("Invalid id");
        }
        this.reference = reference || '';
        this.checkCoordinates(coordinates);
        this.coordinates = coordinates;
        this.routeWaypointName = routeWaypointName || '';
        this.routeWaypointFixed = routeWaypointFixed || false;
        this.routeWaypointTurnRadius = parseFloat(routeWaypointTurnRadius) || 0.0;
        this.routeWaypointLeg = routeWaypointLeg || '';
        this.routeWaypointExternalReferenceID = routeWaypointExternalReferenceID || '';
        this.routeWaypointExtensions = routeWaypointExtensions;
        this.type = "waypoint";

    }

    // Getter methods

    getType(){
        return this.type;
    }
    getId(){
        return this.id;
    }
    getRadius(){
        return this.routeWaypointTurnRadius;
    }
    getRouteWaypointLeg(){
        return this.routeWaypointLeg;
    }
    getCoordinates(){
        return this.coordinates;
    }


    // Setter methods
    setRouteWaypointLeg(routeWaypointLeg){
        this.routeWaypointLeg = routeWaypointLeg;
    }

    setCoordinates(coordinates){
        this.checkCoordinates(coordinates);
        this.coordinates = coordinates;
    }

    setRadius(radius){
        if(isNaN(radius) || radius === null || radius < 0){
            throw new Error("Invalid radius");
        }
        this.routeWaypointTurnRadius = radius;
    }

    setReference(reference){
        this.reference = reference;
    }
    setRouteWaypointName(routeWaypointName){
        this.routeWaypointName = routeWaypointName;
    }
    setRouteWaypointFixed(routeWaypointFixed){
        this.routeWaypointFixed = routeWaypointFixed;
    }
    setRouteWaypointExternalReferenceID(routeWaypointExternalReferenceID){
        this.routeWaypointExternalReferenceID = routeWaypointExternalReferenceID;
    }
    setRouteWaypointExtensions(routeWaypointExtensions){
        this.routeWaypointExtensions = routeWaypointExtensions;
    }


    

    // Ordinary methods
    checkCoordinates(coordinates){
        if(isNaN(coordinates[0])  ||isNaN(coordinates[1]) ||
        coordinates[0] === null || coordinates[1] === null){
            
            throw new Error("Invalid coordinates");
        }
    }

    toGeoJSON(){
        return point(
            this.coordinates,
            {
                type: this.type,
                id: this.id,
                radius: this.routeWaypointTurnRadius,
                routeWaypointLeg: this.routeWaypointLeg,
                name: this.routeWaypointName,
                reference: this.reference,
                externalReferenceID: this.routeWaypointExternalReferenceID,
                fixed: this.routeWaypointFixed,
                extensions: this.routeWaypointExtensions
            }
        )
    }
}