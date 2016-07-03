var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  //devtool: 'eval',
  devtool: 'source-map',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CopyWebpackPlugin([
      { from: 'app/backgrounds', to: 'backgrounds' },
      { from: 'app/projects', to: 'projects' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app/src')
      },
      {
        test: /\.(jpg|jpeg|png|gif|ttf|svg|woff|woff2|eot)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      },
      //{
      //  test: /\.(jpe?g|png|gif|ttf|svg)$/i,
      //  loaders: [
      //    'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //  ]
      //},
      {
        test: /\.(sass|scss|css)$/,
        loaders: ["style", "css", "sass"]
      },
      //{
      //  test: /\.css$/,
      //  loaders: ["style", "css"]
      //},
      {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
      }
    ]
  },

  imageWebpackLoader: {
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
  }

};
