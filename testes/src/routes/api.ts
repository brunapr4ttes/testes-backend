import { Router } from 'express';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.get('/list', ApiController.list);
router.delete('/delete/:userEmail', ApiController.deleteUser)
// router.get('/users', ApiController.users)

export default router;