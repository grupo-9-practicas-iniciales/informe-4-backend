import { DataTypes } from 'sequelize'
import sequelize from "../db/config";

console.log('me ejecute')



export const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastnames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    recoveryToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idStudent: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
})
