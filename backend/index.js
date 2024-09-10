const express = require("express");
const dotENV = require("./utils/dotEnv");
const connectToDB = require("./utils/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
dotENV();

const app = express();
connectToDB();

// Middlewares
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", cartRoutes);
app.use(cors()); // Allows cross-origin requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
