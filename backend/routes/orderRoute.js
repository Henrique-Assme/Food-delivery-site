import express from "express";
import { allOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authMiddleware, userOrders)
orderRouter.get("/allorders", allOrders)
orderRouter.put("/status", updateOrderStatus)

export default orderRouter;
