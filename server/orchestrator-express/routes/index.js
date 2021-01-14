const express = require('express')
const router = express.Router()
const moviesRouter = require('./movies')
const tvSeriesRouter = require('./tvSeries')
const { OrchestratorController } = require('../controllers')

router.get('/', OrchestratorController.getAll)
router.use('/movies', moviesRouter)
router.use('/tvseries', tvSeriesRouter)

module.exports = router