import { Request, Response } from "express"
import {
    getLatestsPosts,
    getPostsByIdSection,
    getUserByIdStudent,
    getTeachersAndSectionsByName,
    getCoursesAndSectionsByName
} from "./";


type Param = | 'default' | 'post' | 'user' | 'teacher' | 'course';



export const handleSearch = async (req: Request, res: Response) => {

    try {

        let param = req.query.param as Param;
        const { idSection, idStudent, name } = req.body;

        switch (param) {
            case 'default':
                getLatestsPosts(req, res);
                break;

            case 'post':
                if (!idSection) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Seccion requerida',
                        errors: []
                    })
                }

                getPostsByIdSection(req, res, idSection);
                break;

            case 'user':
                if (!idStudent) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Registro academico requerido',
                        errors: []
                    })
                }

                getUserByIdStudent(req, res, idStudent);
                break;

            case 'teacher':
                if (!name) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Nombre requerido',
                        errors: []
                    })
                }

                getTeachersAndSectionsByName(req, res, name);
                break;

            case 'course':
                if (!name) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Nombre requerido',
                        errors: []
                    })
                }

                getCoursesAndSectionsByName(req, res, name);
                break;


            default:
                getLatestsPosts(req, res);
                break;
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
            errors: []
        })
    }

}