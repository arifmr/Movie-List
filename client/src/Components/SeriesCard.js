import React from 'react'
import { useHistory } from 'react-router-dom'

function SeriesCard({series}) {
  const history = useHistory()

  function move(id) {
    history.push('/series/'+id)
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
        <p>Tags: {series.tags}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move(series._id)}>Detail</button>
      </div>
    </div>
  )
}

export default SeriesCard
