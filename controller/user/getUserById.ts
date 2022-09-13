import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/interfaces";
import { User } from "../../models";


export const getUserById = async (req: Request, res: Response) => {

    try {
        const { idUser } = req.params;

        const user = await User.findByPk(idUser) as any;

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
                errors: []
            })
        }

        const formatedUser: UserInterface = {
            idUser: user.idUser,
            idStudent: user.idStudent,
            names: user.names,
            lastnames: user.lastnames,
            email: user.email,
        }

        return res.status(200).json({
            ok: true,
            msg: 'Usuario encontrado',
            user: formatedUser,
            errors: []
        })


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la información',
            errors: []
        })
    }

}