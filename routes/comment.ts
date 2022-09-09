import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { createComment, getCommentsByIdPost } from '../controller';

const router = Router()

router.post('/', [
    validateJWT,
    check('message', 'El mensaje es requerido').not().isEmpty(),
    check('idPost', 'El post es requerido').not().isEmpty(),
    validateFields
], createComment)

router.get('/:idPost', [
    validateJWT,
    validateFields
], getCommentsByIdPost)

export default router;