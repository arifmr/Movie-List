import React, {useState, useEffect} from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import Loader from '../Components/Loader'
import { GET_MOVIE_BY_ID, GET_SERIES_BY_ID, EDIT_MOVIE, EDIT_SERIES } from '../service/graphql/query'

export default function Edit() {
  const {id} = useParams()
  const path = window.location.pathname
  const history = useHistory()
  const { data, error, loading } = useQuery(path === "/edit-movie/"+id ? GET_MOVIE_BY_ID : GET_SERIES_BY_ID, {
    variables: { _id: id }
  })
  const [ editMovie ] = useMutation(EDIT_MOVIE, {onCompleted: () => {
    history.push('/')
  }})
  const [ editSeries ] = useMutation(EDIT_SERIES, {onCompleted: () => {
    history.push('/')
  }})
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [poster_path, setPoster_path] = useState("")
  const [popularity, setPopularity] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (data) {
      if (path === "/edit-movie/"+id) {
        setTitle(data.movie.title)
        setOverview(data.movie.overview)
        setPoster_path(data.movie.poster_path)
        setPopularity(data.movie.popularity)
        setTags(data.movie.tags)
      } else if (data.seriesById) {
        setTitle(data.seriesById.title)
        setOverview(data.seriesById.overview)
        setPoster_path(data.seriesById.poster_path)
        setPopularity(data.seriesById.popularity)
        setTags(data.seriesById.tags)
      }
    }
  }, [data, path, id])

  function onSubmit(e) {
    e.preventDefault()
    const payload = {
      _id: id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    if (data.movie) {
      editMovie({ variables: payload})
    } else {
      editSeries({ variables: payload })
    }
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container">
    {data.movie ? <h1>Edit Movie</h1> : <h1>Edit Series</h1>}
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
      <input className="btn btn-primary" type="submit" value="Edit" />
    </form>
  </div>
  )
}
