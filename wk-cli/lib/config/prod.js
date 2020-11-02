const {merge} = require('webpack-merge')
const { module } = require('./base')
const baseConfig = require('./base')

const devConfig = {
  mode: 'production'
}

module.exports = merge(baseConfig, devConfig)