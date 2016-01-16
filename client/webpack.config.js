/**
 * Created by ndyumin on 25.12.2015.
 */
var webpack = require('webpack');
module.exports = {
    entry: './app.js',
    output: {
        path: '../static',
        filename: 'bundle.js'
    },
    debug: true,
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            'R': 'ramda'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
};