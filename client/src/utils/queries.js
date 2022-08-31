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