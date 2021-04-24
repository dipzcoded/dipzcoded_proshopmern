import express from "express";
import {
  get,
  getOne,
  deleteById,
  createProduct,
  updateProduct,
} from "../../controllers/products.js";
import auth, { restrictUser } from "../../middlewares/auth.js";
const router = express.Router();
router.route("/").get(get).post(auth, restrictUser, createProduct);
router
  .route("/:id")
  .get(getOne)
  .patch(auth, restrictUser, updateProduct)
  .delete(auth, restrictUser, deleteById);

export default router;
