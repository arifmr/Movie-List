import React from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Loader from '../Components/Loader'
import Card from '../Components/Card'
import { GET_MOVIE_BY_ID, GET_SERIES_BY_ID } from '../service/graphql/query'

export default function Detail() {
  const {id} = useParams()
  const path = window.location.pathname
  const { data, error, loading } = useQuery(path === '/movies/'+id ? GET_MOVIE_BY_ID : GET_SERIES_BY_ID, {
    variables: { _id: id }
  })
  const history = useHistory()

  function move() {
    history.goBack()
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container card">
      <div className="card-header d-flex">
        <button className="btn btn-outline-secondary col-1" onClick={() => move()}>Back</button>
      </div>
      <Card data={data.movie ? data.movie:data.seriesById} id={id} path={path} />
    </div>
  )
}
