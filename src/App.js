import React, {useState, useEffect} from 'react'
import { commerce } from './lib/commerce'
import {Products, Navbar} from './components'

function App() {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  console.log(products);

  return (
    <div>
      <Products products={products}/>
      <Navbar/>
    </div>
  )
}

export default App

