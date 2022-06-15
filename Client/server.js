const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    routers = require("./server/routes/routes.js"),
    compression = require('compression'),
    cors = require('cors');
require("../Client/server/DB/mongoose");
const port = 3001;
const app = express();


app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/movie', routers);

app.get('/', function (req, res) {res.redirect('/list')});
app.use('/list', express.static(path.join(__dirname, 'client/html')));
app.use('/list/addNewMovie', express.static(path.join(__dirname, 'client/html/addMovie.html')));
app.use('/list/updateMovie/:id', express.static(path.join(__dirname, 'client/html/updateMovie.html')));
app.use('/list/addActor/:id', express.static(path.join(__dirname, 'client/html/addNewActor.html')));
app.use('/js', express.static(path.join(__dirname, 'client/js')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));


const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
