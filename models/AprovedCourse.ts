import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Course } from './Course';
import { User } from './User';

export const AprovedCourse = sequelize.define('AprovedCourse', {
    idAprovedCourse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

// * Foreign key idUser in UserAprovedCourse
User.hasMany(AprovedCourse, { as: 'aprovedCourses', foreignKey: 'idUser' });

// * Foreign key idCourse in UserAprovedCourse
Course.hasMany(AprovedCourse, { as: 'aprovedCourses', foreignKey: 'idCourse' });
