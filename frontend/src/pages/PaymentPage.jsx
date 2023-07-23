import React, {useState, useEffect} from 'react'
import {redirect, useLocation,useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useMutation } from '@tanstack/react-query'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {paymentMethod} = useSelector(state => state.cart)
    const {shippingAddress} = useSelector(state => state.cart)

    const [paymentMethod2, setpaymentMethod2] = useState('Paypal')

    if (!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod2))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payments</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Payment method</Form.Label>
                <Col>
                    <Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod" checked onChange={(e) => setpaymentMethod2(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            

            <Button type="submit" variant='primary' className='mt-2 w-100'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentPage