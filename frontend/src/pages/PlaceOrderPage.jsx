import React from 'react'
import {useNavigate,Link } from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import CheckoutSteps from '../components/CheckoutSteps'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CLEAR_CART } from '../slices/cartSlice'

const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userInfo = useSelector(state => state.user.userInfo)
    const orderItems = useSelector(state => state.cart.cartItems )
    const paymentMethod = useSelector(state => state.cart.paymentMethod)
    const shippingAddress = useSelector(state => state.cart.shippingAddress)
    
    let itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    let shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
    let taxPrice = ((0.082) * Number(itemsPrice)).toFixed(2)
   
    let total = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
    


    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
    }
    const placeOrder = async() => {
        const dataToSend = {
            orderItems,
            paymentMethod,
            shippingAddress,
            shippingPrice,
            taxPrice,
            totalPrice: total,
        }
        const {data} = await axios.post('/api/orders/add/',JSON.stringify(dataToSend),config)
        return data
    }

    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['create-order'],
        mutationFn: placeOrder,
        staleTime: 120000,
        onSuccess: (data) => {
            // console.log(data)
            navigate(`/order/${data._id}`)
            localStorage.removeItem('cartItems')
            dispatch(CLEAR_CART())
            
        }
      })
    const orderHandler = (e) => {
        e.preventDefault()
            mutate()
    }

    if (isLoading){
        return(
            <Loader/>
        )
      }

  return (
    <div>
         {isError 
        ?
        <Message variant='danger'err={error}>
        {error?.response?.status === 401 ? (
            'You must be logged in to place an order.'
        ) : ( 
        'An error was encountered.'
        )}
        </Message> 
        : 
        ''}
        <CheckoutSteps step1 step2 step3 step4/>
        {!userInfo && ( 
        <Message variant='warning'>
            You must be logged in to create this order. <Link to="/login">Login here</Link>
        </Message>
        )}
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>
                            Your cart is empty.
                        </Message> :(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            
                                            <Col>
                                            <Link to={`/products/${item.product}/`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${total}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' className='w-100' disabled={cart.cartItems === 0 || !userInfo} onClick={orderHandler}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderPage