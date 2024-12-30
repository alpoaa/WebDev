const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, blog) => maxBlog.likes > blog.likes ? maxBlog : blog, blogs[0])
}

const mostBlogs = (blogs) => {
  let authorGroups        = lodash.groupBy(blogs, 'author')
  let authorGroupsOrdered = lodash.orderBy(authorGroups, [(author) => author.length], ['desc'])

  return { author: authorGroupsOrdered[0][0].author, blogCount: authorGroupsOrdered[0].length }
}

const mostLikes = (blogs) => {
  let authorGroups = lodash.groupBy(blogs, 'author')
  let authorLikes  = []

  lodash.forEach(authorGroups, (authorBlogs, authorKey) => {
    authorLikes = lodash.concat(authorLikes, { author: authorKey, likes: totalLikes(authorBlogs) })
  })

  const authorMostLikes = lodash.orderBy(authorLikes, 'likes', 'desc').at(0)

  return authorMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}