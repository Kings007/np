const { merge } = require('webpack-merge')
const baseConfig = require('./base')

const devConfig = {
  mode: 'production'
}

module.exports = merge(baseConfig, devConfig)