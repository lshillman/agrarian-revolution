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
        createUser(username: String!, email: String!, password: String!, location: String!, coordinates: [Number]!)
        createVeggie(type: String!, owner: Schema.Types.ObjectId!, coordinates: [Number]!, photo: String, quantity: Number!, description: String)
        createRequest(veggie: Schema.Types.ObjectId, requestor: Schema.Types.ObjectId, content: String)
        createResponse(content: String, sender: Schema.Types.ObjectId)
        updateUser(email: String, password: String, location: String, coordinates: [Number])
        updateVeggie(type: String, owner: Schema.Types.ObjectId, coordinates: [Number], photo: String, quantity: Number, description: String)
        deleteVeggie(_id: Schema.Types.ObjectId)
        deleteUser(_id: Schema.Types.ObjectId)
        deleteRequest(_id: Schema.Types.ObjectId)
    }

`;

module.exports = typeDefs;
