const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}
Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 280] }
        },
        sender_id: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id' }
        },
        timestamp: {
            type: DataTypes.DATE,
            default: Date.now()
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'message',
    }
)

class Request extends Model {}
Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        veggie_id: {
            type: DataTypes.INTEGER,
            references: { model: 'veggie', key: 'id' },
        },
        owner_id: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id' },
        },
        requestor_id: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id' },
        },
        ownerUnread: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        requestorUnread: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        timestamp: {
            type: DataTypes.DATE,
            default: Date.now()
        },
        messages: {
            type: [DataTypes.INTEGER],
            allowNull: false,
            references: { model: 'message', key: 'id' },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'request',
    }
);

module.exports = {Request, Message};