import { Request, Response } from "express";
import { Op } from "sequelize";
import { TeacherInterface } from "../../interfaces/interfaces";
import { Course, Section, Teacher } from "../../models";

export const getTeachersAndSectionsByName = async (req: Request, res: Response, name: any) => {

    const teachers = await Teacher.findAll({
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

    if (teachers.length === 0) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron profesores',
            errors: []
        })
    }

    const formatedTeachers: TeacherInterface[] = await Promise.all(
        teachers.map(async (teacher: any) => {

            const formatedSections = await Promise.all(
                teacher.sections.map(async (section: any) => {

                    const course = await Course.findByPk(section.idCourse, {
                        attributes: ['idCourse', 'name', 'code']
                    });

                    return {
                        idSection: section.idSection,
                        section: section.section,
                        course
                    }
                })
            )

            return {
                idTeacher: teacher.idTeacher,
                name: teacher.name,
                sections: formatedSections
            }
        })
    )

    return res.status(200).json({
        ok: true,
        msg: 'Profesores encontrados',
        errors: [],
        teachers: formatedTeachers
    })


}