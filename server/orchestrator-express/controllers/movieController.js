const axios = require('axios')
const url = 'http://localhost:4001/movies/'
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
  static async getMovies(req, res) {
    try {
      const cache = await redis.get("movies")
      if (cache) {
        res.status(200).json(JSON.parse(cache))
      } else {
        const result = await axios.get(url)
        await redis.set("movies", JSON.stringify(result.data))
        res.status(200).json(result.data)
      }
    } catch (err) {
      console.log(err) 
    }
  }

  static async getMovieById(req, res) {
    try {
      const result = await axios.get(url+req.params.id)
      res.status(200).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async createMovie(req, res) {
    try {
      const result = await axios.post(url, req.body)
      await redis.del("movies")
      res.status(201).json(result.data)
    } catch (err) {
      console.log(err) 
    }
  }

  static async updateMovie(req, res) {
    try {
      const result = await axios.put(url+req.params.id, req.body)
      await redis.del("movies")
      res.status(201).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const result = await axios.delete(url+req.params.id)
      await redis.del("movies")
      res.status(200).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MovieController