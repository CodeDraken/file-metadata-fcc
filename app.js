const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// 3rd party middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

// routes

module.exports = app
