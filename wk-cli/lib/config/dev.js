const {merge} = require('webpack-merge')
const baseConfig = require('./base')

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: 8080
  }
}

module.exports = merge(baseConfig, devConfig)