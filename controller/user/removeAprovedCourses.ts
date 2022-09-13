import { Request, Response } from "express";
import { ErrorInterface } from "../../interfaces/interfaces";
import { AprovedCourse } from "../../models";


export const removeAprovedCourses = async (req: Request, res: Response) => {

    try {
        const { idUser } = req.user!

        const { coursesIds }: { coursesIds: string[] } = req.body

        const errors: ErrorInterface[] = []

        await Promise.all(
            coursesIds.map(async (idCourse: string) => {
                return AprovedCourse.destroy({
                    where: {
                        idUser,
                        idCourse
                    }
                })
            })
        )

        return res.status(200).json({
            ok: true,
            msg: 'Cursos removidos de cursos aprobados correctamente',
            errors
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            ok: false,
            msg: 'Cursos removidos de cursos aprobados correctamente',
            errors: [
                {
                    msg: 'Cursos no validos'
                }
            ]
        })
    }

}