import express from "express";
import { get, getOne } from "../../controllers/products.js";
const router = express.Router();
router.route("/").get(get);
router.route("/:id").get(getOne);

export default router;
