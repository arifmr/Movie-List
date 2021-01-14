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
    const {title, overview, poster_path, popularity, tags} = req.body
    const payload = {
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags: tags.split(",")
    }
    try {
      const data = await Movie.create(payload)
      res.status(201).json(data.ops)
    } catch (err) {
      console.log(err) 
    }
  }

  static async updateMovie(req, res) {
    try {
      const {title, overview, poster_path, popularity, tags} = req.body
      const payload = {
        title,
        overview,
        poster_path,
        popularity: +popularity,
        tags: tags.split(",")
      }
      await Movie.update(payload, req.params.id)
      res.status(201).json(payload)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const data = await Movie.remove(req.params.id)
      res.status(200).json({message: "Data Deleted Successfully"})
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieController