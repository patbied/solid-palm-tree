import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Message from './Message'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import axios from 'axios'
// import { useMutation } from '@tanstack/react-query'
// import axios from 'axios'
const OrderRow = ({order,refetchFn}) => {

    const userInfo = useSelector(state => state.user.userInfo)

    useEffect(() => {
        // console.log(userInfo?.token)
    },[])
    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
      }

    const deliveredRequest = async() => {
        const {data} = await axios.put('/api/orders/deliver/'+order?._id,{},config)
        // console.log(data)
        return data
    }

    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['delivered',order.id],
        mutationFn: deliveredRequest,
        staleTime: 120000,
        onSuccess: (data) => {
            refetchFn()
        }
      })
        const deliverHandler = () => {
            mutate()
        }

    

  return (
    <tr>
                        
                        <td>{order?._id}</td>
                        <td>{order?.user?.id}</td>
                        <td>{dayjs(order?.createdAt).format("DD/MM/YYYY")}</td>
                        <td>{order.isPaid ? 'Yes' : 'No'}</td>
                        <td>{order.isDelivered ? dayjs(order?.deliveredAt).format("DD/MM/YYYY") : 'No.' }</td>
                        <td>
                    
                            <Button variant='success' className='btn-sm' onClick={deliverHandler} disabled={order?.isDelivered}>
                                Mark as delivered.
                                {/* Delete <i className='fas fa-trash'/> */}
                            </Button>
                
                        </td>
                    </tr>
  )
}

export default OrderRow