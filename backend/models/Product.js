const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  category: {
    type: String,
    required: [true, "Please select category for this product"],
  },
  color: {
    type: Array,
    required: [true, "Please enter product colors"],
  },
  brand: {
    type: String,
    required: [true, "Please enter product colors"],
    trim: true,
  },
  isMostPopular: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// PRODUCT is the collection name which will be made plural automatically by mongoose and converted to lower-case i.e., products
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
