import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, useNavigate } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import AddReviewComponent from '../components/AddReviewComponent'
import ReviewComponent from '../components/ReviewComponent'

const ProductScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)
    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const [addedToCart, setAddedToCart] = useState(false)
    const {isLoading, isError, isSuccess, error, data,refetch} = useProduct(id)

    const addToCartHandler = () => {
        dispatch(addToCart(id,qty))
        setAddedToCart(true)
        // navigate(`/cart/${id}?qty=${qty}`)
    }
  
    if (isLoading){
        return (
          <Loader/>
        )
      }
    
      if (isError){
        return( 
          <Message variant="danger" status={error.response.status}>
            {error.message}
          </Message>
        )
      }
      if (isSuccess){
        // console.log(data)
      }

    const inStock = data.countInStock > 0;

    
  return (
    <div>
        <Button onClick={() => navigate(-1)} className='btn btn-light my-3'>Go back</Button>
        {addedToCart ? <Message variant="success">Added to cart. View <Link to='/cart'>Cart</Link></Message> : ''}
        <Row>
            <Col md={6}>
                <Image src={`${data.image}`} alt={data.name} fluid/>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        {data.name}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={data.rating} text={`${data.numReviews} reviews`} color={'#f8e825'}/>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: ${data.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {data.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price</Col>
                                <Col><strong>{data.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status</Col>
                                <Col>
                                {inStock ? <strong>In Stock.</strong> : <strong>Out Of Stock.</strong> }
                                
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {inStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                
                                <Col>Qty:</Col>
                                {!isError && data && isSuccess ? ( 
                                <Col xs='auto' className='my-1'>
                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(data.countInStock).keys()].map((x) => (
                                                <option key={x} value={x+1}>{x+1}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                                ) : ('')}
                            </Row>
                        </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                           <Button onClick={addToCartHandler} className="btn-block w-100" disabled={!inStock} type="button">Add to Cart.</Button>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                
                <ListGroup variant='flush'>
                                        
                <h4>Reviews</h4>
                
                {!isError && data && isSuccess ? ( 
                    <> 
                    {userInfo ? <AddReviewComponent prodId = {data?._id} refetchFn={refetch} userId={userInfo?.id}/> : ''}
                    
                    {data?.reviews.map((review) => (
                        <ReviewComponent key={review?._id} review={review}/>
                    ))}
                     </>
                ) : ('')}
               
    
                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default ProductScreen