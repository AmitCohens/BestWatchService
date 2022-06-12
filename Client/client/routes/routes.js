const express = require('express'),
    movieRoutes = require('./movie');

let router = express.Router();
const {use} = require("express/lib/router");
router.get('/', movieRoutes.get_movies);
router.get('/:id', movieRoutes.get_movie);
router.post('/', movieRoutes.create_movie);
router.post('/:id', movieRoutes.add_actor_to_movie);
router.put('/:id', movieRoutes.update_movie);
router.delete('/:id', movieRoutes.delete_movie);
router.delete('/:id/:idActor', movieRoutes.delete_actor_from_movie);
module.exports = router;



