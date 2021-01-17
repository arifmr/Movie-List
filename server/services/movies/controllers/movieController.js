const { Movie } = require('../models')

class MovieController {
  static async getMovies(req, res) {
    try {
      const data = await Movie.find()
      res.status(200).json(data)
    } catch (err) {
     console.log(err) 
    }
  }

  static async getMovieById(req, res) {
    try {
      const data = await Movie.findOne(req.params.id)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async createMovie(req, res) {
    try {
      const data = await Movie.create(req.body)
      res.status(201).json(data.ops[0])
    } catch (err) {
      console.log(err) 
    }
  }

  static async updateMovie(req, res) {
    try {
      const data = await Movie.update(req.body, req.params.id)
      res.status(201).json(data.value)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const data = await Movie.remove(req.params.id)
      res.status(200).json(data.value)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieController