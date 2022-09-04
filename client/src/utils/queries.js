import { gql } from '@apollo/client';

export const QUERY_VEGGIES = gql`
  query veggies {
      veggies {
        _id
        type
        postedDate
        expiredAt
        location
        coordinates
        quantity
        description
        photo
        owner {
          username
        }
        requests {
          content
          timestamp
          requestor {
            username
          }
        }
      }
    }
`;


export const QUERY_USER = gql`
  query user($_id: String!) {
      user(_id: $_id) {
        _id
        veggies {
          _id
          type
          postedDate
          expiredAt
          location
          coordinates
          quantity
          description
          photo
          requests {
            _id
            content
            timestamp
            unreadMessages
            requestor {
              username
            }
            responses {
              content
              sender {
                _id
              }
              timestamp
            }
          }
        }
      }
    }
`;