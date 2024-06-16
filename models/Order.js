const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId // Generates new ObjectId
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['placed', 'transit', 'shipped', 'out for delivery', 'delivered'],
    default: 'placed'
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
