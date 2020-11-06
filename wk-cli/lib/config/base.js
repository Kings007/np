const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {cwd,env} = require('../util/util')
const styleLoader = require('../util/styleLoader')
const { Module } = require('webpack')

module.exports = {
  entry: {
    app: path.join(cwd, './src/main.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.join(cwd, './dist'),
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /src/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[contenthash:8].[ext]',
            limit: 8192
          }
        }
      },
      {
        test: /\.(mp4|avi|flv|mp3|wav)$/,
        include: /src/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'media/[name].[contenthash:8].[ext]',
            limit: 8192
          }
        }
      },
      ...styleLoader({
        sourceMap: false,
        usePostCss: true
      })
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(cwd, './public/index.html'),
      filename: 'index.html'
    })
  ]
}