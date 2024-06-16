import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:4500/api/product/getAllProducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className='card-container'>
      {products.map(({ productId, title, image, price, discount, brand, reviews }) => (
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
      ))}
    </div>
  );
};

export default AllProducts;
