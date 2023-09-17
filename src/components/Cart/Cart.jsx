import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import CartItem from './CartItem/CartItem'

import useStyles from './styles'
import { Link } from 'react-router-dom'

const Cart = ({cart, onUpdateCart, onRemoveFromCart, onEmptyCart }) => {
    const classes = useStyles()

    if(cart && !cart.line_items) return 'Loading...'

  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} varient='h3' gutterBottom> Your Shopping Cart</Typography>
      {cart && !cart.line_items.length ?       
      <Typography varient='subtitle1'>You have no items in your shopping cart, 
        <Link to='/' className={classes.link}>start adding some!</Link>
      </Typography> : 
      <>
            <Grid container spcing={3}>
                {cart && cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCart={onUpdateCart} onRemoveFromCart={onRemoveFromCart }/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h3'> Subtotal : {cart && cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={onEmptyCart}>EmptyCart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                </div>
            </div>
        </>
      }
    </Container>
  )
}

export default Cart
