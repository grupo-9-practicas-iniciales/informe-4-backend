import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Course, Teacher } from './';

export const CourseSection = sequelize.define('CourseSection', {
    idCourseSection: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Course.hasMany(CourseSection, {
    foreignKey: 'idCourse'
})

Teacher.hasMany(CourseSection, {
    foreignKey: 'idTeacher'
})