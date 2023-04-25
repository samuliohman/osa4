const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const result = await Blog.find({}).populate('user')
    response.json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const user = (await User.find({}))[0]
  const blog = new Blog({ ...request.body, user: user._id })
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

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

blogsRouter.delete('/:id', async (request, response, next) => {
  console.log(request.params.id)
  try {
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