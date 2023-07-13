import {Router} from 'express';
import { addToWishlist, getWishlist, createOrderWishlist, removeFromWishlist } from '../controllers/Wishlist.controller.js';
import {verifyToken} from '../middlewares/Auth.js';

const router = Router();


router.post('/user/:id/wishlist', verifyToken, addToWishlist);
router.get('/user/:id/wishlist', verifyToken, getWishlist);
router.get('/user/:id/order', verifyToken, createOrderWishlist);
router.delete('/user/:id/wishlist/:itemId', verifyToken, removeFromWishlist);

export default router;