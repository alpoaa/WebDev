const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Person = require('./schemas/person')
const User = require('./schemas/user')

require('dotenv').config()

mongoose.set('strictQuery', false)

console.log('Connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const typeDefs = `
  type Address {
    street: String!
    city: String! 
  }

  enum YesNo {
    YES
    NO
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String!
    ): Person

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addAsFriend(
      name: String!
    ): User
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
`
//default resolver returns like "Person" below if not defining own
//it is also possible define some type (above) field specific and leave other taken case automatically
//Example: defining default values to
//Person: { street: (root) => "Manhattan", city: (root) => "New York" }

const resolvers = {
    Query: {
      personCount: () => Person.collection.countDocuments(),//persons.length,
      allPersons: async(root, args) => {
        if (!args.phone) {
          return Person.find({})
        }

        return Person.find({ phone: {$exists: args.phone === 'YES' } })
      },
      findPerson: async(root, args) => Person.findOne({ name: args.name }),
      me: (root, args, context) => { return context.currentUser }
    },
    Person: {
      address: ({ street, city }) => {
        return {
          street,
          city,
        }
      },
    },
    Mutation: {
      addPerson: async(root, args, context) => {
        const newPerson = new Person({...args})
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }

        try
        {
          await newPerson.save()
          currentUser.friends = currentUser.friends.concat(newPerson)
          await currentUser.save()

        } catch (error) {
          throw new GraphQLError('Saving person failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }

        return newPerson
      },
      editNumber: async(root, args) => {
        const person = await Person.findOne({ name: args.name })
        person.phone = args.phone
        
        try {
          await person.save()
        } catch (error) {
          throw new GraphQLError('Saving number failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }

        return person
      },
      createUser: async(root, args) => {
        const user = new User({ username: args.username })
        
        return user.save()
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
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
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

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
      addAsFriend: async(root, args, { currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          }) 
        }

        const nonFriendAlready = (person) => !currentUser.friends.map(friend => friend._id.toString()).includes(person._id.toString())
        const person = await Person.findOne({ name: args.name })
        if (nonFriendAlready) {
          currentUser.friends = currentUser.friends.concat(person)
        }

        await currentUser.save()
        return currentUser
      }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
  
startStandaloneServer(server, { 
  listen: { port: process.env.PORT },
  context: async({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})