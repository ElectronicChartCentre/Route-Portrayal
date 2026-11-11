const xmlName = '[A-Za-z_][\\w.:-]*';
// Preserve any &token; candidate; the XML parser decides whether it is a valid entity.
const bareAmpersand = /&(?!(?:[^\s&<>"';]+);)/g;
const attribute = `${xmlName}\\s*=\\s*(?:"[^"<]*"|'[^'<]*')`;
const tokenPattern = new RegExp(
    `<!--[\\s\\S]*?-->|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|<\\?[\\s\\S]*?\\?>|</${xmlName}\\s*>|<${xmlName}(?:\\s+${attribute})*\\s*/?>|[^<]+`,
    'gy'
);

function isDescriptiveElement(path) {
    return path === 'route/routeInfo' || path === 'route/waypoints/waypoint';
}

export function repairRTZText(xml) {
    const tokens = new RegExp(tokenPattern);
    const stack = [];
    const repairs = [];
    let result = '';
    let offset = 0;
    let token;
    let locationOffset = 0;
    let locationLine = 1;
    let locationColumn = 1;

    function escapeAmpersands(text, position, field) {
        let count = 0;
        // Keep entity references intact, including unknown ones that must still fail validation.
        const escaped = text.replace(bareAmpersand, () => {
            count++;
            return '&amp;';
        });
        if (count) {
            while (locationOffset < position) {
                if (xml[locationOffset] === '\n') {
                    locationLine++;
                    locationColumn = 1;
                } else {
                    locationColumn++;
                }
                locationOffset++;
            }
            repairs.push({
                field,
                line: locationLine,
                column: locationColumn,
                count
            });
        }
        return escaped;
    }

    while ((token = tokens.exec(xml))) {
        const text = token[0];
        let replacement = text;
        if (text.startsWith('</')) {
            const name = text.match(/^<\/([^\s>]+)/)[1];
            if (stack.pop() !== name) return { xml, repairs: [] };
        } else if (text.startsWith('<!--') || text.startsWith('<![CDATA[') || text.startsWith('<?')) {
            // Comments, CDATA and processing instructions are never repaired.
        } else if (text.startsWith('<')) {
            const name = text.match(/^<([^\s/>]+)/)[1];
            const path = [...stack, name].map(part => part.split(':').pop()).join('/');
            if (isDescriptiveElement(path)) {
                replacement = text.replace(
                    /([A-Za-z_][\w.:-]*)(\s*=\s*)(["'])([\s\S]*?)\3/g,
                    (match, key, equals, quote, value, index) => {
                        const allowed = key === 'description' ||
                            (path === 'route/routeInfo' ? key === 'routeName' : key === 'name');
                        if (!allowed) return match;
                        const start = token.index + index + key.length + equals.length + 1;
                        return `${key}${equals}${quote}${escapeAmpersands(value, start, key)}${quote}`;
                    }
                );
            }
            if (!text.endsWith('/>')) stack.push(name);
        } else {
            const path = stack.map(part => part.split(':').pop()).join('/');
            if (path.endsWith('/description') && isDescriptiveElement(path.slice(0, -12))) {
                replacement = escapeAmpersands(text, token.index, 'description');
            }
        }
        result += replacement;
        offset = tokens.lastIndex;
    }

    // Do not attempt recovery across broken tags, quotations, declarations or nesting.
    if (offset !== xml.length || stack.length) return { xml, repairs: [] };
    return { xml: result, repairs };
}
