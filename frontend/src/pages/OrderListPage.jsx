import React, { useEffect } from 'react'
import useAllOrders from '../hooks/useAllOrders'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import OrderRow from '../components/OrdersRow'
const OrderListPage = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)
    const{isLoading, isError, isSuccess, error, data, refetch} = useAllOrders(userInfo.token)


    
    


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


 
    return (
        <div>
    {isError 
        ? 
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
      
        <h1>Orders</h1>
        <Table striped bordered hover style={{maxHeight:'100px !important'}} responsive className='table-sm'>
            <thead>
                <tr> 
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Date</th>
                    <th>Paid</th>
                    <th>Delivery Status</th>
                    <th>Set delivered</th>
                </tr>
            </thead>
            {isSuccess ? (
            <tbody>
                
                {data?.map((order) => (
                    
                <OrderRow key={order._id} order={order} refetchFn={refetch}></OrderRow>
               
                ))}
            </tbody>
            ) : ''}
        </Table>
        </div>
    )
    }

    export default OrderListPage