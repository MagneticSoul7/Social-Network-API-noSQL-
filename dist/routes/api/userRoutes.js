import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser } from '../../controller/userController.js';
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);
export default router;
