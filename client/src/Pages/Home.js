import React from 'react'
import { useHistory } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import SeriesCard from '../Components/SeriesCard'
import { gql, useQuery } from '@apollo/client'
import Loader from '../Components/Loader'

const GET_ALL = gql`
  query getAll {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    },
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

function Home() {
  const { data, error, loading, refetch } = useQuery(GET_ALL)
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <>
      <h1>Movies</h1>
      <button className="btn btn-primary" onClick={() => move('/movies/add')}>Add Movie</button>
      <div className="row">
        {
          data.movies.map(movie => <MovieCard key={movie._id} movie={movie} />)
        }
      </div>
      <h1>Series</h1>
      <button className="btn btn-primary" onClick={() => move('/series/add')}>Add Series</button>
      <div className="row">
        {
          data.series.map(series => <SeriesCard key={series._id} series={series} />)
        }
      </div>
    </>
  )
}

export default Home
