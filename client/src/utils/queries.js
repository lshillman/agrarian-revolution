import { gql } from '@apollo/client';

export const QUERY_VEGGIES = gql`
  query veggies {
      veggies {
        _id
        type
        postedDate
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

export const QUERY_SINGLE_VEGGIE = gql`
  query veggie($_id: String) {
      veggie(_id: $_id) {
        _id
        type
        postedDate
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

export const QUERY_REQUEST = gql`
    query request($_id: String) {
      request(_id: $_id) {
        veggie {
          _id
          type
          postedDate
          location
          coordinates
          quantity
          description
          photo
          owner {
            _id
            username
          }
        }
        requestor {
          _id
          username
        }
        content
        unreadMessages
        timestamp
        responses {
          content
          sender {
            _id
            username
          }
          timestamp
        }
      }
    }
`

export const QUERY_USER = gql`
  query user($_id: String!) {
      user(_id: $_id) {
        _id
        sent_requests {
          _id
          content
          veggie {
            type
            photo
            description
            postedDate
            owner {
              _id
              username
            }
          }
          timestamp
          responses {
            content
            sender {
              _id
            }
            timestamp
          }
        }
        veggies {
          _id
          type
          postedDate
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
              _id
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