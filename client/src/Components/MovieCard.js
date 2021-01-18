import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const DELETE_MOVIE = gql`
  mutation removeMovie($_id: ID!) {
    deleteMovie(_id: $_id) {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

function MovieCard(props) {
  const movie = props.movie
  const [deleteMovie] = useMutation(DELETE_MOVIE, {onCompleted: () => {
    props.refetch()
  }})
  const history = useHistory()
  
  function move(url) {
    history.push(url)
  }

  function remove(_id) {
    deleteMovie({
      variables: { _id }
    })
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
        <p>Tags: {JSON.stringify(movie.tags)}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move('/movies/'+movie._id)}>Detail</button>
        <button className="btn btn-primary" onClick={() => move('/edit-movie/'+movie._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => remove(movie._id)}>Delete</button>
      </div>
    </div>
  )
}

export default MovieCard
