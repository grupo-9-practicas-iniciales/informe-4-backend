import { Request, Response } from "express";
import { PostInterface } from "../../interfaces/interfaces";
import { Course, Post, Section, Teacher, User } from "../../models";

export const getPostsByIdSection = async (req: Request, res: Response, idSection: any) => {

    const posts = await getPosts(idSection);

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
        msg: 'Ultimos posts',
        errors: [],
        posts: formatedPosts
    })

}

const getPosts = async (idSection: any) => {

    const section = await Section.findByPk(idSection) as any;


    if (!section) {
        return [];
    }
    const idCourse = section.idCourse;
    const idTeacher = section.idTeacher;

    if (idTeacher && idCourse) {
        return Post.findAll({
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
            where: {
                idSection
            }
        }) as any
    }

    if (idTeacher) {

        return Post.findAll({
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
                }],
                where: {
                    idTeacher
                }
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        }) as any

    }

    if (idCourse) {
        return Post.findAll({
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

                }],
                where: {
                    idCourse
                }
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        }) as any
    }

}