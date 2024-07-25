
import {nameSpaceTrimmer, recursiveNamespaceTrimmer, getCoordinates, parseXML} from '../src/utility';

describe('nameSpaceTrimmer tests', ()=>{
    test('colon and text before the colon is removed from the string',()=>{
        const str = "namespace:element";
        const expectedResult = "element";
        expect(nameSpaceTrimmer(str)).toBe(expectedResult);
    });

    test('string stays the same if it does not contain a colon',()=>{
        let str = "this is some text";
        expect(nameSpaceTrimmer(str)).toBe(str);

        str = "";
        expect(nameSpaceTrimmer(str)).toBe("");
        
    });

});

describe('recursiveNamespaceTrimmer tests', ()=>{
    test('namespaces of object properties are trimmed recursively',()=>{
        const obj = {
            "namespace:element": {
                "namespace:element2": "element2",
                "namespace:element3": "element3"
            }
        };
        const expectedResult = {
            "element": {
                "element2": "element2",
                "element3": "element3"
            }
        };
        recursiveNamespaceTrimmer(obj);
        expect(obj).toEqual(expectedResult);
    });

    test('arrays are enumerated and object properties are trimmed recursively',()=>{
        const obj = {
            "namespace:element": [
                {
                    "namespace:element2": "element2",
                    "namespace:element3": "element3"
                },
                {
                    "namespace:element4": "element4",
                    "namespace:element5": "element5"
                }
            ]
        };
        const expectedResult = {
            "element": [
                {
                    "element2": "element2",
                    "element3": "element3"
                },
                {
                    "element4": "element4",
                    "element5": "element5"
                }
            ]
        };
        recursiveNamespaceTrimmer(obj);
        expect(obj).toEqual(expectedResult);
    });
    
});


describe('getCoordinates tests', ()=>{
    test('coordinates are extracted from a string and in the right order',()=>{
        const point = "10 20";
        const expectedResult = [20,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
        expect(getCoordinates(point)).not.toEqual([10,20]);
    });
    test('returns NaN for non-numeric values',()=>{
        let point = "10 a";
        let expectedResult = [NaN,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
        point = "b c";
        expectedResult = [NaN,NaN];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });
    test('coordinates are extracted from a string with multiple spaces',()=>{
        const point = "10  20";
        const expectedResult = [20,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });

    test('coordinates that contain more than two values will be set to [NaN,NaN]',()=>{
        const point = "10 20 30";
        const expectedResult = [NaN,NaN];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });
});


describe('parseXML tests', ()=>{

    test('xml tags and attributes are parsed as expected',()=>{
        const xml = `<Point xmlns="http://www.opengis.net/gml">
                        <pos>58.97756611 5.72598921</pos>
                    </Point>`;

        const expectedResult = {
            Point: {
                _attributes: {
                    xmlns: "http://www.opengis.net/gml"
                },
                pos: {
                    _text: "58.97756611 5.72598921"
                }
            }
        }

        const result = parseXML(xml);
        expect(result).not.toBeNull();
        expect(result).toEqual(expectedResult);
    });

    test('multiple elements with the same tag are put in a JSON list',()=>{
        const xml = `<List>
                        <Item>1</Item>
                        <Item>2</Item>
                        <Item>3</Item>
                        <Other>4</Other>
                        <Other>5</Other>
                    </List>`;

        const expectedResult = {
            List:{
                Item:[
                    {_text:"1"},
                    {_text:"2"},
                    {_text:"3"}
                ],
                Other:[
                    {_text:"4"},
                    {_text:"5"}
                ]
            }
        }

        const result = parseXML(xml);
        expect(result).not.toBeNull();
        expect(result).toEqual(expectedResult);
    });

    test('null returned with invalid xml',()=>{
        const xml = "not valid xml";
        const result = parseXML(xml);
        expect(result).toBeNull();
    });

    
});