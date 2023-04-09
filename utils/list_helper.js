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

module.exports = {
  dummy, totalLikes, favoriteBlog
}