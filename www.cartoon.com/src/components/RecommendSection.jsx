import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";

const RecommendSection = ({setLoader}) => {
  const [array,setArray] = useState([]);
  const xyz = async()=> {
    setLoader(true);
    const response = await fetch('http://localhost:4500/api/product/getRecommendations',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: 'Harry Potter and the Prisoner of Azkaban (Book 3)'})
    });
    const data = await response.json();
    setArray(data);
    setLoader(false);
  }
  useEffect(()=>{
    xyz();
  },[])
  return (
    <div className="productCardContainer">
      <h1 className="recommendedH1">Recommended For You</h1>
      {array.map((product,index)=>
        <ProductCard data={product} key={index} />
      )}
    </div>
  );
};

export default RecommendSection;
