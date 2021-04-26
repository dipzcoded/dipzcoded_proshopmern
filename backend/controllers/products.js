import productModel from "../models/Product.js";
import userModel from "../models/User.js";
import asyncHandler from "express-async-handler";

export const get = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await productModel.find({ ...keyword });
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

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productModel.findOne({ slug: req.params.id });
  if (product) {
    const allReadyReviewed = product.reviews.find(
      (el) => el.user.toString() === req.user.toString()
    );
    if (allReadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed by the user");
    }

    const user = await userModel.findById(req.user);

    const review = {
      user: req.user,
      name: user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce(
        (prevVal, nextVal) => nextVal.rating + prevVal,
        0
      ) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
