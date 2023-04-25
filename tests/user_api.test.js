const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
mongoose.set('setDefaultsOnInsert', true);

const initialUsers = [
  {
    username: "pate",
    name: "Pate",
    password: "patepate"
  },
  {
    username: "lotta",
    name: "Lotta",
    password: "lotta123"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  const blogsObjects = initialUsers.map(blog => new User(blog))
  const saveArray = blogsObjects.map(b => b.save())
  await Promise.all(saveArray)
})

test('Adding one correctly formatted user', async () => {
  const user = {
    username: "pate3",
    name: "Pate",
    password: "patepate"
  }

  await api.post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(initialUsers.length + 1)
})

test('Adding user with non-unique name', async () => {
  const user = {
    username: "pate",
    name: "Pate",
    password: "patepate"
  }

  await api.post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(initialUsers.length)
})

test('Adding user with too short name', async () => {
  const user = {
    username: "pa",
    name: "Pate",
    password: "patepate"
  }

  await api.post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(initialUsers.length)
})

test('Adding user with too short password', async () => {
  const user = {
    username: "pate3",
    name: "Pate",
    password: "ka"
  }

  await api.post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(initialUsers.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})