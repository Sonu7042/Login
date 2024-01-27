const connectToMongo = require('./db');
const express = require('express')


connectToMongo();
const app = express()
const port = 5000

app.use(express.json())

// Available Routes
app.use('/', require('./auth'))



app.listen(port, () => {
  console.log(`Server is listening...on ${port}`)
})