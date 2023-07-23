import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useMutation  } from '@tanstack/react-query'
import { UPDATE_USER } from '../slices/userSlice'
import axios from 'axios'
import MyOrders from '../components/MyOrders'

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState()
    const [name, setName] = useState('')
    

    const userInfo = useSelector(state => state.user.userInfo)
    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else{
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    },[userInfo])
    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
}
  
    const updateRequest = async() => {
        const {data} = await axios.put('/api/users/profile/update/',JSON.stringify({'id':userInfo._id,'name':name,'email':email,'password':password}),config)
        return data
    }
    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['update'],
        mutationFn: updateRequest,
        staleTime: 1,
        onSuccess: (data) => {
            console.log(data)
            localStorage.setItem('userInfo',JSON.stringify(data))
            dispatch(UPDATE_USER(data))
        }
      })

      const submitHandler = (e) => {
        e.preventDefault()
        if (password == confirmPassword){
            mutate()
        }
      }


      if (isLoading){
        return(
            <Loader/>
        )
      }

  return (
    <Row>
        {isError 
        ?
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required type='name' placeholder='Enter name:' value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control required type='text' placeholder='Enter email:' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control  type='password' placeholder='Enter password:' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control  type='password' placeholder='Confirm password:' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' className='mt-2 w-100' variant='primary'>Update Account</Button>

        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders </h2>
            <MyOrders/>
        </Col>
    </Row>
  )
}

export default ProfilePage