import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
    }
  }
`

export const USER = gql`
    query {
        me {
            username
            id
            favoriteGenre
        }
    }
`