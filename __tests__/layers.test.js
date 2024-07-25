import { createLayers } from "../src/layers";


describe('createLayers tests', () => {
    test('all 12 layers are returned',()=>{
        const layers = createLayers('sourceName');
        expect(layers.length).toBe(12);
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