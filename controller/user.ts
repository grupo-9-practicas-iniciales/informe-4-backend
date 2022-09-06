import { Request, Response } from "express";
import { Course, User, UserAprovedCourse } from "../models";
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../utils/generate-jwt';
import { UserType } from '../interfaces/types';
import sequelize from "../db/config";

export const createUser = async (req: Request, res: Response) => {

    const { idStudent, names, lastnames, email, password, password2 } = req.body;

    const usuario = await User.findOne({ where: { [Op.or]: [{ email }, { idStudent }] } })

    // * Email and idStudent already registered
    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en la creación de usuario',
            errors: [
                {
                    msg: 'El registro academico o el email ya se encuentra registrados'
                }
            ]
        })
    }

    // * Passwords doesnt match
    if (password != password2) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en la creación de usuario',
            errors: [
                {
                    msg: 'Las contraseñas no coinciden'
                }
            ]
        })
    }

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt)

    const newUser = await User.create({
        names,
        lastnames,
        password: encryptedPassword,
        email,
        recoveryToken: null,
        idStudent
    }) as any


    const token = await generateJWT(newUser.idStudent)

    const user: UserType = {
        idUser: newUser.idUser,
        idStudent: newUser.idStudent,
        names: newUser.names,
        lastnames: newUser.lastnames,
        email: newUser.email,
    }

    return res.status(200).json({
        ok: true,
        user: user,
        token: token,
        errors: []
    })

}

export const addAprovedCourse = async (req: Request, res: Response) => {

    try {
        const { idUser } = req.user!

        const { coursesIds } = req.body


        // ! Validate previous added courses
        await Promise.all(
            coursesIds.map(async (idCourse: string) => {
                return UserAprovedCourse.create({
                    idUser,
                    idCourse
                })
            })
        )

        return res.status(200).json({
            ok: true,
            msg: 'Cursos aprobados agregados correctamente',
            errors: []
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


export const updateUser = async (req: Request, res: Response) => {

    try {
        const { idStudent, idUser, password, password2, ...fields } = req.body;
        const errors = []

        // ? Update password
        if (password || password2) {
            if (password == password2) {
                const salt = bcryptjs.genSaltSync();
                const encryptedPassword = bcryptjs.hashSync(password, salt)
                fields.password = encryptedPassword
            } else {
                errors.push({ msg: 'Las contraseñas no coinciden' })
            }
        }

        // console.log(fields)

        await User.update(fields, {
            where: {
                idStudent: req.user?.idStudent
            }
        })

        return res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            errors
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        })
    }
}

export const getAprovedCourses = async (req: Request, res: Response) => {

    try {

        const { idUser } = req.params

        const [courses, metadata] = await sequelize.query(`select Courses.code, Courses.credits, Courses.idCourse from UserAprovedCourses inner join Users on Users.idUser = UserAprovedCourses.idUser inner join Courses on Courses.idCourse = UserAprovedCourses.idCourse where Users.idUser = ${idUser};`);

        return res.status(200).json({
            ok: true,
            msg: 'Cursos aprobados',
            courses
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar cursos aprobados'
        })
    }

}