import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Loader from '../Components/Loader'
import Card from '../Components/Card'

const GET_ALL = gql`
  query getAll {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    },
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

function Home() {
  const { data, error, loading, refetch } = useQuery(GET_ALL)
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <>
      <h1>Movies</h1>
      <button className="btn btn-primary" onClick={() => move('/add-movie')}>Add Movie</button>
      <div className="row">
        {
          data.movies.map(movie => <Card key={movie._id} data={movie} refetch={refetch} />)
        }
      </div>
      <h1>Series</h1>
      <button className="btn btn-primary" onClick={() => move('/add-series')}>Add Series</button>
      <div className="row">
        {
          data.series.map(series => <Card key={series._id} data={series} refetch={refetch} />)
        }
      </div>
    </>
  )
}

export default Home
