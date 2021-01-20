import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { DELETE_MOVIE, DELETE_SERIES } from '../service/graphql/query'
import { favorites } from '../cache/index'

export default function Card(props) {
  const [deleteMovie] = useMutation(DELETE_MOVIE, {onCompleted: () => {
    props.refetch()
  }})
  const [deleteSeries] = useMutation(DELETE_SERIES, {onCompleted: () => {
    props.refetch()
  }})
  const history = useHistory()
  const data = props.data

  function move(id) {
    if (data.__typename === 'Movies') {
      history.push('/movies/'+id)
    } else {
      history.push('/series/'+id)
    }
  }

  function toEdit(id) {
    if (data.__typename === 'Movies') {
      history.push('/edit-movie/'+id)
    } else {
      history.push('/edit-series/'+id)
    }
  }

  function remove(_id) {
    if (data.__typename === 'Movies') {
      deleteMovie({
        variables: { _id }
      })
    } else {
      deleteSeries({
        variables: { _id }
      })
    }
  }

  function addToFav(data) {
    favorites([...favorites(), data])
    console.log('keklik')
    // favorites().concat(data)
  }

  if (props.path) {
    return (
      <div className="card">
        <img src={data.poster_path} alt={data.poster_path}></img>
        <p>Type: {data.__typename}</p>
        <p>Title: {data.title}</p>
        <p>Overview: {data.overview}</p>
        <p>Popularity: {data.popularity}</p>
        <p>Tags: {JSON.stringify(data.tags)}</p>
    </div>
    )
  }

  return (
    <div className="card col-3">
      <div className="card-header">
        <img src={data.poster_path} alt={data.poster_path}></img>
      </div>
      <div className="card-body">
        <p>Title: {data.title}</p>
        <p>Popularity: {data.popularity}</p>
        <p>Tags: {JSON.stringify(data.tags)}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => move(data._id)}>Detail</button>
        <button className="btn btn-primary" onClick={() => toEdit(data._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => remove(data._id)}>Delete</button>
        <button className="btn btn-primary" onClick={() => addToFav(data)}>Add To Favorite</button>
      </div>
    </div>
  )
}
