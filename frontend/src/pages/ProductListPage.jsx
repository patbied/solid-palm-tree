import React, { useEffect } from 'react'
import ProductsRow from '../components/ProductsRow'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { Link, useNavigate } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
const ProductListPage = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)

    const {isLoading, isError, isSuccess, error, data, refetch} = useProducts()

    
    


    useEffect(() => {
      if (error?.response?.status === 403 || !userInfo?.isAdmin){
        navigate('/')
      }
    

    }, [error])
    
    
    if (isLoading){
        return (
        <Loader/>
        )
    }
if (isSuccess){
    // console.log(data)
}

    // if (isSuccess){ 
    return (
        <div>
    {isError 
        ? 
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <LinkContainer to='/admin/products/create'> 
                <Button className='my-3'>Create product <i className='fas fa-plus'></i></Button>
                </LinkContainer>
            </Col>
        </Row>
        <Table striped bordered hover style={{maxHeight:'100px !important'}} responsive className='table-sm'>
            <thead>
                <tr> 
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((product) => (
    
                <ProductsRow key={product._id} product={product} refetchFn={refetch}></ProductsRow>
               
                ))}
            </tbody>
        </Table>
        </div>
    )
    }
// }

    export default ProductListPage