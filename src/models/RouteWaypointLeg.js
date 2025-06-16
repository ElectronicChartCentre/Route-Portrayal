import {
    point, bearing, transformScale, transformTranslate,
    lineString, polygon, lineIntersect, distance,
    along, destination
} from '@turf/turf';

export class RouteWaypointLeg{
    constructor(
        id, routeWaypointLegStarboardXTDL, routeWaypointLegPortXTDL,
        routeWaypointLegStarboardCL, routeWaypointLegPortCL, routeWaypointLegSafetyContour,
        routeWaypointLegSafetyDepth, routeWaypointLegGeometryType, routeWaypointLegSOGMin,
        routeWaypointLegSOGMax, routeWaypointLegSTWMin, routeWaypointLegSTWMax, routeWaypointLegDraft,
        routeWaypointLegDraftForward, routeWaypointLegDraftAft, routeWaypointLegDraftMax, routeWaypointLegAirDraftMax,
        routeWaypointLegBeamMax, routeWaypointLegLengthMax, routeWaypointLegStaticUKC, routeWaypointLegDynamicUKC,
        routeWaypointLegSafetyMargin, routeWaypointLegNote, routeWaypointLegIssue, routeWaypointLegExtensions
    ){
        this.id = id;
        if(this.id === null || this.id === undefined || this.id === ''){
            throw new Error('Invalid id');
        }
        this.legCoordinates = [[],[]];
        this.routeWaypointLegStarboardXTDL = routeWaypointLegStarboardXTDL || 0;
        this.routeWaypointLegPortXTDL = routeWaypointLegPortXTDL || 0;
        this.routeWaypointLegStarboardCL = routeWaypointLegStarboardCL || 0;
        this.routeWaypointLegPortCL = routeWaypointLegPortCL || 0;
        this.routeWaypointLegSafetyContour = routeWaypointLegSafetyContour || 0.0;
        this.routeWaypointLegSafetyDepth = routeWaypointLegSafetyDepth || 0.0;
        this.routeWaypointLegGeometryType = routeWaypointLegGeometryType || 1;
        this.routeWaypointLegSOGMin = routeWaypointLegSOGMin || 0.0;
        this.routeWaypointLegSOGMax = routeWaypointLegSOGMax || 0.0;
        this.routeWaypointLegSTWMin = routeWaypointLegSTWMin || 0.0;
        this.routeWaypointLegSTWMax = routeWaypointLegSTWMax || 0.0;
        this.routeWaypointLegDraft = routeWaypointLegDraft || 0.0;
        this.routeWaypointLegDraftForward = routeWaypointLegDraftForward || 0.0;
        this.routeWaypointLegDraftAft = routeWaypointLegDraftAft || 0.0;
        this.routeWaypointLegDraftMax = routeWaypointLegDraftMax || 0.0;
        this.routeWaypointLegAirDraftMax = routeWaypointLegAirDraftMax || 0.0;
        this.routeWaypointLegBeamMax = routeWaypointLegBeamMax || 0.0;
        this.routeWaypointLegLengthMax = routeWaypointLegLengthMax || 0.0;
        this.routeWaypointLegStaticUKC = routeWaypointLegStaticUKC || 0.0;
        this.routeWaypointLegDynamicUKC =  routeWaypointLegDynamicUKC || 0.0;
        this.routeWaypointLegSafetyMargin = routeWaypointLegSafetyMargin || 0.0;
        this.routeWaypointLegNote = routeWaypointLegNote || '';
        this.routeWaypointLegIssue = routeWaypointLegIssue || '';
        this.type = 'route-leg';
        this.routeWaypointLegExtensions = routeWaypointLegExtensions;
    }


    getId(){
        return this.id;
    }

    getCoordinates(){
        return this.legCoordinates;
    }

    getStarboardXTDL(){
        return this.routeWaypointLegStarboardXTDL;
    }

    getPortXTDL(){
        return this.routeWaypointLegPortXTDL;
    }

    getStarboardCL(){
        return this.routeWaypointLegStarboardCL;
    }

    getPortCL(){
        return this.routeWaypointLegPortCL;
    }


    setCoordinates(coordinates){
        this.legCoordinates = coordinates;
    }

    appendLegLineCoordinates(coordinates){
        if( this.legCoordinates[0].length === 0){
            throw new Error('No coordinates to append to');
        }
        if(this.legCoordinates.length > 1){
            if( this.legCoordinates[1].length === 0){
                throw new Error('No coordinates to append to');
            }
            let distance1 = distance(point(coordinates[1]),point(this.legCoordinates[0]));
            let distance2 = distance(point(coordinates[1]),point(this.legCoordinates[this.legCoordinates.length-1]));
    
            if(distance2 < distance1){
                this.legCoordinates.reverse();
            }

        }
        
        coordinates.splice(coordinates.length-1,1);
        this.legCoordinates.unshift(...coordinates);
    }

    toGeoJSON(){
        return lineString(this.legCoordinates, {
            id: this.id,
            type: this.type,
            routeWaypointLegStarboardXTDL: this.routeWaypointLegStarboardXTDL,
            routeWaypointLegPortXTDL: this.routeWaypointLegPortXTDL,
            routeWaypointLegStarboardCL: this.routeWaypointLegStarboardCL,
            routeWaypointLegPortCL: this.routeWaypointLegPortCL,
            routeWaypointLegSafetyContour: this.routeWaypointLegSafetyContour,
            routeWaypointLegSafetyDepth: this.routeWaypointLegSafetyDepth,
            routeWaypointLegGeometryType: this.routeWaypointLegGeometryType,
            routeWaypointLegSOGMin: this.routeWaypointLegSOGMin,
            routeWaypointLegSOGMax: this.routeWaypointLegSOGMax,
            routeWaypointLegSTWMin: this.routeWaypointLegSTWMin,
            routeWaypointLegSTWMax: this.routeWaypointLegSTWMax,
            routeWaypointLegDraft: this.routeWaypointLegDraft,
            routeWaypointLegDraftForward: this.routeWaypointLegDraftForward,
            routeWaypointLegDraftAft: this.routeWaypointLegDraftAft,
            routeWaypointLegDraftMax: this.routeWaypointLegDraftMax,
            routeWaypointLegAirDraftMax: this.routeWaypointLegAirDraftMax,
            routeWaypointLegBeamMax: this.routeWaypointLegBeamMax,
            routeWaypointLegLengthMax: this.routeWaypointLegLengthMax,
            routeWaypointLegStaticUKC: this.routeWaypointLegStaticUKC,
            routeWaypointLegDynamicUKC: this.routeWaypointLegDynamicUKC,
            routeWaypointLegSafetyMargin: this.routeWaypointLegSafetyMargin,
            routeWaypointLegNote: this.routeWaypointLegNote,
            routeWaypointLegIssue: this.routeWaypointLegIssue,
            routeWaypointLegExtensions: this.routeWaypointLegExtensions
        });
    }

    starboardXTDLtoGeoJSON(index){
        const offset = this.offsetLine(this.toGeoJSON(),this.getStarboardXTDL());
        offset.properties ={
            type: "route-leg-XTDL",
            routeLegID: this.id,
            side: "starboard",
            distance: Math.abs(this.getStarboardXTDL()),
            index: index
        }
        return offset;
    }

    portXTDLtoGeoJSON(index){
        const offset = this.offsetLine(this.toGeoJSON(),-this.getPortXTDL());
        offset.properties ={
            type: "route-leg-XTDL",
            routeLegID: this.id,
            side: "port",
            distance: Math.abs(this.getPortXTDL()),
            index: index
        }
        return offset;
    }

    starboardCLtoGeoJSON(index){
        const offset = this.offsetLine(this.toGeoJSON(),this.getStarboardCL());
        offset.properties ={
            type: "route-leg-CL",
            routeLegID: this.id,
            side: "starboard",
            distance: Math.abs(this.getStarboardCL()),
            index: index
        }
        return offset;
    }

    portCLtoGeoJSON(index){
        const offset = this.offsetLine(this.toGeoJSON(),-this.getPortCL());
        offset.properties ={
            type: "route-leg-CL",
            routeLegID: this.id,
            side: "port",
            distance: Math.abs(this.getPortCL()),
            index: index
        }
        return offset;
    }

    offsetLine(line, distance){
        const lineCoords = line.geometry.coordinates;
        const transformAngle = distance < 0 ? -90 : 90;
        if (distance < 0) distance = -distance;
    
        const offsetLines = [];
        for (let i = 0; i < lineCoords.length - 1; i++) { 
            const angle = bearing(lineCoords[i], lineCoords[i + 1]) + transformAngle;
            const firstPoint = transformTranslate(point(lineCoords[i]), distance, angle, { units:'meters' })?.geometry.coordinates;
            const secondPoint = transformTranslate(point(lineCoords[i + 1]), distance, angle, { units: 'meters' })?.geometry.coordinates;
            offsetLines.push([firstPoint, secondPoint]);
        }
        const offsetCoords = [offsetLines[0][0]]; 
        let currentBearing, lastBearing;
        const angleLimit = 60;
        
        for (let i = 0; i < offsetLines.length; i++) { 
            if (offsetLines[i + 1]){
                const firstLine = transformScale(lineString(offsetLines[i]), 25); 
                const secondLine = transformScale(lineString(offsetLines[i + 1]), 25);
                const intersect = lineIntersect(firstLine, secondLine);
                if (intersect.features.length > 0) {
                    currentBearing = bearing(point(offsetCoords[offsetCoords.length-1]), point(intersect.features[0].geometry.coordinates));
                    if(!lastBearing || Math.abs(lastBearing - currentBearing) < angleLimit){
                        lastBearing = currentBearing;
                        offsetCoords.push(intersect.features[0].geometry.coordinates);
                    }
                }else{
                    currentBearing = bearing(point(offsetCoords[offsetCoords.length-1]), point(offsetLines[i + 1][0]));
                    if(!lastBearing || Math.abs(lastBearing - currentBearing) < angleLimit){
                        lastBearing = currentBearing;
                        offsetCoords.push(offsetLines[i+1][0])
                    }
                }
            } else {
                currentBearing = bearing(point(offsetCoords[offsetCoords.length-1]), point(offsetLines[i][1]));
                if(!lastBearing || Math.abs(lastBearing - currentBearing) < angleLimit){
                    lastBearing = currentBearing;
                    offsetCoords.push(offsetLines[i][1])
                }
            }
        }
        return lineString(offsetCoords);
    };

    static updateLegCorridors(sb,port){
        const corridorPolygons = [];
        const metric = {units: 'meters'};
        for(let i = 0; i<sb.length; i++){
            const sbBackCoord = sb[i].geometry.coordinates[sb[i].geometry.coordinates.length-1];
            const portBackCoord = port[i].geometry.coordinates[port[i].geometry.coordinates.length-1];
            if(sb[i+1] && sb[i+1].properties.index === sb[i].properties.index + 1){
                const angle = bearing(point(sbBackCoord), point(portBackCoord));
                // If the next corridor has the same distance
                if(sb[i].properties.distance === sb[i+1].properties.distance){
                    sb[i+1].geometry.coordinates[0] = sbBackCoord;
                }
                if(port[i].properties.distance === port[i+1].properties.distance){
                    port[i+1].geometry.coordinates[0] = portBackCoord;
                }
                // If the next corridor has a smaller distance
                if (sb[i].properties.distance > sb[i+1].properties.distance ) {
                    const distanceDifference = sb[i].properties.distance - sb[i+1].properties.distance;
                    const p = destination(point(sbBackCoord), distanceDifference, angle, metric);
                    sb[i+1].geometry.coordinates[0] = p.geometry.coordinates;
                    sb[i].geometry.coordinates.push(sb[i+1].geometry.coordinates[0]);
                }
                if(port[i].properties.distance > port[i+1].properties.distance){
                    const distanceDifference = port[i].properties.distance - port[i+1].properties.distance;
                    const p = destination(point(portBackCoord), distanceDifference, angle + 180, metric);
                    port[i+1].geometry.coordinates[0] = p.geometry.coordinates;
                    port[i].geometry.coordinates.push(port[i+1].geometry.coordinates[0]);
                }
                // If the next corridor has a larger distance
                if(sb[i].properties.distance < sb[i+1].properties.distance){
                    const distanceDifference = sb[i+1].properties.distance - sb[i].properties.distance;
                    const p = destination(point(sbBackCoord), distanceDifference, angle + 180, metric);
                    sb[i+1].geometry.coordinates[0] = p.geometry.coordinates;
                    sb[i+1].geometry.coordinates.unshift(sbBackCoord);
                }
                if(port[i].properties.distance < port[i+1].properties.distance){
                    const distanceDifference = port[i+1].properties.distance - port[i].properties.distance;
                    const p = destination(point(portBackCoord), distanceDifference, angle, metric);
                    port[i+1].geometry.coordinates[0] = p.geometry.coordinates;
                    port[i+1].geometry.coordinates.unshift(portBackCoord);

                }
            }
            // The following two if statements can be removed if it is not prefereable to close the corrior lines
            // upon reaching a leg with no corridors
            if(sb[i+1] && sb[i+1].properties.index !== sb[i].properties.index+1){
                const p = destination(point(sbBackCoord), sb[i].properties.distance, angle, metric);
                sb[i].geometry.coordinates.push(p.geometry.coordinates);
                const p2 = destination(point(portBackCoord), port[i].properties.distance, angle + 180, metric);
                port[i].geometry.coordinates.push(p2.geometry.coordinates);
            }
            if(sb[i-1] && sb[i-1].properties.index !== sb[i].properties.index - 1){

                const sbFirstCoord = sb[i].geometry.coordinates[0];
                const portFirstCoord = port[i].geometry.coordinates[0];
                const angle = bearing(point(sbFirstCoord), point(portFirstCoord));

                const p = destination(point(sbFirstCoord), sb[i].properties.distance, angle, metric);
                sb[i].geometry.coordinates.unshift(p.geometry.coordinates);
                const p2 = destination(point(portFirstCoord), port[i].properties.distance, angle + 180, metric);
                port[i].geometry.coordinates.unshift(p2.geometry.coordinates);

            }
            corridorPolygons.push(RouteWaypointLeg.createCorridorPolygons(sb[i],port[i]))
        }
        return corridorPolygons;
    }

    static createCorridorPolygons(starboardLine, portLine){
        const starboard = [...starboardLine.geometry.coordinates];
        const port = [...portLine.geometry.coordinates];

        const coordinates = [];
        let reverseArray = [...port].reverse();
        coordinates.push(...starboard)
        coordinates.push(...reverseArray);
        coordinates.push(starboard[0]);

        let type = starboardLine.properties.type === "route-leg-XTDL" ? "route-leg-corridor-xtdl" : "route-leg-corridor-cl";
        return polygon([coordinates],{
            type: type,
            routeLegID: portLine.properties.routeLegID,
            starboardDistance: starboardLine.properties.distance,
            portDistance: portLine.properties.distance
        });
    }

}