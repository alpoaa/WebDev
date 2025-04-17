import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
                born
            }
            id
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            published
            id
            genres
        }
    }
`

export const FIND_BOOK_GENRE = gql`
    query allBooksWithGenre($genre: String) {
        allBooks(genre: $genre) {
            id
            title
            published
            author {
                name
            }
        }
    }
`