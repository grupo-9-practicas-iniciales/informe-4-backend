
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import { User } from "../../models";


export const updateUser = async (req: Request, res: Response) => {

    try {
        const { idStudent, idUser, password, password2, ...fields } = req.body;
        const errors = []

        // ? Update password
        if (password || password2) {
            if (password == password2) {
                const salt = bcryptjs.genSaltSync();
                const encryptedPassword = bcryptjs.hashSync(password, salt)
                fields.password = encryptedPassword
            } else {
                errors.push({ msg: 'Las contraseñas no coinciden' })
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la actualizacion',
                errors
            })
        }

        await User.update({ ...fields, recoveryToken: null }, {
            where: {
                idStudent: req.user?.idStudent
            }
        })

        return res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            errors
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        })
    }
}