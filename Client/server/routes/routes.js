const express = require('express'),
    movieRoutes = require('./movie'),
    actorRoutes=require("./actor");

let router = express.Router();
const {use} = require("express/lib/router");
router.get('/movie/', movieRoutes.get_movies);
router.get('/actors', actorRoutes.get_Actors);
router.get('/movie/:id', movieRoutes.get_movie);
router.post('/movie/', movieRoutes.create_movie);
router.post('/newActor', actorRoutes.newActor);
router.post('/movie/:id', movieRoutes.add_actor_to_movie);
router.put('/movie/:movie_id', movieRoutes.update_movie);
router.delete('/movie/:movie_id', movieRoutes.delete_movie);
router.delete('/movie/:id/:idActor', movieRoutes.delete_actor_from_movie);
module.exports = router;



