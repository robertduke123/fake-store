import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles'

const Cart = ({cart}) => {
    const classes = useStyles()

    if(!cart.line_items) return 'Loading...'

  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} varient='h3'> Your Shopping Cart</Typography>
      {!cart.line_items.length ?       
      <Typography varient='subtitle1'>You have no items in your shopping cart, start adding some!</Typography> : 
      <>
            <Grid container spcing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <div>{item.name}</div>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h3'> Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>EmptyCart</Button>
                    <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                </div>
            </div>
        </>
      }
    </Container>
  )
}

export default Cart
