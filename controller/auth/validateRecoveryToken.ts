import { Request, Response } from "express";
import { User } from "../../models";
import { generateJWT } from "../../utils/generate-jwt";


export const validateRecoveryToken = async (req: Request, res: Response) => {


    try {

        const { token } = req.body;

        const user = await User.findOne({ where: { recoveryToken: token } }) as any

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la recuperación de contraseña',
                errors: [
                    {
                        msg: 'Token no valido'
                    }
                ],
                token: null
            })
        }

        const jwt = await generateJWT(user.idStudent);

        return res.status(200).json({
            ok: true,
            msg: 'Token valido',
            token: jwt,
            errors: []
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en la recuperación de contraseña',
            errors: []
        })

    }

}