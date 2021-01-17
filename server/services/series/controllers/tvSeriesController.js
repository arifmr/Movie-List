const { TvSeries } = require('../models')

class TvSeriesController {
  static getTvSeries(req, res) {
    TvSeries.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => console.log(err))
  }

  static getTvSeriesById(req, res) {
    TvSeries.findOne(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static createTvSeries(req, res) {
    TvSeries.create(req.body)
      .then(result => {
        res.status(201).json(result.ops[0])
      })
      .catch(err => console.log(err))
  }

  static updateTvSeries(req, res) {
    TvSeries.update(req.body, req.params.id)
      .then(result => {
        res.status(201).json(result.value)
      })
      .catch(err => console.log(err))
  }

  static deleteTvSeries(req, res) {
    TvSeries.remove(req.params.id)
      .then(result => {
        res.status(200).json(result.value)
      })
      .catch(err => console.log(err))
  }
}

module.exports = TvSeriesController