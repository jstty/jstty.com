var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/src/index'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app/src')
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(css)$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.(sass|scss)$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }

};
