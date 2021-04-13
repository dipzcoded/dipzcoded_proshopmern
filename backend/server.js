import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectToDb from "./db/index.js";
import productRoutes from "./routes/api/products.js";
import { errorHanlder, notFound } from "./middlewares/error.js";

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
app.use("/api/products", productRoutes);

// not found route
app.use(notFound);

// error middleware
app.use(errorHanlder);

const Port = process.env.PORT || 5000;

// creating a server
app.listen(Port, () => {
  console.log(`backend server in ${process.env.NODE_ENV} mode on port ${Port}`);
});
