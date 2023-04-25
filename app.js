const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const errorHandler = require('./utils/middleware.js')
const usersRouter = require('./controllers/users')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)


mongoose.connect(config.MONGODB_URI)

module.exports = app