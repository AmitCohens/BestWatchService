const express = require('express'),
    movieRoutes = require('./movie');

let router = express.Router();
router.get('/', (req, res) => {
    res.send('welcome to the development api-server');
});
router.get('/movie', movieRoutes.get_movies);
router.get('/movie/:id', movieRoutes.get_movie);
router.post('/movie', movieRoutes.create_movie);
router.post('/movie/:id', movieRoutes.add_actor_to_movie);
router.put('/movie/:id', movieRoutes.update_movie);
router.delete('/movie/:id', movieRoutes.delete_movie);
router.delete('/movie/:id/:idActor', movieRoutes.delete_actor_from_movie);
module.exports = router;



