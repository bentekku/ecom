// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter the name"] },
  price: { type: Number, required: [true, "Please enter the price"] },
  color: { type: String, required: [true, "Please enter the color"] },
  img: { type: String, required: [true, "Please enter the image URL"] },
  quantity: { type: Number, required: [true, "Please enter the quantity"] },
});

module.exports = mongoose.model("Order", orderSchema);
