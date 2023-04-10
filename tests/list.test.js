const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Blog with most likes', () => {
  test('Most likes of a single blog', () => {
    const temp_blogs = [blogs[0]]

    const result = listHelper.favoriteBlog(temp_blogs)
    expect(result).toEqual(blogs[0])
  })
  test('Most likes of several blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    console.log(result)
    expect(result).toEqual(blogs[2])
  })
  test('Most likes of empty list', () => {
    const temp_blogs = []
    const result = listHelper.favoriteBlog(temp_blogs)
    expect(result).toEqual({})
  })
})

describe('Author with most blogs', () => {
  test('Author with most blogs of a single blog', () => {
    const temp_blogs = [blogs[0]]

    const result = listHelper.mostBlogs(temp_blogs)
    expect(result).toEqual({ author: "Michael Chan", blogs: 1 })
  })
  test('Author with most blogs of several blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })
  test('Author with most blogs of empty list', () => {
    const temp_blogs = []
    const result = listHelper.mostBlogs(temp_blogs)
    expect(result).toEqual({})
  })
})

describe('Total likes of a blog list', () => {
  test('Total likes of a single blog', () => {
    const temp_blogs = [blogs[0]]

    const result = listHelper.totalLikes(temp_blogs)
    expect(result).toBe(7)
  })
  test('Total likes of several blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
  test('Total likes of empty list', () => {
    const temp_blogs = []
    const result = listHelper.totalLikes(temp_blogs)
    expect(result).toBe(0)
  })
})