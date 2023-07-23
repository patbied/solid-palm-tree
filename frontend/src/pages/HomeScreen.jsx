import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import useProducts from '../hooks/useProducts'
import Loader from '../components/Loader'
import Message from '../components/Message'
export const HomeScreen = () => {

  // const dispatch = useDispatch()

  const {isLoading, isError, isSuccess, error, data} = useProducts()

  

  // if (isSuccess){
  //   dispatch(product_list_success(data))
  // }

  if (isLoading){
    return (
      <Loader/>
    )
  }

  if (isError){
    return( 
      <Message variant="danger">
        {error.message}
      </Message>
    )
  }
  return (
    <div>
        <h1>Latest Products!</h1>
        <Row>
            {/* {!isError && data  ? (data?.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))) : ""} */}
        </Row>
        
    </div>
  )
}

