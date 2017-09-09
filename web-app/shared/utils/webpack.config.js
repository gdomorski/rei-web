let path = require('path');
let webpack = require('webpack');

module.exports = function (directoryPath) {
  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    output: {
      path: path.join(directoryPath, 'src'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ||  'production' )
      }),
      new webpack.HotModuleReplacementPlugin()
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
          loaders: ['style', 'css', 'sass']
        }
      ]
    }

  }
}
