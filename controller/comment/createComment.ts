import { Request, Response } from "express";
import { CommentInterface } from "../../interfaces/interfaces";
import { Comment, Post } from "../../models";


export const createComment = async (req: Request, res: Response) => {

    try {

        const { idUser } = req.user!;
        const { idPost, message } = req.body;

        const posiblePost = await Post.findByPk(idPost);

        if (!posiblePost) {
            return res.status(400).json({
                ok: false,
                msg: 'El post no existe',
                errors: []
            })
        }

        const comment = await Comment.create({
            message,
            idUser,
            idPost
        }) as any

        const formatComment: CommentInterface = {
            idComment: comment.idComment,
            message: comment.message,
            createdAt: comment.createdAt,
            user: {
                idUser: req.user!.idUser,
                names: req.user!.names,
                lastnames: req.user!.lastnames,
                email: req.user!.email,
                idStudent: req.user!.idStudent
            }
        }

        return res.status(201).json({
            ok: true,
            msg: 'Comentario creado',
            errors: [],
            comment: formatComment
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la creación del comentario',
            errors: []
        })
    }

}