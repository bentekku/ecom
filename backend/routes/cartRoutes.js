const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { name, price, color, img, quantity } = req.body;
    const newOrder = new Order({ name, price, color, img, quantity });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// Remove item from cart
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

// Fetch request of data from cart
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
