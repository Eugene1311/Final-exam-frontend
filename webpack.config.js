'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
module.exports = {

  entry: {
    main: './js/src/app.js'
  },

  output: {
    path: __dirname + "/js",
    filename: "build.js"
  },

  watch: true,

  devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['','.js','.jsx']
  },

  module: {

    loaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  "babel?presets[]=es2015"
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
      // {
      //   test: /\.jsx$/,
      //   exclude: /\/node_modules\//,
      //   include: __dirname + 'js/src/',
      //   loaders: ['react-hot', 'jsx?harmony', 'babel']
      // }
    ]

  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV:JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 8000,
    historyApiFallback: true,
    hot: true
  }
};