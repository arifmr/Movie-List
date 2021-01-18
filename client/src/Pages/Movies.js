import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import Loader from '../Components/Loader'

const GET_MOVIES = gql`
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

function Movies() {
  const { data, error, loading } = useQuery(GET_MOVIES)
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <>
      <h1>Movies</h1>
      <button className="btn btn-primary" onClick={() => move('/add-movies')}>Add Movie</button>
      <div className="row">
        {
          data.movies.map(movie => <MovieCard key={movie._id} movie={movie} />)
        }
      </div>
    </>
  )
}

export default Movies
