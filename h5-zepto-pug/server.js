var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var express = require('express')
var app = express()
var port = 9000

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
app.use(webpackHotMiddleware(compiler))


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use(express.static(__dirname + '/build'));

app.get("/h5/test", function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.sendFile(__dirname + '/build/html/test.html')
})



app.get("/myapi/testTimeout", function(req, res) {
  var json ={
  "data": {
    "respCode": "00000000",
    "respMsg": "处理成功",
    "value": 1 //1-签约成功，0签约失败，2-已经签约
  }
}
  setTimeout(function(){
    res.send(json)
  },18000)
  
})

app.get("/myapi/testTimeout1", function(req, res) {
  var json ={
  "data": {
    "respCode": "00000000",
    "respMsg": "处理成功",
    "value": 1 //1-签约成功，0签约失败，2-已经签约
  }
}
    res.send(json)
})



app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
