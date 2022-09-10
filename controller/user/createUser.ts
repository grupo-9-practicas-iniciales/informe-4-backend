
import { Request, Response } from "express";
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'
import { User } from "../../models";
import { generateJWT } from "../../utils/generate-jwt";
import { UserInterface } from "../../interfaces/interfaces";

export const createUser = async (req: Request, res: Response) => {

    const { idStudent, names, lastnames, email, password, password2 } = req.body;

    const usuario = await User.findOne({ where: { [Op.or]: [{ email }, { idStudent }] } })

    // * Email and idStudent already registered
    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en la creación de usuario',
            errors: [
                {
                    msg: 'El registro academico o el email ya se encuentra registrados'
                }
            ]
        })
    }

    // * Passwords doesnt match
    if (password != password2) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en la creación de usuario',
            errors: [
                {
                    msg: 'Las contraseñas no coinciden'
                }
            ]
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
    }) as any


    const token = await generateJWT(newUser.idStudent)

    const user: UserInterface = {
        idUser: newUser.idUser,
        idStudent: newUser.idStudent,
        names: newUser.names,
        lastnames: newUser.lastnames,
        email: newUser.email,
    }

    return res.status(200).json({
        ok: true,
        user: user,
        token: token,
        msg: 'Usuario creado correctamente',
        errors: []
    })

}