import productModel from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const get = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
});

export const getOne = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
