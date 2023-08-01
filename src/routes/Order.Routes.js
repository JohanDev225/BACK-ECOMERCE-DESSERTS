import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from "../controllers/Order.Controller.js";
import { verifyToken } from "../middlewares/Auth.js";

const router = Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/orders", verifyToken, getOrders);
router.get("/orders/:id", verifyToken, getOrderById);
router.put("/update-order/:id", verifyToken, updateOrderStatus);
router.delete("/delete-order/:id", verifyToken, deleteOrder);

export default router;
