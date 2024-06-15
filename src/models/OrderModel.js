const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User" },
    orderItem: [
      {
        name: { type: String },
        quantity: { type: Number },
        image: { type: String },
        price: { type: Number },
        productId: { type: String, ref: "Product" },
      },
    ],
    addressReceiver: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      phone: { type: String },
    },
    paymentMethod: { type: String },
    totalPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    productsPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
