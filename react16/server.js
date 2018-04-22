var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config.prod')
var config = require('./webpack.config')

var express = require('express')
var app = express()
var port = 9001

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath,
	hot: true,
	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000 // is this the same as specifying --watch-poll?
	}
}))

console.log('path : ' + __dirname)
console.log('path2 : ' + config.output.publicPath)


app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname + '/'));

app.get("/myapi", function(req, res) {
  var json ={
  "data": {
    "respCode": "00000000",
    "respMsg": "处理成功",
    "value": 1 //1-签约成功，0签约失败，2-已经签约
  }
}
  setTimeout(function(){
    res.send(json)
  },100)
  
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
