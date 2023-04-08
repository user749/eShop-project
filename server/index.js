import dotenv from "dotenv";

import connectToDatabase from "./database.js";
import express from "express";

//Our routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectToDatabase();
const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
