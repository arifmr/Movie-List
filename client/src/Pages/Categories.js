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
     <div className="container card p-0 mt-5 mb-5">
      <div className="card-header text-center d-flex">
        {path === '/movies' ? <h1 className="ml-auto pl-5">Movies</h1>: <h1 className="ml-auto pl-5">Series</h1>}
        <button className="btn btn-primary ml-auto" onClick={() => move()}>{path === '/movies' ? <span>Add Movie</span>: <span>Add Series</span>}</button>
      </div>
      <div className="card-body row justify-content-center">
        {
          path === '/movies' ? data.movies.map(result => <Card key={result._id} data={result} />) : data.series.map(result => <Card key={result._id} data={result} />)
        }
      </div>
     </div>
    </>
  )
}
