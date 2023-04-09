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
module.exports = {
  dummy, totalLikes
}