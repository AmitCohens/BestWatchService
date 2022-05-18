const express = require('express'),
    cors = require('cors'),
    routers = require('./server/routes/routes.js');
const port = 3001;

const app=express();

//restfull
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);

});
