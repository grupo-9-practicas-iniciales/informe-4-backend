import { DataTypes } from 'sequelize'
import sequelize from '../db/config'


export const Course = sequelize.define('Course', {
    idCourse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})