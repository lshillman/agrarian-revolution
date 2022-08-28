const { Schema, model } = require('mongoose');
const Veggie = require('./Veggie');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number]
    },
    veggies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Veggie'
        }
    ],
    requests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Request'
        }
    ]
})

const User = model('User', userSchema)

module.exports = User;
