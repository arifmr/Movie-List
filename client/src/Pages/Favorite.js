import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GET_FAVORITES } from '../service/graphql/query'
import Loader from '../Components/Loader'
import FavoriteCard from '../Components/FavoriteCard'

export default function Favorite() {
  const { loading, error , data } = useQuery(QUERY_GET_FAVORITES)
   console.log(data.favorite)

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div className="container card mt-5 p-0">
      <div className="card-header">
        <h1>Favorite List</h1>
      </div>
      <div className="card-body row justify-content-center">
        {
          data.favorite.length ? data.favorite.map(fav => <FavoriteCard key={fav._id} data={fav} />) : <h3>You haven't add any movies nor series to favorite</h3>
        }
      </div>
    </div>
  )
}
