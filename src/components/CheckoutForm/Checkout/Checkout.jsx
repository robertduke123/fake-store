import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel,Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './style'

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()
    const steps = ['Shipping address', 'Payment details']

  return (
    <>
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
                <div>
                    Confirmation
                </div> :
                activeStep === 0 ?
                <AddressForm/> :
                <PaymentForm/>
            }
        </Paper>
      </main>
    </>
  )
}

export default Checkout
