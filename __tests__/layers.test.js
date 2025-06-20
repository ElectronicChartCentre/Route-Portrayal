import { createLayers, createCorridorLayers } from "../src/layers";


describe('createLayers tests', () => {
    test('all 10 layers are returned',()=>{
        const layers = createLayers('sourceName');
        expect(layers.length).toBe(10);
    })

    test('sourceName can be found in all layers',()=>{
        const sourceName = "tester";
        const layers = createLayers(sourceName);
        layers.forEach(layer => {
            expect(layer.source).toBe(sourceName);
        });
    });

    test('layerIdPrefix is added to all layers',()=>{
        const layerIdPrefix = "prefix-";
        const layers = createLayers('sourceName', layerIdPrefix);
        layers.forEach(layer => {
            expect(layer.id).toContain(layerIdPrefix);
        });
    });
});

describe('createCorridorLayers tests', () => {
    test('all 2 corridor layers are returned', () => {
        const layers = createCorridorLayers('sourceName');
        expect(layers.length).toBe(2);
    });

    test('sourceName can be found in all corridor layers', () => {
        const sourceName = "tester";
        const layers = createLayers(sourceName);
        layers.forEach(layer => {
            expect(layer.source).toBe(sourceName);
        });
    });

    test('layerIdPrefix is added to all corridor layers', () => {
        const layerIdPrefix = "prefix-";
        const layers = createLayers('sourceName', layerIdPrefix);
        layers.forEach(layer => {
            expect(layer.id).toContain(layerIdPrefix);
        });
    });
})