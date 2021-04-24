import productModel from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const get = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
});

export const getOne = asyncHandler(async (req, res) => {
  let product;
  if (
    req.params.id.includes("-") ||
    req.params.id.split("-")[0].length !== 24
  ) {
    product = await productModel.findOne({ slug: req.params.id });
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  } else {
    product = await productModel.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  }
});

export const deleteById = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new productModel({
    name: "sample name",
    price: 0,
    user: req.user,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await productModel.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
