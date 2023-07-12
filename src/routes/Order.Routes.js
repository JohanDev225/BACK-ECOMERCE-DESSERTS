import {Router} from 'express';
import * as Order from '../controllers/Order.Controller';
import {verifyToken} from '../middlewares/Auth.js';

const router = Router();

router.post('/create-order', verifyToken, Order.createOrder);
router.get('/order/:id', verifyToken, Order.getOrderById);
router.put('/update-order/:id', verifyToken, Order.updateOrderStatus);
router.delete('/delete-order/:id', verifyToken, Order.deleteOrder);

export default router;