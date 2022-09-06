import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { User, Course } from './';

export const UserAprovedCourse = sequelize.define('UserAprovedCourse', {
    idAprovedCourse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

User.hasMany(UserAprovedCourse, {
    foreignKey: 'idUser'
})

Course.hasMany(UserAprovedCourse, {
    foreignKey: 'idCourse'
})