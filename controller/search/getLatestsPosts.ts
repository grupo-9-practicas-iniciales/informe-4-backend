import { Request, Response } from "express";
import { Course, Post, Section, Teacher, User } from "../../models";
import { PostInterface } from '../../interfaces/interfaces';

export const getLatestsPosts = async (req: Request, res: Response) => {

    const posts = await Post.findAll({
        include: [{
            model: User,
            attributes: ['idUser', 'names', 'lastnames', 'email']
        },
        {
            model: Section,
            include: [{
                model: Teacher,
            }, {
                model: Course,
            }]
        }],
        order: [
            ['createdAt', 'DESC']
        ],
    }) as any

    const formatedPosts: PostInterface[] = await Promise.all(
        posts.map(async (post: any) => {


            const teacher = await Teacher.findByPk(post.Section.idTeacher, {
                attributes: ['idTeacher', 'name']
            });
            const course = await Course.findByPk(post.Section.idCourse, {
                attributes: ['idCourse', 'name', 'code']
            });

            return {
                idPost: post.idPost,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                user: {
                    idUser: post.User.idUser,
                    names: post.User.names,
                    lastnames: post.User.lastnames,
                    email: post.User.email,
                    idStudent: post.User.idStudent
                },
                section: {
                    idSection: post.Section.idSection,
                    section: post.Section.section,
                    teacher,
                    course
                }
            }
        })
    )

    return res.status(200).json({
        ok: true,
        msg: 'Post cargados',
        errors: [],
        posts: formatedPosts
    })

}