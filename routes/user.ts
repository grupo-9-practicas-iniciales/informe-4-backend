import { Router } from 'express'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields';
import { createUser, updateUser, addAprovedCourses, removeAprovedCourses } from '../controller';
import { validateJWT } from '../middlewares';
import { getUserById } from '../controller/user/getUserById';

const router = Router();

// * Create user
router.post('/create', [
    check('idStudent', 'El registro academico no puede estar vacio').not().isEmpty(),
    check('idStudent', 'El registro academico debe ser un numero').isNumeric(),
    check('names', 'El nombre no puede estar vacio').not().isEmpty(),
    check('lastnames', 'Los apellidos no puedeb estar vacios').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password').not().isEmpty(),
    check('password2').not().isEmpty(),
    validateFields
], createUser)

// * Update user
router.put('/update', [validateJWT, validateFields], updateUser)


// * Add aproved course
router.post('/aprovedCourse', [
    validateJWT,
    check('coursesIds', 'Se debe proporcionar una lista de cursos').isArray(),
    validateFields
], addAprovedCourses)

// * Delete aprove course
router.post('/unaprovedCourse', [
    validateJWT,
    check('coursesIds', 'Se debe proporcionar una lista de cursos').isArray(),
    validateFields
], removeAprovedCourses)

router.get('/:idUser', [validateJWT], getUserById)



export default router;