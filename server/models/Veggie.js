const { Schema, model } = require('mongoose');
const User = require('./User');

const veggieSchema = new Schema ({
    type: {
        type: String,
        required: true
    },
    owner: {
        type: User
    },
    postedDate: {
        type: Date,
        default: Date.now()
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
        type: Number
    },
    description: {
        type: String,
        maxLength: 280
    }
    
});

const Veggie = model('Veggie', veggieSchema)

module.exports = Veggie;