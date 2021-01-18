import React from 'react'
import { useHistory, useParams} from 'react-router-dom'

function EditSeries() {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      
    </div>
  )
}

export default EditSeries
