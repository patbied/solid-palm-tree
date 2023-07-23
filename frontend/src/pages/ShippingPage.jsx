import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
 

const ShippingPage = () => {

    const {shippingAddress} = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postalCode, setpostalCode] = useState(shippingAddress?.postalCode)
    const [country, setcountry] = useState(shippingAddress?.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

const submitHandler = (e) => {
    e.preventDefault()
    console.log(address,city,postalCode,country)
    const data = {address,city,postalCode,country}
    dispatch(saveShippingAddress(data))
    navigate('/payment')
}
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control required type='text' placeholder='Enter address:' value={address ? address : ''} onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control required type='text' placeholder='Enter city:' value={city ? city : ''} onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control required type='text' placeholder='Enter postal Code:' value={postalCode ? postalCode : ''} onChange={(e) => setpostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control required type='text' placeholder='Enter country:' value={country ? country : ''} onChange={(e) => setcountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            

            <Button type="submit" variant='primary' className='mt-2 w-100'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingPage