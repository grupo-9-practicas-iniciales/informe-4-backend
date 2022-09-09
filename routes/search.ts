import { Router } from 'express';
import { handleSearch } from '../controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], handleSearch);

export default router;