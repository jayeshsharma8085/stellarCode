const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    default:() => new mongoose.Types.ObjectId
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    unique: true,
    default:() => new mongoose.Types.ObjectId // Generates new ObjectId
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  inventory: {
    type: Number
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  brand: {
    type: String
  },
  category: {
    type: String,
    enum: ['book', 'grocery', 'apparel', 'electronics']
  },
  keywords: {
    type: [String]
  },
  rating: {
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;