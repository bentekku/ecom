const Order = require("../models/Orders");

// @desc    Get all orders (cart items)
// @route   GET /api/orders
// @access  Public (or Private if authenticated)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders (cart items)
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new order (add product to cart)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { name, price, color, imgURL, quantity } = req.body;

  try {
    const newOrder = new Order({
      name,
      imgURL,
      price,
      color,
      quantity, // Include quantity in the order model
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete an order (remove product from cart)
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.remove();
    res.status(200).json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllOrders, createOrder, deleteOrder };
