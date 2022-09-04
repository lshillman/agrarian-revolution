import { gql } from '@apollo/client';

export const CREATE_VEGGIE = gql`
mutation createVeggie($type: String!, $owner: String!, $location: String!, $quantity: Int!, $description: String, $photo: String, $coordinates: [Float]) {
  createVeggie(type: $type, owner: $owner, location: $location, quantity: $quantity, description: $description, photo: $photo, coordinates: $coordinates){
      _id
      type
  }
}
`;

export const DELETE_VEGGIE = gql`
mutation deleteVeggie($_id: String) {
  deleteVeggie(_id: $_id){
      _id
  }
}
`;

export const CREATE_REQUEST = gql`
  mutation createRequest($veggie: String, $content: String, $requestor: String) {
    createRequest(veggie: $veggie, content: $content, requestor: $requestor) {
      _id
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation createResponse($_id: String!, $content: String!, $sender: String!) {
    createResponse(_id: $_id, content: $content, sender: $sender) {
      responses {
        content
        sender {
          _id
        }
        timestamp
      }
    }
  }
`;


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
        email
        password
        location
        coordinates
      }
    }
  }
`;