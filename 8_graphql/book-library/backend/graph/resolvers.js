const { GraphQLError, subscribe } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PubSub } = require('graphql-subscriptions')
const pubSub = new PubSub()

const Book = require('../schemas/book')
const Author = require('../schemas/author')
const User = require('../schemas/user')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
        const { author, genre } = args

        if (!author) {
          if (!genre) {
            return Book.find({}).populate('author')
          } else {
            return Book.find({ genres: {$in: [genre] } }).populate('author')
          }
        }

        const bookAuthor = await Author.findOne({ name: author })

        if (!genre) {
          if (!bookAuthor) {
            throw new GraphQLError('Author not exists', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: author
              }
            })
          }

          return Book.find({ author: bookAuthor._id })
        }

        return Book.find({ author: bookAuthor._id, genres:{ $in: [genre] } }).populate('author')
    },
    allAuthors: async() => {
      return Author.find({})
    },
    me: (root, args, context) => { return context.currentUser }
  },
  Author: {
    bookCount: async(root, args) => {
        return await Book.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async(root, args, context) => {
      const { title, author, published, genres } = args
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const authorExists = await Author.findOne({ name: author })

        if (!authorExists)
        {
          const newAuthor = new Author({ name: author, born: null })
          await newAuthor.save()
        }

        const bookAuthor = await Author.findOne({ name: author })
        const bookExists = await Book.findOne({ title, author: bookAuthor._id })

        if (bookExists) {
          throw new GraphQLError('Book already exists with same author', {
            extensions: {
                code: 'BAD_USER_INPUT',
            }
          })
        }

        const newBook = new Book({ title, author: bookAuthor._id, published, genres })
        await newBook.save()

        pubSub.publish('BOOK_ADDED', { bookAdded: newBook })

        return newBook
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: `${title} & ${author}`,
            error
          }
        })
      }
      
      return null
    },
    editAuthor: async(root, args, context) => {
        const { name, setBornTo } = args
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        
        try {
          const updateAuthor = await Author.findOne({ name })

          if (!updateAuthor) {
            throw new GraphQLError('Author not exists', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          
          updateAuthor.born = setBornTo
          await updateAuthor.save()

          return updateAuthor
        } catch (error) {
          throw new GraphQLError('Editing born year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: name,
              error
            }
          })
        }

        return null
    },
    createUser: async(root, args) => {
      const { username, password, favoriteGenre } = args
      const saltRounds = 10
      const cryptedPassword = await bcrypt.hash(password, saltRounds)

      const newUser = new User({ username, password: cryptedPassword, favoriteGenre })
      return newUser.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        }) 
    },
    login: async(root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })
      const correctPassword = user === null ? false : await bcrypt.compare(password, user.password)

      if (!user || !correctPassword) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60*60 } )}
    }
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubSub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers