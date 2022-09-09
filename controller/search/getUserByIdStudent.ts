import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/interfaces";
import { User } from "../../models";

export const getUserByIdStudent = async (req: Request, res: Response, idStudent: any) => {

    const user = await User.findOne({
        where: { idStudent },
    }) as any;

    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con ese registro academico',
            errors: [],
            user: null
        })
    }

    const formatedUser: UserInterface = {
        idUser: user.idUser,
        names: user.names,
        lastnames: user.lastnames,
        email: user.email,
        idStudent: user.idStudent,
    }


    return res.status(200).json({
        ok: true,
        msg: 'Usuario encontrado',
        errors: [],
        user: formatedUser
    })

}