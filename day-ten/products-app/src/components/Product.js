import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Product() {
  let params=useParams()
  const [product, setProduct] = useState({})

  useEffect(() =>{
    axios.get(`https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products/${params.id}`)
    .then((response) => {
        console.log(response.data)
        setProduct(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
  },[])

  return (
    <>
        <h1> Product Info : </h1>
        <ProductCard data={product}/>
    </>
  )
}

export default Product