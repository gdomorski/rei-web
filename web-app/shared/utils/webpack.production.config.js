let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HTMLWebpackPlugin = require('html-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (directoryPath) {

  let copyAssets;

  if (directoryPath.includes("partners_react/partners")) {
    copyAssets = [
      {
        from: path.join(directoryPath, 'src/images'),
        to: path.join(directoryPath, 'publish/src/images')
      }
    ];
  } else {
    copyAssets = [
      {
        from: path.join(directoryPath, 'src/images'),
        to: path.join(directoryPath, 'publish/src/images')
      },
      {
        from: path.join(directoryPath, 'src/styles'),
        to: path.join(directoryPath, 'publish/src/styles')
      }
    ];
  }

  return {
    entry: [
      'babel-polyfill',
      './src/index'
    ],
    output: {
      path: path.join(directoryPath, 'publish', 'dist'),
      filename: '[hash].bundle.js',
      publicPath: '/dist/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new ExtractTextPlugin('[hash].style.css', {
          allChunks: true
      }),
      new HTMLWebpackPlugin({
        filename: "../index.html",
        template: directoryPath + '/index.ejs'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        },
        output: {
          comments: false
        },
        mangle: {
          screw_ie8 : true,
          keep_fnames: false
        }
      }),
      new CopyWebpackPlugin(copyAssets)
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            plugins: ["transform-class-properties"],
            presets: ['es2015','react', 'stage-2']
          },
          exclude: /(node_modules|bower_components)/,
          include: [
            path.join(directoryPath, 'routes'),
            path.join(directoryPath, 'views'),
            path.join(directoryPath, 'src'),
            path.join(directoryPath, '../common'),
            path.join(directoryPath, '../../shared')
          ]
        },
        {
          test: /\.(png|jpg|ico)$/,
          loader: 'file-loader?name=img/[name].[ext]'
        },
        {
          test: /\.(html)$/,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        }
      ]
    }
  }
};
