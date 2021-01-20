import React from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Card from '../Components/Card'
import Loader from '../Components/Loader'
import { GET_MOVIES, GET_SERIES } from '../service/graphql/query'

export default function Categories() {
  const path = window.location.pathname
  const { data, error, loading } = useQuery(path === '/movies' ? GET_MOVIES : GET_SERIES)
  const history = useHistory()

  function move() {
    if (path === '/movies') {
      history.push('/add-movie')
    } else {
      history.push('/add-series')
    }
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <>
      {path === '/movies' ? <h1>Movies</h1>: <h1>Series</h1>}
      <button className="btn btn-primary" onClick={() => move()}>{path === '/movies' ? <span>Add Movie</span>: <span>Add Series</span>}</button>
      <div className="row">
        {
          path === '/movies' ? data.movies.map(result => <Card key={result._id} data={result} />) : data.series.map(result => <Card key={result._id} data={result} />)
        }
      </div>
    </>
  )
}
