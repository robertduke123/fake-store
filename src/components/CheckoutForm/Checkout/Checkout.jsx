import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel,Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './style'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [ checkoutToken, setCheckoutToken] = useState(null)
    const [ shippingData, setShippingData ] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles()
    const navigate = useNavigate()

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token)  
            } catch(error) {
                console.log(error);
                navigate('/')
            }
        }
        cart.id && generateToken()
    }, [])

    const nextStep = () => setActiveStep((prevState) => prevState + 1)
    const prevStep = () => setActiveStep((prevState) => prevState - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }


  return (
    <>
    <CssBaseline/>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant='h4' align='center'>Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )))}
            </Stepper>
            {activeStep === steps.length ?
            error ? 
                <>
                    <Typography variant='h5'>Error: {error}</Typography>
                    <br/>
                    <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
                </> :
                order.customer ?
                isFinished ? 
                <>
                    <div>
                        <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                        <Divider className={classes.divider}/>
                        <Typography>Order ref : {order.customer_reference}</Typography>
                    </div>
                    <br/>
                    <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
                </> :
                <div className={classes.spinner}>
                    <CircularProgress/>
                </div> :
                 <>
                    <div>
                        <Typography variant='h5'>Thank you for your purchase</Typography>
                        <Divider className={classes.divider}/>
                    </div>
                    <br/>
                    <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
                </> :
                activeStep === 0 ?
                <AddressForm
                 checkoutToken={checkoutToken !== null && checkoutToken} 
                 next={next}/> :
                <PaymentForm 
                checkoutToken={checkoutToken !== null && checkoutToken} 
                shippingData={shippingData} 
                prevStep={prevStep}
                onCaptureCheckout={onCaptureCheckout}
                nextStep={nextStep}
                timeout={timeout}
                />
            }
        </Paper>
      </main>
    </>
  )
}

export default Checkout
