import { Request, Response } from "express";
import transporter from "../../email/config";
import { User } from "../../models";
import { v4 as uuidv4 } from 'uuid';



export const getRecoveryEmail = async (req: Request, res: Response) => {

    try {

        const { email } = req.body;

        const posibleUser = await User.findOne({ where: { email } }) as any

        if (!posibleUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la recuperación de contraseña',
                errors: [
                    {
                        msg: 'No hay ningun usuario registrado con ese email'
                    }
                ]

            })
        }

        const token = uuidv4();

        try {

            posibleUser.recoveryToken = token;
            await posibleUser.save();

            const recoveryUrl = `${process.env.APP_URL}/recovery/${token}`;
            await transporter.sendMail({
                from: `"Recuperación de contraseña - YOUSACAPP" < ${process.env.SENDER_EMAIL} >`,
                to: posibleUser.email,
                subject: `Recuperación de contraseña - YOUSACAPP`,
                html: `
                    <h1>Recuperación de contraseña - YOUSACAPP</h1>
                    <p>Para recuperar tu contraseña, haz click en el siguiente enlace</p>
                    <a href="${recoveryUrl}">Recuperar contraseña</a>
                        `
            })

            return res.status(200).json({
                ok: true,
                msg: 'Email enviado correctamente',
                errors: []
            })

        } catch (error) {
            return res.status(400).json({
                ok: true,
                msg: 'Error el enviar el email',
                errors: []
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
            errors: []
        });
    }

}