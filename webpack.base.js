/* eslint-disable */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const entryList = glob.sync('src/page/*/index.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const isAnalyze = process.env.npm_config_argv.includes('analyze');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HappyPack = require('happypack');

let cliEntry = process.env.npm_config_argv.match(/--entry=([\w]+)/);

let entrys = {};
entryList.forEach(function(file) {
  const name = file.replace(/src\/(page\/.*)\/index.js/gi, '$1');
  entrys[name] = './' + file;
});
if (cliEntry) {
  const pageName = cliEntry[1];
  const result = {};
  for (let i in entrys) {
    if (i.includes(pageName)) {
      result[i] = entrys[i];
    }
  }
  entrys = result;
}

// console.log(entrys);
const sourcePath = path.join(__dirname, '/src');

let plugins = [new LodashModuleReplacementPlugin()];

// const HtmlWebpackPlugins = [
//     new HtmlWebpackPlugin({
//         filename: '/page/decorate.html',
//         template: './src/page/decorate/index.html',
//         chunks: ['decorate']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/canvas.html',
//         template: './src/page/canvas/index.html',
//         chunks: ['canvas'],
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/learn.html',
//         template: './src/page/learn/index.html',
//         chunks: ['learn']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/preview.html',
//         template: './src/page/preview/index.html',
//         chunks: ['preview']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/manage.html',
//         template: './src/page/manage/index.html',
//         chunks: ['manage']
//     })
// ]

// plugins = plugins.concat(HtmlWebpackPlugins);

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

let imageLoaderConfig =
  'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]';

module.exports = {
  entry: entrys,
  // entry: {
  //     'page/decorate': './src/page/decorate/index.js',
  // },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].[chunkhash:8].js',
    // filename: '[name].js',
    // chunkFilename: '[id].chunk.js',
    publicPath: `${require('./config').staticAddress}/`,
  },
  stats: 'minimal',
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 排除的chunk(通常是import()引入的)
        // 'intersection-observer': {
        //     name: 'intersection-observer',
        //     test: /[\\/]node_modules[\\/]intersection-observer/,
        //     priority: 20,
        // },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: 'vendor',
          // 后视正则把需要异步载入的chunk断下来
          test: /[\\/]node_modules[\\/](?!intersection-observer|n-zepto)/,
          chunks(chunk) {
            // 浏览页面单独打包
            return !['page/view', 'page/login', 'page/register'].includes(
              chunk.name,
            );
          },
          priority: 10,
        },
        viewVendor: {
          name: 'viewVendor',
          test: /[\\/]node_modules[\\/](?!n-zepto)/,
          chunks(chunk) {
            // 浏览页面单独打包
            return chunk.name === 'page/view';
          },
          priority: 10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'config.js'),
        ],
        loader: 'babel-loader',
      },

      // {
      //     test: /\.html/,
      //     exclude: /node_modules/,
      //     use: 'html-loader'
      // }
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader',
      },
    ],
  },
  // externals: {
  //     jquery: 'jQuery',
  // },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.d.ts'],
  },
  plugins,
};
