const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default:() => new mongoose.Types.ObjectId, 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  pinCode: {
    type: String
  },
  state: {
    type: String,
    enum: [
      'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
      'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
      'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
      'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
      'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ]
  },
  street: {
    type: String
  },
  flatNo: {
    type: String
  },
  preference: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product model
      },
      qty: {
        type: Number
      }
    }
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
      },
      qty: {
        type: Number
      }
    }
  ],
  prevOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order' // Reference to the Order model
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;