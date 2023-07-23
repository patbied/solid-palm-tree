import React, {useState, useEffect} from 'react'
import { Link, redirect, useLocation,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { USER_LOGIN } from '../slices/userSlice'
const LoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        // loginRequest()
        mutate()
    }

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userInfo = useSelector(state => state.user.userInfo)
   
  

    const config = {
        headers: {
            'Content-type':'application/json',
        } 
    }
    const loginRequest = async() => {
        const {data} = await axios.post('/api/users/login/',JSON.stringify({'username':email,'password':password}),config)
        // console.log(data)
        return data
    }
    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['login'],
        mutationFn: loginRequest,
        staleTime: 120000,
        onSuccess: (data) => {
            localStorage.setItem('userInfo',JSON.stringify(data))
            dispatch(USER_LOGIN(data))
            // navigate(redirect)
        },
        onError: (err) => {
            console.log(err.response.data)
        }
      })
      
      useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
        // if (isSuccess){
        //     // console.log(data)
        //     dispatch(USER_LOGIN(data))
            
        //   }
    },[userInfo])
      if (isLoading){
        return(
            <Loader/>
        )
      }
     
     
    //   if (isError){
    //     console.log(error.response.data['password'])
    //   }
  return (
    <FormContainer>
        {isError 
        ?
        <Message variant='danger'err={error}>
        <p> 
        {error?.response?.data['username'] && 'Username: ' + error?.response?.data['username'] }
        </p>
        <p> 
        {error?.response?.data['password'] && 'Password: ' + error?.response?.data['password'] }
        </p>
        <p> 
        {error?.response?.data['detail'] && error?.response?.data['detail'] }
        </p>
        {/* <p> 
        {error.message}
        </p> */}
        </Message> 
        
        : 
        ''}
        
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='text' placeholder='Enter email:' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password:' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' className='mt-2 w-100' variant='primary'>Login</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginPage