import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Post } from './';


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


// * Foreign key idPost in Comment
Post.hasMany(Comment, { as: 'relatedPost', foreignKey: 'idPost' });