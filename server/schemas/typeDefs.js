const { gql } = require('apollo-server-express');
const { resolverMap } = require('./resolvers');

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
        timestamp: Date
        responses: [Response]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(_id: String): [User]
        veggies: [Veggie]
        veggie(_id: String): [Veggie]
        request(_id: String): [Request]
        requests(_id: String): [Request]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!, location: String!, coordinates: [Float]): Auth
        createVeggie(type: String!, owner: String!, location: String!, coordinates: [Float], photo: String, quantity: Int!, description: String): Veggie
        createRequest(veggie: String, requestor: String, content: String): Request
        createResponse(_id: String!, content: String!, sender: String!): Request
        updateUser(_id: String, email: String, password: String, location: String, coordinates: [Float]): User
        updateVeggie(_id: String!, type: String, owner: String, coordinates: [Float], photo: String, quantity: Int, description: String): Veggie
        deleteVeggie(_id: String): Veggie
        deleteUser(_id: String): User
        deleteRequest(_id: String): Request
    }

`;

module.exports = typeDefs;
