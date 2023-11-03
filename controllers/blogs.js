const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const result = await Blog.find({}).populate('user')
    response.json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user
    const blog = new Blog({ ...body, user: user._id })
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  console.log(request.body)

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog === null) {
      return response.status(404).end()
    }

    const creator = await User.findById(blog.user.toString())
    if (creator._id.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: 'Creator of blog is not you.' })
    }

    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter