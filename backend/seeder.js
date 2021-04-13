import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import userModel from "./models/User.js";
import productModel from "./models/Product.js";
import orderModel from "./models/Order.js";
import connectToDb from "./db/index.js";

dotenv.config();
connectToDb();

const importData = async () => {
  try {
    await orderModel.deleteMany();
    await productModel.deleteMany();
    await userModel.deleteMany();

    const createdUsers = await userModel.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((el) => {
      return {
        ...el,
        user: adminUser,
      };
    });
    await productModel.insertMany(sampleProducts);
    console.log("Data Imported! successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await orderModel.deleteMany();
    await productModel.deleteMany();
    await userModel.deleteMany();

    console.log("Data Destroyed! successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
