const axios = require('axios')
const url = 'http://localhost:4002/tvseries/'
const Redis = require("ioredis");
const redis = new Redis();

class TvSeriesController {
  static async getTvSeries(req, res) {
    try {
      const cache = await redis.get("series")
      if (cache) {
        res.status(200).json(JSON.parse(cache))
      } else {
        const result = await axios.get(url)
        await redis.set("series", JSON.stringify(result.data))
        res.status(200).json(result.data)
      }
    } catch (err) {
      console.log(err) 
    }
  }

  static async getTvSeriesById(req, res) {
    try {
      const result = await axios.get(url+req.params.id)
      res.status(200).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async createTvSeries(req, res) {
    try {
      const result = await axios.post(url, req.body)
      await redis.del("series")
      res.status(201).json(result.data)
    } catch (err) {
      console.log(err) 
    }
  }

  static async updateTvSeries(req, res) {
    try {
      const result = await axios.put(url+req.params.id, req.body)
      await redis.del("series")
      res.status(201).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteTvSeries(req, res) {
    try {
      const result = await axios.delete(url+req.params.id)
      await redis.del("series")
      res.status(200).json(result.data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = TvSeriesController