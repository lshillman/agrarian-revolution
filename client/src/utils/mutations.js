import { gql } from '@apollo/client';



export const CREATE_USER = gql`
mutation createUser($email: String!, $password: String!, $location: String!, $coordinates: [Float], $username: String!) {
    createUser(email: $email, password: $password, location: $location, coordinates: $coordinates, username: $username) {
      token
      user {
        username
        email
        password
        location
        coordinates
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;