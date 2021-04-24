import express from "express";
import auth, { restrictUser } from "../../middlewares/auth.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../../controllers/order.js";
const router = express.Router();
router.use(auth);
router.route("/").get(auth, restrictUser, getOrders).post(addOrderItems);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").patch(updateOrderToPaid);
router.route("/:id/deliver").patch(auth, restrictUser, updateOrderToDelivered);

export default router;
