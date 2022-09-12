import { Request, Response } from "express";
import { AprovedCourse, Course } from "../../models";
import sequelize from '../../db/config';


export const getUnaprovedCoursesByUserId = async (req: Request, res: Response) => {
    try {

        const { idUser } = req.user!;

        const unaprovedCourses = await Course.findAll({

            include: [
                {
                    model: AprovedCourse,
                    required: false,
                    as: 'aprovedCourses',
                    where: {
                        idUser
                    },
                    attributes: []
                },

            ],
            where: sequelize.where(
                sequelize.col('aprovedCourses.idAprovedCourse'),
                'IS',
                null
            )
        }) as any

        if (unaprovedCourses.lenght == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron cursos no aprobados',
                errors: []
            })
        }

        const formatedCourses = unaprovedCourses.map((course: any) => {
            return {
                idCourse: course.idCourse,
                name: course.name,
                code: course.code,
                credits: course.credits,
            }
        })


        res.status(200).json({
            ok: true,
            msg: 'Cursos no aprobados cargados',
            errors: [],
            unaprovedCourses: formatedCourses
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mostrar los cursos aprobados'
        })
    }

}
