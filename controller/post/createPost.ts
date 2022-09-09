import { Request, Response } from "express";
import { PostInterface, UserInterface } from '../../interfaces/interfaces';
import { Course, Post, Teacher, User } from "../../models";
import { Section } from '../../models/Section';


export const createPost = async (req: Request, res: Response) => {

    try {

        const { idUser } = req.user!;
        const { description, title, idSection } = req.body;

        const posibleSection = await Section.findByPk(idSection);

        if (!posibleSection) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la sección',
                errors: []
            })
        }

        const createdPost = await Post.create({
            description,
            title,
            idUser,
            idSection
        }) as unknown as PostInterface;

        const relatedUser = await User.findOne({ where: { idUser } }) as unknown as UserInterface;

        const relatedCourse = await Course.findOne({

            include: [
                {
                    model: Section,
                    as: 'sections',
                    where: {
                        idSection
                    },
                }
            ]
        }) as any

        const relatedTeacher = await Teacher.findOne({

            include: [
                {
                    model: Section,
                    as: 'sections',
                    where: {
                        idSection
                    },
                }
            ]
        }) as any



        const user: UserInterface = {
            names: relatedUser.names,
            lastnames: relatedUser.lastnames,
            email: relatedUser.email,
            idStudent: relatedUser.idStudent,
            idUser: relatedUser.idUser
        }

        const post: PostInterface = {
            idPost: createdPost.idPost,
            description: createdPost.description,
            title: createdPost.title,
            createdAt: createdPost.createdAt,
            user,
            relatedCourse,
            relatedTeacher
        }

        res.status(201).json({
            ok: true,
            msg: 'Post creado',
            post,
            errors: []
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en la creación del post',
            errors: []
        })
    }

}