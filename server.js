var express = require('express')
var path = require('path')
var cors = require('cors');
var serveStatic = require('serve-static')
var favicon = require('serve-favicon');


var app = express()
var distDir = __dirname;
app.use(express.static(distDir));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



app.options('*', cors());
app.use(favicon('favicon.ico'));

app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(cors({
  origin: 'https://catchthepitch.herokuapp.com:8080',
  credentials: true
}));


var port = process.env.PORT || 8000
app.listen(port)
console.log('server started ' + port)

