const path = require('path');

module.exports = {
    entry: './example/scripts/App.jsx',
    output: {
        path: path.resolve(__dirname, 'example/build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react']
            },
        }],
    },
    devtool: 'source-map'
};
