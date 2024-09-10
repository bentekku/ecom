const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  imgURL: {
    type: String,
    required: [true, "Please enter the URL of the image"],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please enter a valid URL for the image",
    ],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    max: [99999999, "Price cannot exceed 8 characters"], // Limit price to a max of 8 digits
  },
  color: {
    type: String,
    required: [true, "Please enter product colors"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ORDER is the collection name which will be made plural automatically by mongoose and converted to lower-case i.e., products
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
