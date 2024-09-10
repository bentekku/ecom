const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require("../controller/productController");

const router = express.Router();

// Routes for product operations
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/name/:name", getProductByName); // New route for name-based lookup

module.exports = router;
