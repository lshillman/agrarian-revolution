const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        location: String!
        coordinates: [Float]
        veggies: [Veggie]
    }

    type Veggie {
        _id: ID!
        type: String!
        owner: User!
        postedDate: Date
        location: String!
        coordinates: [Float]
        quantity: Int
        description: String
        photo: String
        requests: [Request]
    }

    type Request {
        veggie: Veggie!
        requestor: 
        content: String!
        responses: [{
            content: String!
            sender: User!
            timestamp: Date!
        }]
    }

    type Query {
        user(_id: String): [User]
        veggies: [Veggie]
        veggie(_id: String): Veggie
        received_requests(_id: String): [Request]
        sent_requests(_id: String): [Request]
    }

    type Mutation {
        createUser
        createVeggie
        createRequest
        createResponse
        updateUser
        updateVeggie
        deleteVeggie
        deleteUser
        deleteRequest
    }

`;

module.exports = typeDefs;
