import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { DELETE_MOVIE, DELETE_SERIES } from '../service/graphql/query'
import { favorites } from '../cache'

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
    if (!favorites().length) {
      favorites([...favorites(), data])
    } else {
      for(let index = 0; index < favorites().length; index++) {
        if (favorites()[index] === data) {
          break
        } else if (favorites()[index] !== data && index === favorites().length-1) {
          favorites([...favorites(), data])
        }
      }
    }
  }

  if (props.path) {
    return (
      <div className="d-flex m-3">
        <div className="col card">
          <img src={data.poster_path} alt={data.poster_path}></img>
        </div>
        <div className="col card">
          <div className="card-header">
            <h1>{data.title}</h1>
          </div>
          <div className="card-body justify-content-center">
            <h3>{data.__typename}</h3>
            <h3 className="mt-5">{data.overview}</h3>
            <h3 className="mt-5">Popularity: {data.popularity}</h3>
            <h3 className="mt-5">
              {
                data.tags.map(tag => <b key={tag}>{tag}</b>)
              }
            </h3>
          </div>
        </div>
    </div>
    )
  }

  return (
    <div className="card col-3 p-0 m-3 shadow">
      <div className="card-header temp p-0">
        <img className="image" style={{width: '100%', maxHeight: '350px'}} src={data.poster_path} alt={data.poster_path}></img>
        <div className="middle">
          <button className="btn-fav btn btn-primary" onClick={() => addToFav(data)}>Add To Favorite</button>
        </div>
      </div>
      <div className="card-body">
        <h3>{data.title}</h3>
        <p>Popularity: {data.popularity}</p>
        <p>
          {
            data.tags.map(tag => <b key={tag}>{tag}</b>)
          }
        </p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary btn-sm m-1" onClick={() => move(data._id)}>Detail</button>
        <button className="btn btn-primary btn-sm m-1" onClick={() => toEdit(data._id)}>Edit</button>
        <button className="btn btn-danger btn-sm m-1" onClick={() => remove(data._id)}>Delete</button>
      </div>
    </div>
  )
}
