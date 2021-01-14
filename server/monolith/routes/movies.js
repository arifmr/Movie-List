const express = require('express')
const router = express.Router()
const { MovieController } = require('../controllers')

router.get('/', MovieController.getMovies)
router.post('/', MovieController.createMovie)
router.get('/:id', MovieController.getMovieById)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router