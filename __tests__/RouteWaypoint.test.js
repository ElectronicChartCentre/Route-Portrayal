import { RouteWaypoint } from "../src/models";

describe('RouteWaypoint tests', () => {
    test('RouteWaypoint constructor',()=>{
        const id = 1;
        const reference = "reference";
        const routeWaypointName = "name";
        const coordinates = [1.0, 2.0];
        const routeWaypointFixed = true;
        const routeWaypointTurnRadius = 3.0;
        const routeWaypointLeg = "routeWaypointLeg";
        const routeWaypointExternalReferenceID = "routeWaypointExternalReferenceID";
        const routeWaypointExtensions = {};
        const routeWaypoint = new RouteWaypoint(id, reference, routeWaypointName, coordinates,
            routeWaypointFixed, routeWaypointTurnRadius,
            routeWaypointLeg, routeWaypointExternalReferenceID,
            routeWaypointExtensions);
        expect(routeWaypoint.id).toBe(id);
        expect(routeWaypoint.reference).toBe(reference);
        expect(routeWaypoint.routeWaypointName).toBe(routeWaypointName);
        expect(routeWaypoint.coordinates).toBe(coordinates);
        expect(routeWaypoint.routeWaypointFixed).toBe(routeWaypointFixed);
        expect(routeWaypoint.routeWaypointTurnRadius).toBe(routeWaypointTurnRadius);
        expect(routeWaypoint.routeWaypointLeg).toBe(routeWaypointLeg);
        expect(routeWaypoint.routeWaypointExternalReferenceID).toBe(routeWaypointExternalReferenceID);
        expect(routeWaypoint.routeWaypointExtensions).toBe(routeWaypointExtensions);
        expect(routeWaypoint.type).toBe("waypoint");
    });

    test('RouteWaypoint constructor with no reference and no radius',()=>{
        const id = 1;
        const routeWaypointName = "routeWaypointName";
        const coordinates = [1.0, 2.0];
        const routeWaypointFixed = true;
        const routeWaypointLeg = "routeWaypointLeg";
        const routeWaypointExternalReferenceID = "routeWaypointExternalReferenceID";
        const routeWaypointExtensions = "routeWaypointExtensions";
        const routeWaypoint = new RouteWaypoint(id, undefined, routeWaypointName, coordinates,
            routeWaypointFixed, null,
            routeWaypointLeg, routeWaypointExternalReferenceID,
            routeWaypointExtensions);
        expect(routeWaypoint.reference).toBe('');
        expect(routeWaypoint.routeWaypointTurnRadius).toBe(0.0);
    });

    test('RouteWaypoint constructor with invalid coordinates or id',()=>{
        let id = 1;
        const routeWaypointName = "routeWaypointName";
        let coordinates = [NaN, 'some'];
        const routeWaypointFixed = true;
        const routeWaypointTurnRadius = 3.0;
        const routeWaypointLeg = "routeWaypointLeg";
        const routeWaypointExternalReferenceID = "routeWaypointExternalReferenceID";
        const routeWaypointExtensions = "routeWaypointExtensions";
        expect(() => new RouteWaypoint(id, undefined, routeWaypointName, coordinates,
            routeWaypointFixed, routeWaypointTurnRadius,
            routeWaypointLeg, routeWaypointExternalReferenceID,
            routeWaypointExtensions)).toThrowError("Invalid coordinates");

        coordinates = [1.0, 2.0];
        id = 'not a number';
        expect(() => new RouteWaypoint(id, undefined, routeWaypointName, coordinates,
            routeWaypointFixed, routeWaypointTurnRadius,
            routeWaypointLeg, routeWaypointExternalReferenceID,
            routeWaypointExtensions)).toThrowError("Invalid id");
    });

    test('getter and setter methods',()=>{
        const waypoint = new RouteWaypoint(1, 'reference', "name", [1.0, 2.0],true,
                    3.0, "routeWaypointLeg", "routeWaypointExternalReferenceID",{});

        expect(waypoint.getType()).toBe("waypoint");
        expect(waypoint.getId()).toBe(1);
        expect(waypoint.getRadius()).toBe(3.0);
        expect(waypoint.getRouteWaypointLeg()).toBe("routeWaypointLeg");
        expect(waypoint.getCoordinates()).toStrictEqual([1.0, 2.0]);
        // setter methods
        waypoint.setRouteWaypointLeg("new routeWaypointLeg");
        expect(waypoint.getRouteWaypointLeg()).toBe("new routeWaypointLeg");
        waypoint.setCoordinates([3.0, 4.0]);
        expect(waypoint.getCoordinates()).toStrictEqual([3.0, 4.0]);
    });

    test('toGeoJSON method',()=>{
        const id = 1,
        reference = "reference",
        routeWaypointName = "name",
        coordinates = [1.0, 2.0],
        routeWaypointFixed = true,
        routeWaypointTurnRadius = 3.0,
        routeWaypointLeg = "routeWaypointLeg",
        routeWaypointExternalReferenceID = "routeWaypointExternalReferenceID",
        routeWaypointExtensions = {};

        const waypoint = new RouteWaypoint(id, reference, routeWaypointName, coordinates,
            routeWaypointFixed, routeWaypointTurnRadius, routeWaypointLeg,
            routeWaypointExternalReferenceID, routeWaypointExtensions);

        const expectedResult = {
            type: 'Feature',
            properties: {
                id: 1,
                type: 'waypoint',
                radius: 3.0,
                routeWaypointLeg: 'routeWaypointLeg',
            },
            geometry: {
                type: 'Point',
                coordinates: [1.0, 2.0]
            }
        };

        const geoJSON = waypoint.toGeoJSON();
        expect(geoJSON).toStrictEqual(expectedResult);
    });

});