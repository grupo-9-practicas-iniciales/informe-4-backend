import { Router } from 'express'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields';
import { createUser } from '../controller/user';

const router = Router();

router.post('/create', [
    check('idStudent').not().isEmpty(),
    check('names').not().isEmpty(),
    check('lastnames').not().isEmpty(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('password2').not().isEmpty(),
    validateFields
], createUser)

export default router;