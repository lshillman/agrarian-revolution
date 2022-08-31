const { User, Veggie, Request} = require('../models');

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
        user: async (parent, { _id }) => {
            console.log("I'm in the user resolver");
            return await User.find({ _id: _id }).populate({
                path: 'veggies',
                populate: {
                    path: 'requests',
                    populate: 'requestor'
                }
            });
        },
        veggies: async () => {
            return Veggie.find({}).populate('requests').populate({
                path: 'requests',
                populate: 'requestor'
            });
        },
        veggie: async (parent, { _id }) => {
            return Veggie.find({ _id: _id }).populate('requests');
        },
        requests: async (parent) => {
            return Request.find({veggie: parent._id}).populate('requestor');
        }       
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        createVeggie: async (parent, args) => {
            const veggie = await Veggie.create(args);
            await User.findOneAndUpdate(
                {_id: veggie.owner},
                { $addToSet: { veggies: veggie._id }}
            )
            return veggie;
        },
        createRequest: async (parent, args) => {
            const request = await Request.create(args);
            const veggie = await Veggie.findOneAndUpdate(
                {_id: args.veggie},
                { $addToSet: { requests: request._id  } },
                { new: true }
            )
 
            const userToUpdate = await User.findOneAndUpdate(
                {_id: request.requestor._id},
                { $addToSet: { requests: request._id}},
            )
            return request;
        },
        createResponse: async (parent, {_id, content, sender}) => {
            const request = await Request.findOneAndUpdate(
                { _id: _id },
                { $addToSet: { responses: { content: content, sender: sender } },
                  $set: {unreadMessages: true}
                 },
                { new: true },
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
// module.exports = resolvers;