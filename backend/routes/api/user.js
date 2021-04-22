import express from "express";
import auth, { restrictUser } from "../../middlewares/auth.js";
import {
  login,
  getUserProfile,
  signUp,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUser,
} from "../../controllers/user.js";
const router = express.Router();

router.route("/").get(auth, restrictUser, getUsers);
router
  .route("/:id")
  .get(auth, restrictUser, getUserById)
  .patch(auth, restrictUser, updateUser)
  .delete(auth, restrictUser, deleteUserById);
router.route("/login").post(login);
router.route("/signup").post(signUp);
router.use(auth);
router.route("/edit/profile").get(getUserProfile).patch(updateUserProfile);

export default router;
