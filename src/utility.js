import { xml2json } from 'xml-js';

export function nameSpaceTrimmer(str) {
    return str.split(':').pop();
}

export function recursiveNamespaceTrimmer(obj) {
    if (Array.isArray(obj)) {
        for (let item of obj) {
            recursiveNamespaceTrimmer(item);
        }
    }
    else if (obj instanceof Object) {
        let newName;
        for (let key of Object.getOwnPropertyNames(obj)) {
            newName = nameSpaceTrimmer(key);
            if (newName !== key) {
                Object.defineProperty(obj, newName, Object.getOwnPropertyDescriptor(obj, key));
                delete obj[key];
            }
            recursiveNamespaceTrimmer(obj[newName]);
        }
    }
}

export function parseXML(xml) {
    try{
        const object = JSON.parse(xml2json(xml, { compact: true, spaces: 4 }));
        recursiveNamespaceTrimmer(object);
        return object;
    }catch (e){
        return null;
    }
}

export function getCoordinates(point) {
    let coord = point.split(' ');
    // Longitude first then latitude. Following GeoJSON standard
    if (coord.length > 2) {
        coord = coord.filter(c => c !== '');
    }
    return coord.length === 2 ? [parseFloat(coord[1]), parseFloat(coord[0])] : [NaN, NaN];
}
