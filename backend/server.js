import express from "express";
import products from "./data/products.js";
import connectToDb from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// loading up .env variables
dotenv.config();
// database connection method
connectToDb();
const app = express();

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((el) => el._id === req.params.id);
  res.json(product);
});
const Port = process.env.PORT || 5000;

// creating a server
app.listen(Port, () => {
  console.log(`backend server in ${process.env.NODE_ENV} mode on port ${Port}`);
});
