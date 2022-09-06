import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models";
import { UserType } from '../interfaces/types';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            errorMsg: 'No tiene autorizacion'
        })
    }

    try {

        const { idStudent } = jwt.verify(token, process.env.JWT_SECRET_KEY || 'a') as { idStudent: string }

        const user = await User.findOne({
            where: {
                idStudent: Number(idStudent)
            }
        }) as UserType | null

        if (!user) {
            return res.status(401).json({
                ok: false,
                errorMsg: 'No existe usuario'
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}