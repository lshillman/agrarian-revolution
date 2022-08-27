const { Schema, model } = require('mongoose');
const User = require('./User');
const Veggie = require('./Veggie');


const requestSchema = new Schema({
    veggie: {
        type: Veggie,
        required: true
    },
    requestor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        maxLength: 280
    },
    responses: [
        {
            content: {
                type: String,
                required: true
            },
            sender: {
                type: User,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

const Request = model('Request', requestSchema)

module.exports = Request;