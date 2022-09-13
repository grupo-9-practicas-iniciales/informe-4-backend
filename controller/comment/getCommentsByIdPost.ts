import { Request, Response } from "express";
import { Comment, Post, User } from "../../models";
import { CommentInterface } from '../../interfaces/interfaces';

export const getCommentsByIdPost = async (req: Request, res: Response) => {

    try {

        const { idPost } = req.params;

        const posiblePost = await Post.findByPk(idPost);

        if (!posiblePost) {
            return res.status(400).json({
                ok: false,
                msg: 'El post no existe'
            })
        }

        const comments = await Comment.findAll({
            include: [{
                model: User,
            }],
            where: {
                idPost
            }
        }) as any

        if (comments.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron comentarios',
                errors: []
            })
        }

        const formatedComments = comments.map((comment: any) => {

            const { idComment, message, createdAt, User } = comment;

            const formatComment: CommentInterface = {
                idComment,
                message,
                createdAt,
                user: {
                    idUser: User.idUser,
                    idStudent: User.idStudent,
                    names: User.names,
                    lastnames: User.lastnames,
                    email: User.email
                }
            }

            return formatComment;
        })

        return res.status(200).json({
            ok: true,
            msg: 'Comentarios cargados',
            errors: [],
            comments: formatedComments
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los comentarios',
            errors: []
        })
    }

}