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
          type
          postedDate
          expiredAt
          location
          coordinates
          quantity
          description
          photo
          requests {
            unreadMessages
            requestor {
              username
            }
          }
        }
      }
    }
`;