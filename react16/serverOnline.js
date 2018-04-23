var express = require('express')
var app = express()
var port = 9000
app.use(express.static(__dirname + '/dist/build'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/build/index.html')
})
app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/dist/build/index.html')
})
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
