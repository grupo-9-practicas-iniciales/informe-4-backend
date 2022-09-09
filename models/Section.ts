import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Course } from './Course';
import { Teacher } from './Teacher';

export const Section = sequelize.define('Section', {
    idSection: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// * Foreign key idCourse in Section
Course.hasMany(Section, { as: 'sections', foreignKey: 'idCourse' });

// * Foreign key idTeacher in Section
Teacher.hasMany(Section, { as: 'sections', foreignKey: 'idTeacher' });



