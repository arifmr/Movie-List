const axios = require('axios')
const urlMovies = 'http://localhost:4001/movies/'
const urlSeries = 'http://localhost:4002/tvseries/'
const Redis = require("ioredis");
const redis = new Redis();

class OrchestratorController {
  static async getAll(req, res) {
    try {
      const cache = await redis.get("orchestrator")
      if (cache) {
        res.status(200).json(JSON.parse(cache))
      } else {
        const Movies = await axios.get(urlMovies)
        const Series = await axios.get(urlSeries)
        const result = {
          Movies: Movies.data,
          Series: Series.data
        }
        await redis.set("orchestrator", JSON.stringify(result))
        res.status(200).json(result)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = OrchestratorController