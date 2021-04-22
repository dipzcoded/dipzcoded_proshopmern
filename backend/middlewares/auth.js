import jwt from "jsonwebtoken";
import asyncHanlder from "express-async-handler";
import userModel from "../models/User.js";
const auth = asyncHanlder(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const restrictUser = asyncHanlder(async (req, res, next) => {
  const user = await userModel.findById(req.user);
  if (user) {
    if (user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("not authorized as an admin access this route");
    }
  }
});

export default auth;
