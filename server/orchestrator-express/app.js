const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(4000, () => {
  console.log(`MongoDB is coming bois`)
})