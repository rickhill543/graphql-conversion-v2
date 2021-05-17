import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
      bookCount
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
      bookCount
    }
  }
`;
