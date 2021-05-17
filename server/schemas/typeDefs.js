const { gql } = require('apollo-server-express');

const typeDefs = gql`
input saveBookInput {
  authors: [String]
  description: String
  bookId: String
  image: String
  title: String
}

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    books: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, bookId: String, image: String, title: String): User
    removeBook(bookId: String!): User
  }
`;

// couldn't get the input type to work, kept throwing a 400 error

module.exports = typeDefs;
