import {Router} from 'express';
import * as Auth from '../controllers/User.Controller.js';
const router = Router();

router.post('/signup', Auth.signUp);
router.post('/signin', Auth.signIn);




export default router;