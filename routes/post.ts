import { Router } from 'express';
import { check } from 'express-validator';
import { createPost } from '../controller';
import { validateFields, validateJWT } from '../middlewares';

const router = Router()

router.post('/', [
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('idSection', 'La sección es obligatoria').not().isEmpty(),
    validateJWT,
    validateFields
], createPost)

export default router;