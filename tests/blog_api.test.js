const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/blog')
const jwt = require('jsonwebtoken')
mongoose.set('setDefaultsOnInsert', true);

const testUserForToken = {
  id: "64482fd51fee0c383daf3ec5",
  username: "matias2"
}

const testUser = {
  username: "matias2",
  name: "Matias Sassali",
  password: "123123"
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogsObjects = initialBlogs.map(blog => new Blog(blog))
  const saveArray = blogsObjects.map(b => b.save())
  console.log("users:")
  console.log(await User.find({}))
  console.log("blogs:")
  console.log(await Blog.find({}))
  await Promise.all(saveArray)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r._id)
  contents.forEach(c => expect(c).toBeDefined())
})

test('Adding new blog increases the amount of blogs', async () => {
  const newBlog = {
    title: "Cycling",
    author: "123123",
    url: "blogi.net",
    likes: 1250
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdGlhczIiLCJpZCI6IjY0NDgyZmQ1MWZlZTBjMzgzZGFmM2VjNSIsImlhdCI6MTY5ODg1MjM5N30.-CCv-2zgeoTUm4HJ1FBnT_n6KyAU2oPUjBZ7MzoaIYs`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('Default likes must be set to 0', async () => {
  const newBlog = {
    title: "Cycling",
    author: "123123",
    url: "blogi.net"
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  contents.forEach(c => expect(c).toBeDefined())
})

test('Testing bad request', async () => {
  const newBlog1 = { author: "123123", url: "blogi.net" }
  const newBlog2 = { title: "Cycling", author: "123123" }

  await api.post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  await api.post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Deleting one post with id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0]._id
  await api.delete(`/api/blogs/${id}`)
    .expect(204)
  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(initialBlogs.length - 1)
})

test('Deleting post with unknown id', async () => {
  await api.delete(`/api/blogs/5a422bc61b54a67623555555`)
    .expect(404)
  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(initialBlogs.length)
})

test('Updating one post with id', async () => {
  const response = await api.get('/api/blogs')
  const original = response.body[0]
  const newBlog = { ...original, likes: 799 }
  await api.put(`/api/blogs/${original._id}`)
    .send(newBlog)
    .expect(200)
  const response2 = await api.get('/api/blogs')
  expect(response2.body[0].likes).toEqual(799)
})

afterAll(async () => {
  await mongoose.connection.close()
})