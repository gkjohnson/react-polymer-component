const path = require('path');

module.exports = {
    entry: './example/scripts/App.js',
    output: {
        path: path.resolve(__dirname, 'example/build'),
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
};
