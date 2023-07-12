import {Router} from 'express';
import * as Wishlist from '../controllers/Wishlist.Controller';
import {verifyToken} from '../middlewares/Auth.js';

const router = Router();

router.post('/create-wish', verifyToken, Wishlist.addToWishlist);
router.get('/wish/:id', verifyToken, Wishlist.getWishlist);
router.delete('/delete-wish/:id', verifyToken, Wishlist.removeFromWishlist);

export default router;