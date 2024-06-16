import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import {useNavigate} from 'react-router-dom'

const MyProducts = () => {
  const [array,setArray] = useState([]);
  const navigateTo =  useNavigate();
  let xyz = async(vendorId) => {
    const response = await fetch('http://localhost:4500/api/product/findByVendor',
    {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({vendor: vendorId}),
    });
    const data = await response.json();
    setArray(data);
  }
  useEffect(()=> {
    const vendorId = localStorage.getItem('vendorId');
    if(!vendorId)
    {
      navigateTo('/login');
      return;
    }
    xyz(vendorId);;
  },[])
  return (
    <div className='card-container'>
      {array.map(({productId,title,image,price,discount,brand,reviews}) => 
        <Card
          img={image}
          key={productId}
          title={title}
          reviews={`(${reviews.length} Reviews)`}
          company={brand}
          prevPrice={price}
          newPrice={`${price - (price * discount / 100)} Rs.`}
          productId={productId}
        />
      )}
    </div>
  )
}

export default MyProducts