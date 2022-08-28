const { User, Veggie, Request } = require('../models');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolverMap = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    })
}

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.find({ username: username });
        },
        veggies: async () => {
            return Veggie.find({});
        },
        veggie: async (parent, { _id }) => {
            return Veggie.find({ _id: _id });
        },
        received_requests: async (parent, { _id }) => {
            return Request.find({ veggie: _id });
        },
        sent_requests: async (parent, { _id }) => {
            return Request.find({ requestor: _id });
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        createVeggie: async (parent, args) => {
            const veggie = await Veggie.create(args);
            return veggie;
        },
        createRequest: async (parent, args) => {
            const request = await Request.create(args);
            const veggie = await Veggie.findOneAndUpdate(
                {_id: args.veggie},
                { $addToSet: { requests: request._id  } },
                { new: true }
            )
            return request;
        },
        createResponse: async (parent, {_id, content, sender}) => {
            const request = await Request.findOneAndUpdate(
                { _id: _id },
                { $addToSet: { responses: { content: content, sender: sender } } },
                { new: true }
            );
            return request;
        },
        updateUser: async (parent, args) => {
            const user = await User.findOneAndUpdate(
                { _id: args._id },
                { $set: args },
                { new: true }
            );
            return user;
        },
        updateVeggie: async (parent, args) => {
            const veggie = await Veggie.findOneAndUpdate(
                { _id: args._id },
                { $set: args },
                { new: true }
            );
            return veggie;
        },
        deleteVeggie: async (parent, { _id }) => {
            const veggie = await Veggie.findOneAndDelete(
                { _id },
                { new: true }
            );
            return veggie;
        },
        deleteUser: async (parent, { _id }) => {
            const user = await User.findOneAndDelete(
                { _id },
                { new: true }
            );
            return user;
        },
        deleteRequest: async (parent, { _id }) => {
            const request = await Request.findOneAndDelete(
                { _id },
                { new: true }
            );
            return request;
        }
    }
};

module.exports = {resolvers, resolverMap};