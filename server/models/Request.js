const { Schema, model } = require('mongoose');
const User = require('./User');
// const Veggie = require('./Veggie');


const requestSchema = new Schema({
    veggie: {
        type: Schema.Types.ObjectId,
        ref: 'Veggie'
        // type: Veggie,
        // required: true
    },
    requestor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        maxLength: 280
    },
    unreadMessages: {
        type: Boolean,
        default: false
    },
    responses: [
        {
            content: {
                type: String,
                required: true
            },
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User',
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