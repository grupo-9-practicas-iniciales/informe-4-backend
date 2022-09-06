import { DataTypes } from 'sequelize'
import sequelize from '../db/config';

export const Post = sequelize.define('Post', {
    idPost: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})