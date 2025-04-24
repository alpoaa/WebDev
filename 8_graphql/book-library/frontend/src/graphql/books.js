import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        author {
            name
            born
        }
        published
        genres
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
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
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            id
            title
            published
            genres
        }
    }
`