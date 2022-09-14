
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import { User } from "../../models";


export const updateUser = async (req: Request, res: Response) => {

    try {
        const { idStudent, idUser, oldPassword, password, password2, ...fields } = req.body;
        const errors = []

        const userToUpdate = await User.findByPk(req.user?.idUser) as any;



        // ? Update password
        if (password || password2 || oldPassword) {
            if (password == password2) {
                const salt = bcryptjs.genSaltSync();
                const encryptedPassword = bcryptjs.hashSync(password, salt)
                fields.password = encryptedPassword
            } else {
                errors.push({ msg: 'Las contraseñas no coinciden' })
            }

            // * If doesnt have a recovery token 
            if (userToUpdate.recoveryToken == null) {
                // * And the old password is not the same as the one in the database
                if (!bcryptjs.compareSync(oldPassword, userToUpdate.password)) {
                    errors.push({ msg: 'Contraseña anterior incorrecta' })

                    return res.status(400).json({
                        ok: false,
                        msg: 'Error al actualizar',
                        errors: errors,
                    })
                }
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
            msg: 'Error al actualizar',
            errors: [],

        })
    }
}