import React from 'react'
import { useHistory } from 'react-router-dom'

export default function FavoriteCard(props) {
  const history = useHistory()
  const data = props.data

  function move(id) {
    if (data.__typename === 'Movies') {
      history.push('/movies/'+id)
    } else {
      history.push('/series/'+id)
    }
  }

  return (
    <div className="card col-3 p-0 m-3 shadow">
      <div className="card-header temp p-0">
        <img style={{width: '100%', maxHeight: '350px'}} src={data.poster_path} alt={data.poster_path}></img>
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
      </div>
    </div>
  )
}
