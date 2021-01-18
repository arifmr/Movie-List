import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ADD_MOVIE = gql`
  mutation createMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!){
    addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

function AddMovie() {
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [poster_path, setPoster_path] = useState("")
  const [popularity, setPopularity] = useState("")
  const [tags, setTags] = useState([])
  const [ addMovie ] = useMutation(ADD_MOVIE)

  function onSubmit(e) {
    e.preventDefault()
    addMovie({ variables: {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }})
  }

  return (
    <div className="container">
      <h1>Add Movie</h1>
      <form onSubmit={e => onSubmit(e)}>
        <label htmlFor="title">Title</label> <br />
        <input onChange={e => setTitle(e.target.value)} name="title" value={title} placeholder="movie title" required /> <br /> <br />
        <label htmlFor="overview">Overview</label> <br />
        <input onChange={e => setOverview(e.target.value)} name="overview" value={overview} placeholder="movie overview" required /> <br /> <br />
        <label htmlFor="poster_path">Poster Path</label> <br />
        <input onChange={e => setPoster_path(e.target.value)} name="poster_path" value={poster_path} placeholder="movie poster_path" required /> <br /> <br />
        <label htmlFor="popularity">Popularity</label> <br />
        <input type="number" onChange={e => setPopularity(Number(e.target.value))} name="popularity" value={popularity} step="0.1" placeholder="movie popularity" required /> <br /> <br />
        <label htmlFor="tags">Tags</label> <br />
        <input onChange={e => setTags(e.target.value.split(','))} name="tags" value={tags} placeholder="movie tags" required /> <br /> <br />
        <input className="btn btn-primary" type="submit" value="Add Movie" />
      </form>
    </div>
  )
}

export default AddMovie
