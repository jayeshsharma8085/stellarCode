import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import '../styles/addressPage.css'

const CartItem = ({ item, showButton }) => {
  const handleRemoveItemFromCart = () => {
    // Function to remove item from cart (you can customize this as per your requirements)
    console.log("Item removed from cart:", item);
  };
  
  const [product,setProduct] = useState({
    title: 'Title',
    image: 'Image',
  });

  useEffect(()=> {
    xyz();
  },[])

  const xyz = async() => {
    const response = await fetch('http://localhost:4500/api/product/findByProductId',{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({productId:item.product})  
    });
    const data = await response.json();
    setProduct(data);
  }

  const handleUpdateCartItem = (num) => {
    // Function to update cart item (you can customize this as per your requirements)
    console.log("Item updated in cart:", item, "New quantity:", item.qty + num);
  };
  return (
    <div className=" checkoutAddressOuter p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={product.image}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          {<p className="font-semibold">{product.title}</p>}
          <p className="opacity-70 mt-2">Seller: {product.brand}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{parseInt(product.price).toFixed(2)}</p>
            <p className="font-semibold text-lg">₹{parseInt(product.price - (product.price*product.discount/100)).toFixed(2)}</p>
            <p className="text-green-600 font-semibold">{product.discount}% off</p>
          </div>
        </div>
      </div>
      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item.qty <= 1}
              color="primary"
              aria-label="decrease quantity"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">{item.qty}</span>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              aria-label="increase quantity"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button onClick={handleRemoveItemFromCart} variant="text">
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
