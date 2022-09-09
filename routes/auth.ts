import { Router } from 'express';
import { check } from 'express-validator';
import { authLogin, getRecoveryEmail } from '../controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], authLogin)

router.get('/recovery', [
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], getRecoveryEmail)

export default router;