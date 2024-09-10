const express = require("express");
const {
  getAllOrders,
  createOrder,
  deleteOrder,
} = require("../controller/orderController");

const router = express.Router();

// Routes for order operations
router.get("/", getAllOrders);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
