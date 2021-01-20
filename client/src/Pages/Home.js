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
      <div className="container card p-0 mt-5 mb-5">
        <div className="card-header text-center d-flex">
          <h1 className="ml-auto pl-5">Movies</h1>
          <button className="btn btn-primary btn-sm ml-auto" onClick={() => move('/add-movie')}>Add Movie</button>
        </div>
        <div className="card-body row justify-content-center">
          {
            data.movies.map(movie => <Card key={movie._id} data={movie} refetch={refetch} />)
          }
        </div>
      </div>
      <div className="container card p-0 mb-5">
        <div className="card-header text-center d-flex">
          <h1 className="ml-auto pl-5">Series</h1>
          <button className="btn btn-primary ml-auto" onClick={() => move('/add-series')}>Add Series</button>
        </div>
        <div className="card-body row justify-content-center">
          {
            data.series.map(series => <Card key={series._id} data={series} refetch={refetch} />)
          }
        </div>
      </div>
    </>
  )
}

export default Home
