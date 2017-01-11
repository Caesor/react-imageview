var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        "react-imageview": './src/index.js'
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "react-singleton": "react-singleton"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: [__dirname]
            }
        ]
    },
    output: {
        path: 'dist/',
        library: 'react-imageview',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.DedupePlugin()
    ]
}

if(process.env.NODE_ENV === 'production') {
    config.output.filename = '[name].min.js';
    config.plugins = config.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('[name].min.css')
    );
}else {
    config.output.filename = '[name].js';
    config.plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = config
