const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId // Generates new ObjectId
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String
  },
  GSTNumber: {
    type: String
  },
  storeName: {
    type: String,
  },
  address: {
    type: String
  },
  bankAccountNumber: {
    type: String
  },
  bankName: {
    type: String
  },
  ifscCode: {
    type: String
  },
  accountHolder: {
    type: String
  },
  inventory: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ]
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;