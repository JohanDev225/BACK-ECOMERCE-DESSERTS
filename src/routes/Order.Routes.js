import { Router } from "express";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/Order.Controller.js";
import { verifyToken } from "../middlewares/Auth.js";

const router = Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/order/:id", verifyToken, getOrderById);
router.put("/update-order/:id", verifyToken, updateOrderStatus);

export default router;
