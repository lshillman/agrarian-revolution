const { Schema, model } = require('mongoose');
const User = require('./User');
const Request = require('./Request');

const veggieSchema = new Schema ({
    type: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postedDate: {
        type: Date,
        default: Date.now()
    },
    expiredAt: {
        type: Date,
        default: postedDate + 604800
    },
    location: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number]
    },
    photo: {
        type: String
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    },
    description: {
        type: String,
        maxLength: 280
    },
    requests: [Request]
});

const Veggie = model('Veggie', veggieSchema)

module.exports = Veggie;