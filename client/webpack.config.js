/**
 * Created by ndyumin on 25.12.2015.
 */
module.exports = {
    entry: "./app.js",
    output: {
        path: '../static',
        filename: "bundle.js"
    },
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