import { SET_DEFERRED } from 'sequelize/types/deferrable';
import sequelize from '../db/config';
import { AprovedCourse, Course, Section } from '../models';
import { courses, sections, teachers } from './data/data';
import { CourseInterface, TeacherInterface } from '../interfaces/interfaces';
import { Teacher } from '../models/Teacher';

// * This is the seed file, it is used to populate the database with the initial data
// ! This will truncate data from Courses, Sections, Teachers and AprovedCourses

export const seed = async () => {

    try {

        console.log('Seeding...')

        console.log('Connecting to DB')

        await sequelize.authenticate()

        console.log('Deleting previos data')

        await AprovedCourse.destroy({ where: {} })
        await Course.destroy({ where: {} })
        await Teacher.destroy({ where: {} })
        await Section.destroy({ where: {} })


        // Create courses
        await Promise.all(
            courses.map(async (course) => {
                const createdCourse = await Course.create({
                    name: course.name,
                    code: course.code,
                    credits: course.credits
                }) as unknown as CourseInterface;

                // Create 'todas las secciones'

                await Section.create({
                    section: 'Todas las secciones',
                    idCourse: createdCourse.idCourse,
                    idTeacher: null
                })

                // Update the section with the id of the course
                sections.forEach(section => {
                    if (section.idCourse == course.id) {
                        section.idCourse = createdCourse.idCourse;
                    }
                })
                return createdCourse;
            })
        );

        console.log(courses);

        console.log('Courses loaded successfully')


        // Create teachers
        await Promise.all(
            teachers.map(async (teacher) => {
                // ! Validate if the idTeacher and idCourse exists

                const createdTeacher = await Teacher.create({
                    idTeacher: teacher.id,
                    name: teacher.name,
                }) as unknown as TeacherInterface;

                // Create 'todas los cursos'

                await Section.create({
                    section: 'Todos los cursos',
                    idTeacher: createdTeacher.idTeacher,
                    idCourse: null
                })

                // Update the section with the id of the teacher
                sections.forEach(section => {
                    if (section.idTeacher == teacher.id) {
                        section.idTeacher = createdTeacher.idTeacher;
                    }
                })
                return createdTeacher;

            })
        );

        console.log('Teachers loaded successfully')


        await Promise.all(
            sections.map(async (section) => {
                await Section.create({
                    idCourse: section.idCourse,
                    idTeacher: section.idTeacher,
                    section: section.section
                })
            })
        )

        console.log('Sections loaded successfully')


    } catch (error) {
        console.log('Error at seeding DB')
        console.log(error)
    }

}

(async function () {
    await seed();
})();