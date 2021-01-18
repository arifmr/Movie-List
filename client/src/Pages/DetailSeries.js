import React from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Loader from '../Components/Loader'

const GET_SERIES_BY_ID = gql`
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

function DetailSeries() {
  const {id} = useParams()
  const { data, error, loading } = useQuery(GET_SERIES_BY_ID, {
    variables: { _id: id }
  })
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container card">
      <div className="card-header">
        <img src={data.seriesById.poster_path} alt={data.seriesById.poster_path}></img>
      </div>
      <div className="card-body">
        <p>Type: {data.seriesById.__typename}</p>
        <p>Title: {data.seriesById.title}</p>
        <p>Overview: {data.seriesById.overview}</p>
        <p>Popularity: {data.seriesById.popularity}</p>
        <p>Tags: {data.seriesById.tags}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move('/series')}>Back</button>
      </div>
    </div>
  )
}

export default DetailSeries
