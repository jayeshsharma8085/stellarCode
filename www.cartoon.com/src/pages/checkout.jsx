import React, { useState } from "react";
import { Checkbox, FormControlLabel, Grid, Button, Typography, Radio, RadioGroup } from "@mui/material";

export default function CheckoutPage() {
  // State to track the selected payment method
  const [paymentMethod, setPaymentMethod] = useState('');

  // Handler for changing the payment method
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const totalPrice = 100; // Replace with the total price of all items
  const gst = totalPrice * 0.18; // Assuming GST rate is 18%
  const sgst = totalPrice * 0.09; // Assuming SGST rate is 9%
  const totalAmount = totalPrice + gst + sgst;

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h5" gutterBottom className="text-center">
          Checkout
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Display items in the cart */}
            {/* Replace this with your cart items component */}
            {/* <CartItems /> */}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <div className="flex justify-between mb-2">
              <Typography variant="body1">Total Price:</Typography>
              <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body1">GST (18%):</Typography>
              <Typography variant="body1">${gst.toFixed(2)}</Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body1">SGST (9%):</Typography>
              <Typography variant="body1">${sgst.toFixed(2)}</Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Payment Options
            </Typography>
            <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
              <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash on Delivery" />
              <FormControlLabel value="razorPay" control={<Radio />} label="RazorPay" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!paymentMethod}
              fullWidth
              size="large"
            >
              Proceed to Pay
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!paymentMethod}
              fullWidth
              size="large"
            >
              Rent the Item
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
