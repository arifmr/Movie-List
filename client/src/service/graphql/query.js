import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query getMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES = gql`
  query getSeries {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIE_BY_ID = gql`
  query getMovie($_id: ID!) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES_BY_ID = gql`
  query getSeries($_id: ID!) {
    seriesById(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation createMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!){
    addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_SERIES = gql`
  mutation createSeries($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!){
    addSeries(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation putMovie($_id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!) {
    updateMovie(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const EDIT_SERIES = gql`
  mutation putSeries($_id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!) {
    updateSeries(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation removeMovie($_id: ID!) {
    deleteMovie(_id: $_id) {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export const DELETE_SERIES = gql`
  mutation removeSeries($_id: ID!) {
    deleteSeries(_id: $_id) {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export const QUERY_GET_FAVORITES = gql`
  query GetFavoritesItem {
    favoritesItem @client
  }
`