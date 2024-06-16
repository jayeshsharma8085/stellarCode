const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./dbConnection/db')


app.use(cors());
app.use(bodyParser.json());

//Database Connection
connectDB();

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const vendorRoutes = require('./routes/vendorRoutes');



// Use routes
app.use('/api/user', userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/vendor',vendorRoutes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
