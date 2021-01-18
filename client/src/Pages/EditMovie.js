import React, {useState, useEffect} from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'
import Loader from '../Components/Loader'

const GET_MOVIE_BY_ID = gql`
  query getMovie($_id: ID!) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
const EDIT_MOVIE = gql`
  mutation putMovie($_id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]!) {
    updateMovie(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

function EditMovie() {
  const {id} = useParams()
  const history = useHistory()
  const { data, error, loading } = useQuery(GET_MOVIE_BY_ID, {
    variables: { _id: id }
  })
  const [ editMovie ] = useMutation(EDIT_MOVIE, {onCompleted: () => {
    history.push('/')
  }})
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [poster_path, setPoster_path] = useState("")
  const [popularity, setPopularity] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (data) {
      setTitle(data.movie.title)
      setOverview(data.movie.overview)
      setPoster_path(data.movie.poster_path)
      setPopularity(data.movie.popularity)
      setTags(data.movie.tags)
    }
  }, [data])

  function onSubmit(e) {
    console.log('masuk')
    e.preventDefault()
    editMovie({ variables: {
      _id: id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }})
  }
  if (loading || !data.movie) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container">
    <h1>Edit Movie</h1>
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
      <input className="btn btn-primary" type="submit" value="Edit Movie" />
    </form>
  </div>
  )
}

export default EditMovie
