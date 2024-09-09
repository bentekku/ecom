const express = require("express");
const dotENV = require("./utils/dotEnv");
const connectToDB = require("./utils/db");
const productRoutes = require("./routes/productRoutes");
dotENV();

const app = express();
connectToDB();

// Middleware and routes here...
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
