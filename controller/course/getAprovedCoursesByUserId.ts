import { Request, Response } from "express";
import { AprovedCourse, Course } from "../../models";


export const getAprovedCoursesByUserId = async (req: Request, res: Response) => {
    try {

        const { idUser } = req.params;

        const aprovedCourses = await Course.findAll({

            include: [
                {
                    model: AprovedCourse,
                    as: 'aprovedCourses',
                    where: {
                        idUser
                    },
                    attributes: []
                }
            ]
        }) as any

        if (aprovedCourses.lenght == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron cursos aprobados',
                errors: []
            })
        }

        const formatedCourses = aprovedCourses.map((course: any) => {
            return {
                idCourse: course.idCourse,
                name: course.name,
                code: course.code,
                credits: course.credits,
            }
        })

        res.status(200).json({
            ok: true,
            msg: 'Cursos aprobados cargados',
            errors: [],
            aprovedCourses: formatedCourses
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mostrar los cursos aprobados'
        })
    }

}
