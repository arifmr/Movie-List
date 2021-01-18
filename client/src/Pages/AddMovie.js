import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ADD_MOVIE = gql`
  mutation createMovie($movieAndSeriesInput: newMovie){
    addMovie(newMovie: $movieAndSeriesInput){
      id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

function AddMovie() {
  const [inputMovie, setInputMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: []
  })
  const [ addMovie, { data } ] = useMutation(ADD_MOVIE)

  function handleChange (e) {
    const name = e.target.name
    let value = e.target.value
    if (name === "popularity") {
      value = Number(value)
      if (value === 0) {
        value = ""
      }
    }
    if (name === "tags") {
      value = value.split(',')
    }
    setInputMovie({
      ...inputMovie,
      [name]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    // console.log({ variables: {
    //   newData: inputMovie
    // } })
    addMovie({ variables: {
      newMovie: inputMovie
    } })
    // console.log(data)
  }

  return (
    <div className="container">
      <h1>Add Movie</h1>
      <form onSubmit={e => onSubmit(e)}>
        <label htmlFor="title">Title</label> <br />
        <input onChange={handleChange} name="title" value={inputMovie.title} placeholder="movie title" required /> <br /> <br />
        <label htmlFor="overview">Overview</label> <br />
        <input onChange={handleChange} name="overview" value={inputMovie.overview} placeholder="movie overview" required /> <br /> <br />
        <label htmlFor="poster_path">Poster Path</label> <br />
        <input onChange={handleChange} name="poster_path" value={inputMovie.poster_path} placeholder="movie poster_path" required /> <br /> <br />
        <label htmlFor="popularity">Popularity</label> <br />
        <input type="number" onChange={handleChange} name="popularity" value={inputMovie.popularity} step="0.1" placeholder="movie popularity" required /> <br /> <br />
        <label htmlFor="tags">Tags</label> <br />
        <input onChange={handleChange} name="tags" value={inputMovie.tags} placeholder="movie tags" required /> <br /> <br />
        <input className="btn btn-primary" type="submit" value="Add Movie" />
      </form>
    </div>
  )
}

export default AddMovie
