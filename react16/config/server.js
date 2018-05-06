var mockService = require('../mockService')
var webpack = require('webpack')
var cp = require('child_process')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express')
var app = express()
var port = 9000
var PATHS = require('./PATHS');
var proxy = require('http-proxy-middleware');
var compiler = webpack(config)
var proxyTable = require('../mockService/proxyTable');
// proxy api requests
// 顺序必须在 bodyParser 之前！！！
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxy(options.filter || context, options));
})

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000 // is this the same as specifying --watch-poll?
  }
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(PATHS.ROOT + '/'));

app.get("/myapi", function (req, res) {
  var json = {
    "data": {
      "respCode": "00000000",
      "respMsg": "处理成功",
      "value": 1 //1-签约成功，0签约失败，2-已经签约
    }
  }
  setTimeout(function () {
    res.send(json)
  }, 100)
})

app.get("/api/*", function (req, res) {
  console.log(req.originalUrl)
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})

app.get("/", function (req, res) {
  res.sendFile(PATHS.ROOT + '/src/index_dev.html')
})

app.get("/*", function (req, res) {
  res.sendFile(PATHS.ROOT + '/src/index_dev.html')
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    cp.exec('open http://localhost:9000/home')
  }
})
