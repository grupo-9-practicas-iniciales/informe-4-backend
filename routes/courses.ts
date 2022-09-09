import { Router } from "express";
import { getAprovedCoursesByUserId, getUnaprovedCoursesByUserId } from '../controller';
import { validateFields, validateJWT } from "../middlewares";


const router = Router();

router.get('/aproved/:idUser', [], getAprovedCoursesByUserId)


router.get('/unaproved', [
    validateJWT,
    validateFields
], getUnaprovedCoursesByUserId)

export default router;