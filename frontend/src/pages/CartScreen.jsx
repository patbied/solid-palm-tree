import { useEffect } from "react"
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
// import { addToCart } from "../actions/cartActions"
import {addToCart, cartRemove } from "../actions/cartActions.js"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
const CartScreen = () => {

 const {id} = useParams()
 const loc = useLocation()
 const qty = loc.search ? loc.search.split('=')[1]:1
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const cart = useSelector(state => state.cart)
 


 const {cartItems} = cart

 useEffect(() => {
  console.log(cartItems)
 },[cartItems])
//  useEffect(() => {
//   if (id){
//     dispatch(addToCart(id,qty))
//   }
 
//  },[dispatch,id,qty])

 const removeFromCartHandler = (id) => {
  dispatch(cartRemove(id))
 }
 const checkoutHandler = () => {
  navigate('/shipping')
 }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty. <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item,index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image src={`${item.image}`} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                      {
                          [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x} value={x+1}>{x+1}</option>
                          ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc+ Number(item.qty), 0)}) items</h2>
                ${cartItems.reduce((acc, item) => acc+ Number(item.qty) * item.price, 0).toFixed(2)}
              </ListGroup.Item>
         
          
          <ListGroup.Item>
            <Button type='button' className="btn-block w-100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen