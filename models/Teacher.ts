import { DataTypes } from 'sequelize'
import sequelize from '../db/config'

export const Teacher = sequelize.define('Teacher', {
    idTeacher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})