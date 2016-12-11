var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()

app.use('/s', proxy({
  target: 'http://pian.color365.com',
  changeOrigin: true,
  pathRewrite: {
    '^/s/api': '/s/api', // rewrite path
    '^/s/img/': '/s/img/'
  }
}))
app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(3000)
