const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getGameByQuery, getGameById, postGame } = require('../controllers/videogameController');
const { getGenres } = require('../controllers/genresControllers')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getGameByQuery)

router.get('/genres', getGenres)

router.get('/videogame/:id', getGameById)

router.post('/videogames', postGame)



module.exports = router;
