import { Router } from 'express';
import { check } from 'express-validator';
import { authLogin, getRecoveryEmail, revalidateToken } from '../controller';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], authLogin)

router.post('/revalidate', [validateJWT, validateFields], revalidateToken)

router.get('/recovery', [
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], getRecoveryEmail)

export default router;