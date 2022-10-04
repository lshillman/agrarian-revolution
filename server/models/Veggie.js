const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Veggie extends Model {}

Veggie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'user', key: 'id' },
        },
        postedDate: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coordinates: {
            type: [DataTypes.FLOAT],
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 280] }
        },
        requests: {
            type: DataTypes.INTEGER,
            references: {
                model: 'request',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'veggie',
    }
);

module.exports = Veggie;