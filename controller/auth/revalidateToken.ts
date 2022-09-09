import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/interfaces";
import { generateJWT } from "../../utils/generate-jwt";


export const revalidateToken = async (req: Request, res: Response) => {

    try {

        const token = await generateJWT(req.user!.idStudent);

        const user: UserInterface = req.user!;

        return res.status(200).json({
            ok: true,
            msg: 'Revalidacion correcta',
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