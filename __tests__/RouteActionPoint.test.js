import {
    PointActionPoint,
    CurveActionPoint,
    SurfaceActionPoint,
    createActionPoint 
} from "../src/models";


describe('PointActionPoint tests', ()=>{
    test('constructor testing',()=>{
        let AC = new PointActionPoint(
            "RTE.ACT.PT.10",10,"Point 10",[10,10],
            10,10,2,"Action 2",{}
        );
        expect(AC.id).toBe("RTE.ACT.PT.10");
        expect(AC.routeActionPointID).toBe(10);
        expect(AC.routeActionPointName).toBe("Point 10");
        expect(AC.coordinates).toEqual([10,10]);
        expect(AC.routeActionPointRadius).toBe(10);
        expect(AC.routeActionPointTimeToAct).toBe(10);
        expect(AC.routeActionPointRequiredAction).toBe(2);
        expect(AC.routeActionPointRequiredActionDescription).toBe("Action 2");
        expect(AC.type).toBe("actionpoint-point");

        expect(AC.getId()).toBe("RTE.ACT.PT.10");
        expect(AC.getCoordinates()).toEqual([10,10]);
        AC.setCoordinates([20,20]);
        expect(AC.getCoordinates()).toEqual([20,20]);

        AC = new PointActionPoint("RTE.ACT",3)
        expect(AC.routeActionPointName).toBe('');
        expect(AC.coordinates).toEqual([]);
        expect(AC.routeActionPointRadius).toBe(0);
        expect(AC.routeActionPointTimeToAct).toBe(0);



    });
    test('toGeoJSON testing',()=>{
        const AC = new PointActionPoint(
            "RTE.ACT.PT.10",10,"Point 10",[10,10],
            10,10,2,"Action 2",{}
        );
        expect(AC.toGeoJSON()).toEqual({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [10,10]
            },
            properties: {
                id: 'RTE.ACT.PT.10',
                routeActionPointID: 10,
                routeActionPointName: 'Point 10',
                routeActionPointRadius: 10,
                routeActionPointTimeToAct: 10,
                routeActionPointRequiredAction: 2,
                routeActionPointRequiredActionDescription: 'Action 2',
                routeActionPointExtensions: {},
                type: 'actionpoint-point'
            }
        });
    });
});


describe('CurveActionPoint tests', ()=>{
    test('constructor testing',()=>{
        let AC = new CurveActionPoint(
            "RTE.ACT.PT.11",11,"Point 11",[[1,1],[2,2]],
            11,11,3,"Action 3",{}
        );
        expect(AC.id).toBe("RTE.ACT.PT.11");
        expect(AC.routeActionPointID).toBe(11);
        expect(AC.routeActionPointName).toBe("Point 11");
        expect(AC.coordinates).toEqual([[1,1],[2,2]]);
        expect(AC.routeActionPointRadius).toBe(11);
        expect(AC.routeActionPointTimeToAct).toBe(11);
        expect(AC.routeActionPointRequiredAction).toBe(3);
        expect(AC.routeActionPointRequiredActionDescription).toBe("Action 3");
        expect(AC.type).toBe("actionpoint-curve");

        expect(AC.getId()).toBe("RTE.ACT.PT.11");
        expect(AC.getCoordinates()).toEqual([[1,1],[2,2]]);
        AC.setCoordinates([[1,1],[2,2],[3,1],[4,1]]);
        expect(AC.getCoordinates()).toEqual([[1,1],[2,2],[3,1],[4,1]]);


        expect(()=>new CurveActionPoint(
            "RTE.ACT.PT.11",11,"Point 11",[[2,2]],
            11,11,3,"Action 3",{}
        )).toThrowError("Line must have at least 2 points")

        AC = new CurveActionPoint("RTE.ACT",3,null,[[1,1],[2,2]])
        expect(AC.routeActionPointName).toBe('');
        expect(AC.coordinates).toEqual([[1,1],[2,2]]);
        expect(AC.routeActionPointRadius).toBe(0);
        expect(AC.routeActionPointTimeToAct).toBe(0);

    });

    test('toGeoJSON testing',()=>{
        const AC = new CurveActionPoint(
            "RTE.ACT.PT.11",11,"Point 11",[[1,1],[2,2]],
            11,11,3,"Action 3",{}
        );
        expect(AC.toGeoJSON()).toEqual({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [[1,1],[2,2]]
            },
            properties: {
                id: 'RTE.ACT.PT.11',
                routeActionPointID: 11,
                routeActionPointName: 'Point 11',
                routeActionPointRadius: 11,
                routeActionPointTimeToAct: 11,
                routeActionPointRequiredAction: 3,
                routeActionPointRequiredActionDescription: 'Action 3',
                routeActionPointExtensions: {},
                type: 'actionpoint-curve'
            }
        });
    });
});


describe('SurfaceActionPoint tests', ()=>{
    test('constructor testing',()=>{
        let AC = new SurfaceActionPoint(
            "RTE.ACT.PT.12",12,"Point 12",[[1,1],[2,2],[3,1],[1,1]],
            12,12,4,"Action 4",{}
        );
        expect(AC.id).toBe("RTE.ACT.PT.12");
        expect(AC.routeActionPointID).toBe(12);
        expect(AC.routeActionPointName).toBe("Point 12");
        expect(AC.coordinates).toEqual([[1,1],[2,2],[3,1],[1,1]]);
        expect(AC.routeActionPointRadius).toBe(12);
        expect(AC.routeActionPointTimeToAct).toBe(12);
        expect(AC.routeActionPointRequiredAction).toBe(4);
        expect(AC.routeActionPointRequiredActionDescription).toBe("Action 4");
        expect(AC.type).toBe("actionpoint-surface");

        expect(AC.getId()).toBe("RTE.ACT.PT.12");
        expect(AC.getCoordinates()).toEqual([[1,1],[2,2],[3,1],[1,1]]);
        AC.setCoordinates([[1,1],[2,2],[3,1],[4,1],[1,1]]);
        expect(AC.getCoordinates()).toEqual([[1,1],[2,2],[3,1],[4,1],[1,1]]);


        expect(()=>new SurfaceActionPoint(
            "RTE.ACT.PT.12",12,"Point 12",[[1,1],[3,1]],
            12,12,4,"Action 4",{}
        )).toThrowError("Polygon must have at least 3 points");

        AC = new SurfaceActionPoint("RTE.ACT",3,null,[[1,1],[2,2],[3,3],[2,3]])
        expect(AC.routeActionPointName).toBe('');
        expect(AC.coordinates).toEqual([[1,1],[2,2],[3,3],[2,3],[1,1]]);
        expect(AC.routeActionPointRadius).toBe(0);
        expect(AC.routeActionPointTimeToAct).toBe(0);

    });

    test('toGeoJSON testing',()=>{
        const AC = new SurfaceActionPoint(
            "RTE.ACT.PT.12",12,"Point 12",[[1,1],[2,2],[3,1]],
            12,12,4,"Action 4",{}
        );
        expect(AC.toGeoJSON()).toEqual({
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[[1,1],[2,2],[3,1],[1,1]]]
            },
            properties: {
                id: 'RTE.ACT.PT.12',
                routeActionPointID: 12,
                routeActionPointName: 'Point 12',
                routeActionPointRadius: 12,
                routeActionPointTimeToAct: 12,
                routeActionPointRequiredAction: 4,
                routeActionPointRequiredActionDescription: 'Action 4',
                routeActionPointExtensions: {},
                type: 'actionpoint-surface'
            }
        });
    });
});


describe('createActionPoint tests',()=>{
    let id, routeActionPointID, routeActionPointName, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions;

    beforeEach(()=>{
        id = "RTE.ACT.PT.1";
        routeActionPointID = 1;
        routeActionPointName = "Point 1";
        routeActionPointRadius = 1;
        routeActionPointTimeToAct = 1;
        routeActionPointRequiredAction = 1;
        routeActionPointRequiredActionDescription = "Action 1";
        routeActionPointExtensions = {};
    })

    test('RouteActionPoint of type point is created',()=>{
        const AC = createActionPoint("point",id,routeActionPointID,routeActionPointName,[1,1],
            routeActionPointRadius,routeActionPointTimeToAct,routeActionPointRequiredAction,
            routeActionPointRequiredActionDescription,routeActionPointExtensions);
        
        expect(AC instanceof PointActionPoint).toBe(true);
        expect(AC.toGeoJSON().geometry.type).toBe("Point");

    });
   
    test('RouteActionPoint of type curve is created',()=>{
        const AC = createActionPoint("curve",id,routeActionPointID,routeActionPointName,[[1,1],[2,2]],
            routeActionPointRadius,routeActionPointTimeToAct,routeActionPointRequiredAction,
            routeActionPointRequiredActionDescription,routeActionPointExtensions);
        
        expect(AC instanceof CurveActionPoint).toBe(true);
        expect(AC.toGeoJSON().geometry.type).toBe("LineString");

    })
    test('RouteActionPoint of type surface is created',()=>{
        const AC = createActionPoint("surface",id,routeActionPointID,routeActionPointName,[[1,1],[2,2],[3,3],[4,4]],
            routeActionPointRadius,routeActionPointTimeToAct,routeActionPointRequiredAction,
            routeActionPointRequiredActionDescription,routeActionPointExtensions);
        
        expect(AC instanceof SurfaceActionPoint).toBe(true);
        expect(AC.toGeoJSON().geometry.type).toBe("Polygon");

    })
});