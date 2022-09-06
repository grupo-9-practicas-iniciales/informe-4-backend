import { Request, Response } from "express";
import { User } from "../models";
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../utils/generate-jwt';
import { UserType } from '../interfaces/types';

export const createUser = async (req: Request, res: Response) => {

    const { idStudent, names, lastnames, email, password, password2 } = req.body;

    const usuario = await User.findOne({ where: { [Op.or]: [{ email }, { idStudent }] } })

    // * Email and idStudent already registered
    if (usuario) {
        return res.status(400).json({
            ok: false,
            errorMsg: 'Usuario registrado previamente'
        })
    }

    // * Passwords doesnt match
    if (password != password2) {
        return res.status(400).json({
            ok: false,
            errorMsg: 'Contraseñas no coinciden'
        })
    }

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt)

    const newUser = await User.create({
        names,
        lastnames,
        password: encryptedPassword,
        email,
        recoveryToken: null,
        idStudent
    }) as unknown as UserType

    const token = await generateJWT(newUser.idStudent)

    const { password: p, ...user } = newUser

    return res.status(200).json({
        ok: true,
        user: newUser,
        token: token
    })

}