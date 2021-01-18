import React from 'react'
import { useHistory } from 'react-router-dom'

function MovieCard({movie}) {
  const history = useHistory()

  function move(id) {
    history.push('/movies/'+id)
  }
  
  return (
    <div className="card col-3">
      <div className="card-header">
        <img src={movie.poster_path} alt={movie.poster_path}></img>
      </div>
      <div className="card-body">
        <p>Type: {movie.__typename}</p>
        <p>Title: {movie.title}</p>
        <p>Overview: {movie.overview}</p>
        <p>Popularity: {movie.popularity}</p>
        <p>Tags: {movie.tags}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move(movie._id)}>Detail</button>
      </div>
    </div>
  )
}

export default MovieCard
