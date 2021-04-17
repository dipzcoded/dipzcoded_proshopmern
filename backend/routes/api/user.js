import express from "express";
import auth from "../../middlewares/auth.js";
import {
  login,
  getUserProfile,
  signUp,
  updateUserProfile,
} from "../../controllers/user.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.use(auth);
router.route("/profile").get(getUserProfile).patch(updateUserProfile);

export default router;
