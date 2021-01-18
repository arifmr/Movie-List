const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = 'http://localhost:4001/movies/'
const urlSeries = 'http://localhost:4002/tvseries/'

const typeDefs = gql`
  type Query {
      movies: [Movies]
      series: [Series]
      movie(_id: ID!): Movies
      seriesById(_id: ID!): Series
  }

  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieAndSeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    addMovie(newMovie: MovieAndSeriesInput): Movies
    updateMovie(_id: ID!, updatedMovie: MovieAndSeriesInput): Movies
    deleteMovie(_id: ID!): Movies
    addSeries(newSeries: MovieAndSeriesInput): Series
    updateSeries(_id: ID!, updatedSeries: MovieAndSeriesInput): Series
    deleteSeries(_id: ID!): Series
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const cache = await redis.get("movies")
      try {
        if (cache) {
          return JSON.parse(cache)
        } else {
          const result = await axios.get(urlMovies)
          await redis.set("movies", JSON.stringify(result.data))
          return result.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    movie: async (_, args) => {
      try {
        const result = await axios.get(urlMovies+args._id)
        return result.data
      } catch (err) {
        console.log(err)
      }
    },
    series: async () => {
      const cache = await redis.get("series")
      try {
        if (cache) {
          return JSON.parse(cache)
        } else {
          const result = await axios.get(urlSeries)
          await redis.set("series", JSON.stringify(result.data))
          return result.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    seriesById: async (_, args) => {
      try {
        const result = await axios.get(urlSeries+args._id)
        return result.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      console.log('masuk')
      try {
        const payload = {
          title: args.newMovie.title,
          overview: args.newMovie.overview,
          poster_path: args.newMovie.poster_path,
          popularity: args.newMovie.popularity,
          tags: args.newMovie.tags
        }
        const newMovie = await axios.post(urlMovies, payload)
        await redis.del("movies")
        return newMovie.data
      } catch (err) {
        console.log(err)
      }
    },
    updateMovie: async (_, args) => {
      try {
        const payload = {
          title: args.updatedMovie.title,
          overview: args.updatedMovie.overview,
          poster_path: args.updatedMovie.poster_path,
          popularity: args.updatedMovie.popularity,
          tags: args.updatedMovie.tags
        }
        const updatedMovie = await axios.put(urlMovies+args._id, payload)
        await redis.del("movies")
        return updatedMovie.data
      } catch (err) {
        console.log(err)
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const deletedMovie = await axios.delete(urlMovies+args._id)
        await redis.del("movies")
        return deletedMovie.data
      } catch (err) {
        console.log(err)
      }
    },
    addSeries: async (_, args) => {
      try {
        const payload = {
          title: args.newSeries.title,
          overview: args.newSeries.overview,
          poster_path: args.newSeries.poster_path,
          popularity: args.newSeries.popularity,
          tags: args.newSeries.tags
        }
        const newSeries = await axios.post(urlSeries, payload)
        await redis.del("series")
        return newSeries.data 
      } catch (err) {
        console.log(err)
      }
    },
    updateSeries: async (_, args) => {
      try {
        const payload = {
          title: args.updatedSeries.title,
          overview: args.updatedSeries.overview,
          poster_path: args.updatedSeries.poster_path,
          popularity: args.updatedSeries.popularity,
          tags: args.updatedSeries.tags
        }
        const updatedSeries = await axios.put(urlSeries+args._id, payload)
        await redis.del("series")
        return updatedSeries.data
      } catch (err) {
        console.log(err)
      }
    },
    deleteSeries: async (_, args) => {
      try {
        const deletedSeries = await axios.delete(urlSeries+args._id)
        await redis.del("series")
        return deletedSeries.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});