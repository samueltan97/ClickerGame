const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env build with webpack 2

let mode, entry, outputDir, filename;

if (env === 'build') {
    mode = 'production';
    entry = {
        index: './src/index.ts'
    };
    outputDir = './dist/';
    filename = 'index.min.js';

} else if (env === 'dev') {
    mode = 'development';
    entry = {
        index: './src/index.ts'
    };
    outputDir = './dist/';
    filename = 'index.js';

} else if (env === 'test') {
    mode = 'production';
    entry = {
        main: './test/index.spec.ts'
    };
    outputDir = './test/';
    filename = 'index.spec.js';
}

config = {
    mode: mode,
    devtool: 'source-map',
    entry: entry,
    output: {
        filename: filename,
        path: path.resolve(__dirname, outputDir),
        libraryTarget: 'umd',
        library: "clicker"
        
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    }
};

module.exports = config;