var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
 
var SRC = path.resolve(__dirname, 'src');
var BUILD = path.resolve(__dirname, 'build');
 
var config = {
  entry: SRC + '/index.js',
  output: {
    path: BUILD,
    filename: 'build.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: 'node_modules/'
          },
          {
              test: /\.scss$/,
              loader: ['style-loader', 'css-loader', 'sass-loader'],
              exclude: 'node_modules/'
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({template: './index.html'})
  ]
};
 
module.exports = config;