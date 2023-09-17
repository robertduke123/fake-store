import React, {useState, useEffect} from 'react'
import { commerce } from './lib/commerce'
import {Products, Navbar, Cart, Checkout} from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const fetchProduct = async () => {
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async(productId, quantity) => {
    await commerce.cart.add(productId, quantity)
    setCart(fetchCart())
  }

  const handleUpdateCart = async(productId, quantity) => {
    await commerce.cart.update(productId, {quantity})
    setCart(fetchCart())
  }

  const handleRemoveFromCart = async(productId) => {
    await commerce.cart.remove(productId)
    setCart(fetchCart())
  }

  const handleEmptyCart = async() => {
    await commerce.cart.empty()
    setCart(fetchCart())
  }

  useEffect(() => {
    fetchProduct()
    fetchCart()
  }, [])

  console.log(cart);
  
  return (
    <div>
      <Router>
        <Navbar totalItems={cart && cart.total_items}/>
        <Routes>
          <Route exact path='/' element={
            <Products products={products} onAddToCart={handleAddToCart}/>
          }/>
          <Route exact path='/cart' element={
            <Cart 
              cart={cart}
              onUpdateCart={handleUpdateCart}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          }/>    
          <Route exact path='/checkout' element={
            <Checkout products={products} onAddToCart={handleAddToCart}/>
          }/>  
        </Routes>          
      </Router>      
    </div>
  )
}

export default App

