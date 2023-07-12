import {Router} from 'express';
import * as Dessert from '../controllers/Dessert.Controller';
import {verifyToken} from '../middlewares/Auth.js';

const router = Router();

//routes para Postres
router.get('/deserts', Dessert.getDessert);
router.get('/desert/:id', Dessert.getDesserts);
router.post('/create-dessert', verifyToken, Dessert.createMovie);
router.put('/update-dessert/:id', verifyToken, Dessert.updateMovieById);
router.delete('/delete-dessert/:id', verifyToken, Dessert.deleteMovieById);


export default router;