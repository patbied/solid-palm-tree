import React from 'react'
import useOrders from '../hooks/useOrders'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import {Button, Table } from 'react-bootstrap'
import dayjs from 'dayjs'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from './Loader'
import Message from './Message'
const MyOrders = () => {
    const userInfo = useSelector(state => state.user.userInfo)
    
    const {isLoading, isError, isSuccess, error, data} = useOrders(userInfo?.token)
    if (isLoading){
        return (
          <Loader/>
        )
      }

      if (isSuccess){
        // console.log(data)
      }
  return (
    <>{isError 
        ?
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
        
        <Table striped responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {data.map((order,index) => ( 

                    <tr key={index}>
                        <td>{order._id}</td>
                        <td>{dayjs(order.createdAt).format("DD/MM/YYYY")}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid ? dayjs(order.paidAt).format("DD/MM/YYYY") : <i className='fas fa-times' style={{color: 'red'}}/>}</td>
                        <td>{order.isDelivered ? dayjs(order.deliveredAt).format("DD/MM/YYYY") : <i className='fas fa-times' style={{color: 'red'}}/>}</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm'>Details</Button>
                            </LinkContainer>
                        </td>
                    </tr>
                    ))}
            </tbody>
        </Table>
        </>

  )
}

export default MyOrders