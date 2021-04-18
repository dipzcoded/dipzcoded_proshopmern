import express from "express";
import auth from "../../middlewares/auth.js";
import { addOrderItems } from "../../controllers/order.js";
const router = express.Router();
router.route("/").post(auth, addOrderItems);

export default router;
