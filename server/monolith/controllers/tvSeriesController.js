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
    const {title, overview, poster_path, popularity, tags} = req.body
    const payload = {
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags: tags.split(",")
    }
    TvSeries.create(payload)
      .then(result => {
        res.status(201).json(result.ops)
      })
      .catch(err => console.log(err))
  }

  static updateTvSeries(req, res) {
    const {title, overview, poster_path, popularity, tags} = req.body
    const payload = {
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags: tags.split(",")
    }
    TvSeries.update(payload, req.params.id)
      .then(result => {
        res.status(201).json(payload)
      })
      .catch(err => console.log(err))
  }

  static deleteTvSeries(req, res) {
    TvSeries.remove(req.params.id)
      .then(result => {
        res.status(200).json({message: 'successfully delete data'})
      })
      .catch(err => console.log(err))
  }
}

module.exports = TvSeriesController