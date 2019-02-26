const config = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/page/manage/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }

    ),
];

config.entry = {
    'index': './src/index'
}
config.output.filename = '[name].js';

config.output = {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
    // publicPath: `${require('./config').staticAddress.replace('.cn','.net')}/`,
}

module.exports = merge(config, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // contentBase: path.join(__dirname, '/dist'),
        // publicPath: '/',
        port: 8081,
        hot: true,
        allowedHosts: [
            'h5editor.cn'
        ],
        headers: {
            'Access-Control-Allow-Origin': 'h5editor.cn', // 5
            'Access-Control-Allow-Credentials': false
        },
        disableHostCheck: true,
    },
    module: {
        rules: [{
            test: /\.less/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }, ]
    },
    plugins,
});