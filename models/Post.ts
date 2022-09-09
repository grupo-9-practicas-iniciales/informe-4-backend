import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Section } from './Section';
import { User } from './User';

export const Post = sequelize.define('Post', {
    idPost: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

// * Foreign key idSection in Post
Section.hasMany(Post, { as: 'relatedSection', foreignKey: 'idSection' });
Post.belongsTo(Section, { foreignKey: 'idSection' });

// * Feorign key idUser in Post
User.hasMany(Post, { as: 'relatedUser', foreignKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'idUser' });

