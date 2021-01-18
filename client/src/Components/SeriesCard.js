import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const DELETE_SERIES = gql`
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

function SeriesCard({series}) {
  const [deleteSeries] = useMutation(DELETE_SERIES)
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  function remove(_id) {
    deleteSeries({
      variables: { _id }
    })
  }

  return (
    <div className="card col-3">
      <div className="card-header">
        <img src={series.poster_path} alt={series.poster_path}></img>
      </div>
      <div className="card-body">
        <p>Type: {series.__typename}</p>
        <p>Title: {series.title}</p>
        <p>Overview: {series.overview}</p>
        <p>Popularity: {series.popularity}</p>
        <p>Tags: {JSON.stringify(series.tags)}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move('/series/'+series._id)}>Detail</button>
        <button className="btn btn-primary" onClick={() => move('/edit-series/'+series._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => remove(series._id)}>Delete</button>
      </div>
    </div>
  )
}

export default SeriesCard
