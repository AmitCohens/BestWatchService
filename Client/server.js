const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    compression = require('compression'),
    cors = require('cors');
const port = 3000;

const app=express();

let setCache = function (req, res, next) {
    // here you can define period in second, this one is 5 minutes
    const period = 60 * 50
    // you only want to cache for GET requests
    if (req.method === 'GET') {
      res.set('Cache-control', "public, max-age=600")
    } else {
      // for the other requests set strict no caching parameters
      res.set('Cache-control', `no-store`)
    }
    // remember to call next() to pass on the request
    next()
  }
app.use(compression());
app.get('/testcache', (req,res)=>{  res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); res.send("te");});
app.use('/main',setCache, express.static(path.join(__dirname, 'client/html/index.html')));
app.use('/list_users', express.static(path.join(__dirname, 'client/html/index.html')));
app.use('/add_user', express.static(path.join(__dirname, 'client/html/add_user_form.html')));
app.use('/js', setCache, express.static(path.join(__dirname, 'client/js')));
app.use('/css', setCache, express.static(path.join(__dirname, 'client/css')));


const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
