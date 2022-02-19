import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() =>{
    axios.get('https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products')
    .then((response) => {
        console.log(response.data)
        setProducts(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
  },[])

  return (
    <div>
        <h1> Products List : </h1>
        {
            products.map(product => 
                (<ProductCard data={product}/>)
            )
        }
    </div>
  )
}

export default Products