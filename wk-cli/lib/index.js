const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')

const { cwd, env } = require('./util/util')
const devConfig = require('./config/dev')
const prodConfig = require('./config/prod')

exports.run = () => {
  let config = {}
  const filePath = path.join(cwd, 'wk.config.js')
  if (fs.statSync(filePath).isFile()) {
    let userConfig = require(filePath)
    if (typeof userConfig === 'function') {
      config = userConfig()
    }
    if (typeof userConfig === 'object') {
      config = userConfig
    }
  }
  if (env() === 'dev') {
    runServer(config)
  } else {
    runBuild(config)
  }
}

function runServer(config) {
  config = merge(devConfig, config)
  const compiler = webpack(config)
  const { devServer = {} } = config
  const server = new WebpackDevServer(compiler.config.devServer)
  const { port = 9000, host = 'localhost' } = devServer
  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0)
    })
  })
  server.listen(port, host, err => {
    if(err) {
      console.log(err)
    } else {
      console.log('服务已开启')
    }
  })
}

function runBuild(config) {
  config = merge(prodConfig, config)
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if(err) {
      return console.error(err.stack || err)
    }
    const info = stats.toJson({
      chunks: false,
      coolors: true
    })
    if(stats.hasErrors()) {
      return console.error(info.errors)
    }
    if(stats.hasWarnings()) {
      console.warn(info.warnings)
    }
    console.log('Build complete.')
  })
}