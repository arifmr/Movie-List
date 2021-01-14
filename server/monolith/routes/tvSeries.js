const express = require('express')
const router = express.Router()
const { TvSeriesController } = require('../controllers')

router.get('/', TvSeriesController.getTvSeries )
router.post('/', TvSeriesController.createTvSeries)
router.get('/:id', TvSeriesController.getTvSeriesById)
router.put('/:id', TvSeriesController.updateTvSeries)
router.delete('/:id', TvSeriesController.deleteTvSeries)

module.exports = router