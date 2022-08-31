const { gql } = require('apollo-server-express');
const {resolverMap} = require('./resolvers');

const typeDefs = gql`
    scalar Date

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        location: String!
        coordinates: [Float]
        veggies: [Veggie]
        sent_requests: [Request]
    }

    type Veggie {
        _id: ID!
        type: String!
        owner: User!
        postedDate: Date
        expiredAt: Date
        location: String!
        coordinates: [Float]
        quantity: Int
        description: String
        photo: String
        requests: [Request]
    }

    type Response {
        content: String!,
        sender: User!
        timestamp: Date
    }

    type Request {
        _id: ID!
        veggie: Veggie!
        requestor: User
        content: String!
        unreadMessages: Boolean
        responses: [Response]
    }

    type Query {
        user(_id: String): [User]
        veggies: [Veggie]
        veggie(_id: String): [Veggie]
        requests(_id: String): [Request]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, location: String!, coordinates: [Float]!): User
        createVeggie(type: String!, owner: String!, location: String!,coordinates: [Float]!, photo: String, quantity: Int!, description: String): Veggie
        createRequest(veggie: String, requestor: String, content: String): Request
        createResponse(_id: String, content: String, sender: String): Request
        updateUser(_id: String, email: String, password: String, location: String, coordinates: [Float]): User
        updateVeggie(type: String, owner: String, coordinates: [Float], photo: String, quantity: Int, description: String): Veggie
        deleteVeggie(_id: String): Veggie
        deleteUser(_id: String): User
        deleteRequest(_id: String): Request
    }

`;

module.exports = typeDefs;
