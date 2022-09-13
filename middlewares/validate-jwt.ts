import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models";
import { UserInterface } from '../interfaces/interfaces';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene autorizacion para realizar esta accion',
            errors: [
                {
                    msg: 'Falta el token de autenticacion'
                }
            ]
        })
    }

    try {

        const { idStudent } = jwt.verify(token, process.env.JWT_SECRET_KEY || 'a') as { idStudent: string }

        const user = await User.findOne({
            where: {
                idStudent: Number(idStudent)
            }
        }) as UserInterface | null

        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'No existe usuario para este token',
                errors: [
                    {
                        msg: 'Token no valido'
                    }
                ]
            })
        }


        req.user = {
            idUser: user.idUser,
            idStudent: user.idStudent,
            names: user.names,
            lastnames: user.lastnames,
            email: user.email,
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido',
            errors: [
                {
                    msg: 'Token no valido'
                }
            ]
        })
    }

}