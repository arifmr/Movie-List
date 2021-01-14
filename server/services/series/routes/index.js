const express = require('express')
const router = express.Router()
const tvSeriesRouter = require('./tvSeries')

router.use('/tvseries', tvSeriesRouter)

module.exports = router