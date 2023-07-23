import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
const ViewUser = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)

    const {isLoading, isError, isSuccess, error, data, refetch} = useUser(id,userInfo?.token)
    useEffect(() => {
        if (!userInfo.isAdmin){
            navigate('/')
        }
    },[userInfo])

  return (
    <>
    
    <Row>
        <ListGroup>
        <ListGroup.Item>
                <h2>{data?.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
                ID: {data?.id}
            </ListGroup.Item>
            <ListGroup.Item>
                Email: {data?.email}
            </ListGroup.Item>
            <ListGroup.Item>
                Status: {data?.isAdmin ? 'Admin' : 'User'}
            </ListGroup.Item>
        </ListGroup>
        <ListGroup className='mt-5'>
            <ListGroup.Item>
               <h2>Orders</h2>
            </ListGroup.Item>

        </ListGroup>
    </Row>
    </>
  )
}

export default ViewUser