import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GET_FAVORITES } from '../service/graphql/query'
import Loader from '../Components/Loader'

export default function Favorite() {
  const { loading, error , data } = useQuery(QUERY_GET_FAVORITES)
  console.log(data)

  if (loading) return <Loader />
  if (error) return <div>Error....</div>
  return (
    <div>
      Favorite
      {JSON.stringify(data)}
    </div>
  )
}
