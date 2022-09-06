import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Teacher, Post } from './';

export const PostHasTeacher = sequelize.define('PostHasTeacher', {
    idPostHasTeacher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})

Teacher.hasMany(PostHasTeacher, {
    foreignKey: 'idTeacher'
})

Post.hasMany(PostHasTeacher, {
    foreignKey: 'idPost'
})