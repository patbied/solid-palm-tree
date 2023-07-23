import { useEffect, useState } from "react"
import {Link, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import dayjs from 'dayjs'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
// import { addToCart } from "../actions/cartActions"
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import Loader from "../components/Loader"
import useOrder from "../hooks/useOrder"
import { PayPalButtons } from "@paypal/react-paypal-js"

const OrderPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const userInfo = useSelector(state => state.user.userInfo)
    const {isLoading, isError, isSuccess, error, data, refetch} = useOrder(id,userInfo?.token)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentError, setPaymentError] = useState(false)

    let formattedDate = dayjs(data?.paidAt).format("DD/MM/YYYY hh:mm:ss A")
    let formattedDeliveryDate = dayjs(data?.deliveredAt).format("DD/MM/YYYY hh:mm:ss A")
    let itemsPrice = data?.orderItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    let paypalPrice = `${data?.totalPrice}`
    const config = {
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo?.token}`
        } 
    }
    const payForProduct = async() => {
        const result = await axios.put(`/api/orders/${data?._id}/pay/`,{},config)
        const resultData = await result.data
        refetch()
        return resultData
    }
    useEffect(() => {
        if (error?.response?.status === 500){
            navigate('/')
        }
    },[error])
    if (isLoading){
        return (
          <Loader/>
        )
      }

      if (isSuccess){
        // console.log(data )
      }
  return (
    <div>
         {isError 
        ?
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}   
        {paymentSuccess && <Message variant="success">Payment processed.</Message>}
        {paymentError && <Message variant="danger">Payment error.</Message>}
             <Row>
            <h1>Order ID: {data?._id}</h1>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{data?.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${data?.user.email}`}>{data?.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {data?.shippingAddress.address}, {data?.shippingAddress.city}
                            {' '}
                            {data?.shippingAddress.postalCode},
                            {' '}
                            {data?.shippingAddress.country}
                        </p>
                        {data?.isDelivered ? (
                            <Message variant="success">Delivered on {formattedDeliveryDate}</Message>
                        ): (
                            <Message variant="warning">Not delivered yet.</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p>
                            <strong>Method: </strong>
                            {data?.paymentMethod}
                        </p>
                        {data?.isPaid ? (
                            <Message variant="success">Paid on {formattedDate}</Message>
                        ): (
                            <Message variant="warning">Not paid.</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {data?.orderItems.length === 0 ? <Message variant='info'>
                            Order is empty.
                        </Message> :(
                            <ListGroup variant='flush'>
                                {data?.orderItems.map((item, index) => (
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
                                <Col>${data?.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${data?.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${data?.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!data?.isPaid ? (
                            <ListGroup.Item> 
                            {/* <Button type="btn" onClick={payForProduct}>PAY</Button> */}
                            <PayPalButtons 
                            onApprove={(data,actions) => {
                                    return actions.order.capture().then(details => {
                                        try {
                                            payForProduct()
                                            setPaymentSuccess(true)
                                        } catch(err){
                                            setPaymentError(true)
                                        } finally{
                                            console.log("Trans " + details.id + " " + details.status)
                                        }
                                        
                                    })
                            }} 
                            createOrder={(data,actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: paypalPrice,
                                                
                                            },
                                        },
                                    ]
                                })
                            }}/>
                            </ListGroup.Item>
                        ): (
                            ''
                        )}
                    </ListGroup>
                </Card>
                

            </Col>
        </Row>
    </div>
  )
}

export default OrderPage