import { Request, Response } from "express";
import { ErrorInterface } from "../../interfaces/interfaces";
import { AprovedCourse, Course } from "../../models";


export const addAprovedCourses = async (req: Request, res: Response) => {

    try {
        const { idUser } = req.user!

        const { coursesIds }: { coursesIds: string[] } = req.body

        const errors: ErrorInterface[] = []

        await Promise.all(coursesIds.map((idCourse) => {

            return new Promise(async (resolve, reject) => {
                const aprovedCourses = await AprovedCourse.findOne({ where: { idUser, idCourse } })
                if (aprovedCourses) {
                    const course = await Course.findByPk(idCourse) as any
                    if (course) {
                        errors.push({ msg: `El curso ${course.code} - ${course.name} ya ha sido agregado como curso aprobado` })
                    }
                }
                resolve(true)
            })

        }))



        if (errors.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la adición de cursos',
                errors
            })
        }


        await Promise.all(
            coursesIds.map(async (idCourse: string) => {
                return AprovedCourse.create({
                    idUser,
                    idCourse
                })
            })
        )

        return res.status(200).json({
            ok: true,
            msg: 'Cursos aprobados agregados correctamente',
            errors
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            ok: false,
            msg: 'Error al agregar cursos aprobados',
            errors: [
                {
                    msg: 'Cursos no validos'
                }
            ]
        })
    }

}