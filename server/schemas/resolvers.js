const { User, Veggie, Request } = require('../models');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const { signToken } = require('../utils/auth');
const axios = require('axios');

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
            return User.find({ _id: _id }).populate({
                path: 'veggies',
                populate: {
                    path: 'requests',
                    populate: 'requestor'
                }
            }).populate('sent_requests').exec();
        },
        veggies: async () => {
            const veggie = Veggie.find({}).populate({
                path: 'requests',
                populate: 'requestor'
            }).populate('owner').exec();

            return veggie
        },
        veggie: async (parent, { _id }) => {
            return Veggie.find({ _id: _id }).populate('requests').exec();
        },
        requests: async (parent) => {
            return Request.find({ veggie: parent._id }).populate('requestor').exec();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                const response = await axios.get(`https://api.geocod.io/v1.7/geocode?api_key=408c538819a6c917135611465117c73100c9b41&q=${args.location}`)

                const data = await response.data;
                const coordinates = [data.results[0].location.lat, data.results[0].location.lng];

                const user = await User.create({ ...args, coordinates: coordinates });
                const token = await signToken(user);
                return { user, token };

            } catch (e) {
                console.error(e)
            }
        },
        createVeggie: async (parent, args) => {
            try {
                console.log("in the server")
                console.log(args)
                const veggie = await Veggie.create(args);
                await User.findOneAndUpdate(
                    { _id: veggie.owner },
                    { $addToSet: { veggies: veggie._id } }
                )
                return veggie;
            } catch (e) {
                console.error(e)
            }
        },
        createRequest: async (parent, args) => {
            const request = await Request.create(args);
            const veggie = await Veggie.findOneAndUpdate(
                { _id: args.veggie },
                { $addToSet: { requests: request._id } },
                { new: true }
            )

            const userToUpdate = await User.findOneAndUpdate(
                { _id: request.requestor._id },
                { $addToSet: { sent_requests: request._id } },
            )
            return request;
        },
        createResponse: async (parent, { _id, content, sender }) => {
            const request = await Request.findOneAndUpdate(
                { _id: _id },
                {
                    $addToSet: { responses: { content: content, sender: sender } },
                    $set: { unreadMessages: true }
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
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = { resolvers, resolverMap };
// module.exports = resolvers;