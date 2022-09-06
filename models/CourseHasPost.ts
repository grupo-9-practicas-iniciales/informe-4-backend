import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Course, Post } from './';

export const CourseHasPost = sequelize.define('CourseHasPost', {
    idCourseHasPost: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})

Course.hasMany(CourseHasPost, {
    foreignKey: 'idCourse'
})

Post.hasMany(CourseHasPost, {
    foreignKey: 'idPost'
})