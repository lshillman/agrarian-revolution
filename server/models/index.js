const User = require('./User');
const Veggie = require('./Veggie');
const {Request, Message} = require('./Request');

User.hasMany(Veggie, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Veggie.belongsTo(User, {
    foreignKey: 'user_id'
});

Veggie.hasMany(Request, {
    foreignKey: 'veggie_id',
    onDelete: 'CASCADE'
});

Request.belongsTo(Veggie, {
    foreignKey: 'veggie_id'
});

User.hasMany(Request, {
    foreignKey: 'requestor_id',
    onDelete: 'SET NULL'
});

User.hasMany(Request, {
    foreignKey: 'owner_id',
    onDelete: 'SET NULL'
});

Request.belongsTo(User, {
    foreignKey: 'requestor_id'
});

Request.belongsTo(User, {
    foreignKey: 'owner_id'
});

Request.hasMany(Message, {
    foreignKey: 'message_id'
})

module.exports = { User, Veggie, Request };