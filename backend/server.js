import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import connectToDb from "./db/index.js";
import productRoutes from "./routes/api/products.js";
import userRoutes from "./routes/api/user.js";
import orderRoutes from "./routes/api/order.js";
import uploadRoutes from "./routes/api/uploads.js";
import { errorHandler, notFound } from "./middlewares/error.js";

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
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// not found route
app.use(notFound);

// error middleware
app.use(errorHandler);

const Port = process.env.PORT || 5000;

// creating a server
app.listen(Port, () => {
  console.log(`backend server in ${process.env.NODE_ENV} mode on port ${Port}`);
});
