const { test, describe } = require('node:test')
const assert             = require('node:assert')
const listHelper         = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 13,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs  = []
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {

  test('empty list returns zero', () => {
    const blogs  = []
    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 0)
  })

  test('one blog list returns equal of that blog likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    assert.strictEqual(result, 5)
  })

  test('multiple blog list combines correctly all of the blogs likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)

    assert.strictEqual(result, 32)
  })
})

describe('favourite blog', () => {

  test('empty list returns undefined', () => {
    const blogs  = []
    const result = listHelper.favoriteBlog(blogs)

    assert.strictEqual(result, undefined)
  })

  test('one blog list returns the only object existing the list', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    assert.strictEqual(result, listWithOneBlog[0])
  })

  test('multiple blog list gets the correct blog', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)

    assert.strictEqual(result, listWithMultipleBlogs[1])
  })
})

describe('author with most blogs and likes', () => {
  test('author with most blogs', () => {
    const result          = listHelper.mostBlogs(listWithMultipleBlogs)
    const mostBlogsAuthor = {
      author: 'Edsger W. Dijkstra',
      blogCount: 2
    }

    assert.deepStrictEqual(result, mostBlogsAuthor)
  })

  test('author with most likes', () => {
    const result          = listHelper.mostLikes(listWithMultipleBlogs)
    const mostLikedAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 25
    }

    assert.deepStrictEqual(result, mostLikedAuthor)
  })

})