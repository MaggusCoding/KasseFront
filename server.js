var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
app.use(serveStatic(__dirname + "/dist"))
var port = process.env.PORT || 3000
var hostname = 'trese.up.railway.app'

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
