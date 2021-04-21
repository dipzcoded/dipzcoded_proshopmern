import express from "express";
import auth from "../../middlewares/auth.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../../controllers/order.js";
const router = express.Router();
router.use(auth);
router.route("/").post(addOrderItems);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").patch(updateOrderToPaid);

export default router;
