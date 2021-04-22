import userModel from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(users);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  const updatedUser = await userModel
    .findByIdAndUpdate(user._id, { $set: req.body }, { new: true })
    .select("-password");
  res.json(updatedUser);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user).select("-password");
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await userModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
