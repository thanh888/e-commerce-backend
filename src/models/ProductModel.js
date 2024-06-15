const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    type: { type: String },
    price: { type: Number },
    countInStock: { type: Number },
    rating: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
