const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
import { typeDefs as Movies } from './queries/movie'
import { typeDefs as Series } from './queries/series'
