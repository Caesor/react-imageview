const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loaders: ['style', 'css']
        },
        {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        },
        {
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            // exclude: /node_modules/,
            include: [__dirname, path.resolve(__dirname, './../src')]
        }
        ]
    }
}
