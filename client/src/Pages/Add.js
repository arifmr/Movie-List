import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, ADD_SERIES } from '../service/graphql/query'

export default function Add() {
  const path = window.location.pathname
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [poster_path, setPoster_path] = useState("")
  const [popularity, setPopularity] = useState("")
  const [tags, setTags] = useState([])
  const [ addMovie ] = useMutation(ADD_MOVIE, {onCompleted: () => {
    history.push('/')
  }})
  const [ addSeries ] = useMutation(ADD_SERIES, {onCompleted: () => {
    history.push('/')
  }})

  console.log(path)

  function onSubmit(e) {
    e.preventDefault()
    const payload = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    if (path === "/add-movie") {
      addMovie({ variables: payload})
    } else {
      addSeries({ variables: payload})
    }
  }

  return (
    <div className="container">
      {path === "/add-movie" ? <h1>Add Movie</h1>:<h1>Add Series</h1>}
      <form onSubmit={e => onSubmit(e)}>
        <label htmlFor="title">Title</label> <br />
        <input onChange={e => setTitle(e.target.value)} name="title" value={title} placeholder="title" required /> <br /> <br />
        <label htmlFor="overview">Overview</label> <br />
        <input onChange={e => setOverview(e.target.value)} name="overview" value={overview} placeholder="overview" required /> <br /> <br />
        <label htmlFor="poster_path">Poster Path</label> <br />
        <input onChange={e => setPoster_path(e.target.value)} name="poster_path" value={poster_path} placeholder="poster_path" required /> <br /> <br />
        <label htmlFor="popularity">Popularity</label> <br />
        <input type="number" onChange={e => setPopularity(Number(e.target.value))} name="popularity" value={popularity} step="0.1" placeholder="popularity" required /> <br /> <br />
        <label htmlFor="tags">Tags</label> <br />
        <input onChange={e => setTags(e.target.value.split(','))} name="tags" value={tags} placeholder="tags" required /> <br /> <br />
        <input className="btn btn-primary" type="submit" value="Add Data" />
      </form>
    </div>
  )
}
