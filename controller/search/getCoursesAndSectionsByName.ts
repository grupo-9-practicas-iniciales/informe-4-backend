import { Request, Response } from "express";
import { Op } from "sequelize";
import { CourseInterface } from "../../interfaces/interfaces";
import { Course, Section, Teacher } from "../../models";

export const getCoursesAndSectionsByName = async (req: Request, res: Response, name: any) => {

    const courses = await Course.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            },
        },
        include: [{
            as: 'sections',
            model: Section,
        }]
    }) as any;

    if (courses.length === 0) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron cursos',
            errors: []

        })
    }

    const formatedCourses: CourseInterface[] = await Promise.all(
        courses.map(async (course: any) => {

            const formatedSections = await Promise.all(
                course.sections.map(async (section: any) => {

                    const teacher = await Teacher.findByPk(section.idTeacher, {
                        attributes: ['idTeacher', 'name']
                    });

                    return {
                        idSection: section.idSection,
                        section: section.section,
                        teacher
                    }
                })
            )

            return {
                idCourse: course.idCourse,
                name: course.name,
                code: course.code,
                sections: formatedSections
            }
        })
    )

    return res.status(200).json({
        ok: true,
        msg: 'Cursos encontrados',
        errors: [],
        courses: formatedCourses
    })

}