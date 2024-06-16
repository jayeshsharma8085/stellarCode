import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = ({ setLoader }) => {
  const navigate = useNavigate();
  // const cart = {
  //   cartItems: [
  //     {
  //       id: 1,
  //       name: "Product 1",
  //       price: 100,
  //       quantity: 2,
  //     },
  //     {
  //       id: 2,
  //       name: "Product 2",
  //       price: 50,
  //       quantity: 1,
  //     },
  //   ],
  //   cart: {
  //     totalItem: 3,
  //     totalPrice: 250,
  //     discount: 25,
  //     totalDiscountedPrice: 225,
  //   },
  // };

  const [cart, setCart] = useState([]);
  const [final, setFinal] = useState([]);

  const xyz = async () => {
    const response = await fetch("http://localhost:4500/api/user/getCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    });
    const data = await response.json();
    setCart(data);
    let finalqty = 0;
    let price = 0;
    for (let i = 0; i < data.length; i++) {
      finalqty = finalqty + data[i].qty;
      const response2 = await fetch('http://localhost:4500/api/product/findByProductId',{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({productId:data[i].product})  
      });
      const data2 = await response2.json();
      let actualPrice = data2.price - (data2.price*data2.discount/100);
      price = price + (actualPrice * data[i].qty);
      console.log(price);
    }
    setFinal({ qty: finalqty, total: parseInt(price).toFixed(2) });
  };

  useEffect(() => {
    xyz();
  }, []);

  return (
    <div className="cartOuter">
      {cart.length > 0 && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} showButton={true} />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Price ({final.qty} item)</span>
                  <span>₹{final.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Additional Discount</span>
                  <span className="text-green-700">-₹{cart.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    ₹{final.total}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/address?step=2")}
                variant="contained"
                type="submit"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              >
                Buy
              </Button>
              <Button
                onClick={() => navigate("/address?step=2")}
                variant="contained"
                type="submit"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              >
                Rent it Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
