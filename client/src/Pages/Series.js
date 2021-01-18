import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import SeriesCard from '../Components/SeriesCard'
import Loader from '../Components/Loader'

const GET_SERIES = gql`
  query getSeries {
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

function Series() {
  const { data, error, loading } = useQuery(GET_SERIES)
  const history = useHistory()

  function move(url) {
    history.push(url)
  }

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <>
      <h1>Series</h1>
      <button className="btn btn-primary" onClick={() => move('/series/add')}>Add Series</button>
      <div className="row">
        {
          data.series.map(series => <SeriesCard key={series._id} series={series} />)
        }
      </div>
    </>
  )
}

export default Series