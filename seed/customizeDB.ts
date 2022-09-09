import { Course, Post, Section, Teacher, User } from "../models";
import sequelize from '../db/config';


(
    async () => {

        await sequelize.authenticate()

        // * Feorign key idUser in Post
        Post.belongsTo(Section, { as: 'relatedSection', foreignKey: 'idSection' });

        Section.hasMany(Course, { foreignKey: 'idCourse' });
        Section.hasMany(Teacher, { foreignKey: 'idTeacher' });


        Post.sync({ alter: true })
        Section.sync({ alter: true })

    }
)()



