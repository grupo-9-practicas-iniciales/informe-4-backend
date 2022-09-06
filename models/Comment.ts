import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { User, Post } from './';


export const Comment = sequelize.define('Comment', {
    idComment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT
    }
})

User.hasMany(Comment, {
    foreignKey: 'idUsers'
})

Post.hasMany(Comment, {
    foreignKey: 'idPost'
})