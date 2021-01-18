import React from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Loader from '../Components/Loader'

const GET_MOVIE_BY_ID = gql`
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

function DetailMovie() {
  const {id} = useParams()
  const { data, error, loading } = useQuery(GET_MOVIE_BY_ID, {
    variables: { _id: id }
  })
  const history = useHistory()

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container card">
      <div className="card-header">
        <img src={data.movie.poster_path} alt={data.movie.poster_path}></img>
      </div>
      <div className="card-body">
        <p>Type: {data.movie.__typename}</p>
        <p>Title: {data.movie.title}</p>
        <p>Overview: {data.movie.overview}</p>
        <p>Popularity: {data.movie.popularity}</p>
        <p>Tags: {data.movie.tags}</p>
      </div>
      <div className="card-footer">
        Footer
      </div>
    </div>
  )
}

export default DetailMovie
