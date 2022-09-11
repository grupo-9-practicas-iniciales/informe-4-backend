import { Request, Response } from "express";
import { PostInterface } from "../../interfaces/interfaces";
import { Course, Post, Section, Teacher, User } from "../../models";

export const getPostsByIdSection = async (req: Request, res: Response, idSection: any) => {

    const posts = await Post.findAll({
        include: [{
            model: User,
            attributes: ['idUser', 'names', 'lastnames']
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
        where: {
            idSection
        }
    }) as any

    if (posts.length === 0) {
        return res.status(404).json({
            ok: false,
            msg: 'No hay publicaciones',
            errors: []
        })
    }

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
                    lastnames: post.User.lastnames
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
        msg: 'Ultimos posts',
        errors: [],
        posts: formatedPosts
    })

}