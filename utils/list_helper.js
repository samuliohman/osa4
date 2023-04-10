var lodash = require('lodash');

const dummy = () => {
  // ...
  return 1
}
const totalLikes = (blogs) => {
  const sum = blogs.reduce(
    (a, b) => a + b.likes,
    0
  )
  return blogs.length === 0 ? 0 : sum
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce(
    (a, b) => a.likes >= b.likes ? a : b,
    blogs[0]
  )
  return blogs.length !== 0 ? mostLikes : {}
}

const mostBlogs = (blogs) => {
  const partitions = Object.values(lodash.groupBy(blogs, blog => blog.author))
  const maxPartition = lodash.maxBy(partitions, part => part.length)
  return blogs.length === 0 ? {} : { author: maxPartition[0].author, blogs: maxPartition.length }
}

const mostLikes = (blogs) => {
  var partitions = lodash.groupBy(blogs, blog => blog.author)
  Object.keys(partitions)
    .forEach(key => partitions[key] =
      partitions[key].reduce(
        (oldLikes, newElement) => oldLikes + newElement.likes,
        0
      ))

  const keyWithHighestValue = Object.keys(partitions).reduce(
    (oldKey, newKey) => partitions[newKey] >= partitions[oldKey] ? newKey : oldKey,
    Object.keys(partitions)[0]
  )

  return blogs.length === 0 ?
    {} :
    { author: keyWithHighestValue, likes: partitions[keyWithHighestValue] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}