<<<<<<< HEAD
const path = require('path'),
    webpack = require('webpack');
=======
const path = require('path');
>>>>>>> master

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
<<<<<<< HEAD
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        },
        {
=======
>>>>>>> master
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            // exclude: /node_modules/,
            include: [__dirname, path.resolve(__dirname, './../src'), path.resolve(__dirname, './../dist')]
        }
        ]
<<<<<<< HEAD
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
=======
    }
>>>>>>> master
}
