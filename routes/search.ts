import { Router } from 'express';
import { handleSearch } from '../controller';

const router = Router();

router.get('/', [], handleSearch);

export default router;