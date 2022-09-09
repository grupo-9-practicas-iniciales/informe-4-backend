import { Request, Response } from "express";
import { User } from "../../models";
import bcryptjs from 'bcryptjs';
import { generateJWT } from "../../utils/generate-jwt";
import { UserInterface } from '../../interfaces/interfaces';

export const authLogin = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const posibleUser = await User.findOne({ where: { email } }) as any

        if (!posibleUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la autenticacion',
                errors: [
                    {
                        msg: 'No hay ningun usuario registrado con ese email'
                    }
                ]

            })
        }


        if (!bcryptjs.compareSync(password, posibleUser.password)) {
            return res.status(400).json({
                msg: 'Error en la autenticacion',
                errors: [
                    {
                        msg: 'Credenciales incorrectas'
                    }
                ]

            })
        }

        const token = await generateJWT(posibleUser.idStudent);

        const user: UserInterface = {
            idUser: posibleUser.idUser,
            idStudent: posibleUser.idStudent,
            names: posibleUser.names,
            lastnames: posibleUser.lastnames,
            email: posibleUser.email,

        }

        return res.status(200).json({
            ok: true,
            msg: 'Autenticacion correcta',
            token,
            user,
            errors: []
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en la autenticacion',
            errors: []
        })
    }


}