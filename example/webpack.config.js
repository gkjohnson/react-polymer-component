const path = require('path')
const webpack = require('webpack')
 
module.exports = {
    entry: './scripts/App.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devtool: 'source-map'
}