const { Schema, model } = require('mongoose');
const Veggie = require('./Veggie');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    sent_requests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Request'
        }
    ]
})

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema)

module.exports = User;
