/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

    output: {
        publicPath: './assets/',
        path: 'dist/assets/',
        filename: 'main.js'
    },

    debug: false,
    devtool: false,
    entry: './src/scripts/main.js',

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ProvidePlugin({
            "_": "underscore"
        })
    ],

    resolve: {
        extensions: ['', '.js']
    },

    module: {
        preLoaders: [{
            test: '\\.js$',
            exclude: 'node_modules',
            loader: 'jshint'
        }],

        loaders: [{
            test: /\.js$/,
            loader: 'jsx-loader?harmony!babel?blacklist=useStrict'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
};
