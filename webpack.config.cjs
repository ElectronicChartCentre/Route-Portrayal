const path = require('path');

module.exports = [
    {
        // ESM
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'routePortrayal.esm.mjs',
            library: {
                type: 'module',
            },
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
            fallback: {
                "stream": false,
                "string_decoder": false,
                "buffer": false
            }
        },
        mode: 'production'
    },
    { // UMD - Browser and CommonJS
        entry: './src/main.js',
        output: {
            filename: 'routePortrayal.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'routePortrayal',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        resolve: {
            fallback: {
                "stream": false,
                "string_decoder": false,
                "buffer": false
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        mode: 'production'
    }
];