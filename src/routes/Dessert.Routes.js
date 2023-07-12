import {Router} from 'express';
import * as Dessert from '../controllers/Dessert.Controller.js';
import {verifyToken} from '../middlewares/Auth.js';

const router = Router();

//routes para Postres
router.get('/deserts', Dessert.getDessert);
router.get('/desert/:id', Dessert.getDesserts);
router.post('/create-dessert', verifyToken, Dessert.createDessert);
router.put('/update-dessert/:id', verifyToken, Dessert.updateDessertById);
router.delete('/delete-dessert/:id', verifyToken, Dessert.deleteDessertById);


export default router;