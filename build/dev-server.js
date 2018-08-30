const express = require('express')
const path = require('path')
const webpack = require('webpack')
const opn = require('opn')
const httpProxyMiddleWare = require('http-proxy-middleware')

const devConfig = require('./webpack.dev.conf')
const config = require('../config')

const port = process.env.port || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(devConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: devConfig.output.publicPath,
  quiet: true
})

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

// force page reload when html-webpack-plugin template change
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
    webpackHotMiddleware.publish({ action: 'reload' })
    callback()
  })
})

// proxy api request
Object.keys(proxyTable).forEach(context => {
  let option = proxyTable[context]
  if (typeof option === 'string') {
    option = { target: option }
  }

  app.use(httpProxyMiddleWare(option.filter || context, option))
})

// handle callback for HTML5 history mode
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(webpackDevMiddleware)

// enable hot-reload and state-preserving
app.use(webpackHotMiddleware)

// handle static requiest
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.use('/static/*', (req, res) => {
  res.sendFile(path.join(__dirname, `../dist/${req.path}`))
})

const uri = 'http://127.0.0.1:' + port

console.log('> Starting dev server....')
webpackDevMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri)
  if (autoOpenBrowser) {
    opn(uri)
  }
})

app.listen(port)
