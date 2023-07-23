import React, {useState, useEffect} from 'react'
import { Link, redirect, useLocation,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useMutation } from '@tanstack/react-query'
import { USER_LOGIN } from '../slices/userSlice'
import axios from 'axios'

const RegisterPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState()
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userInfo = useSelector(state => state.user.userInfo)

    const config = {
        headers: {
            'Content-type':'application/json',
        } 
    }
    const registerRequest = async() => {
        const {data} = await axios.post('/api/users/register/',JSON.stringify({'name':name,'email':email,'password':password,'confirmPassword':confirmPassword}),config)
        return data
    }
    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['register'],
        mutationFn: registerRequest,
        staleTime: 120000,
        onSuccess: (data) => {
            // console.log(data)
            localStorage.setItem('userInfo',JSON.stringify(data))
            dispatch(USER_LOGIN(data))
            navigate(redirect)
        },
        onError: (err) => {
            console.log(err)
        }
      })

      const submitHandler = (e) => {
        e.preventDefault()
        // if (confirmPassword != password){
            
        //     setMessage("Passwords do not match")
        // } else {
            mutate()
        // }
      }
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo])
  return (
    <FormContainer>
        {isError && error?.response?.data?.errs
        ?
        <Message variant='danger'err={error}>
        {error?.response?.data?.errs?.map((err,index) => (
            <span key={index}>{err}<br/></span>
        ))}
        </Message> 
        : 
        ''}
        
        {isLoading ? <Loader/> : ( 
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control  type='name' placeholder='Enter name:' value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control  type='text' placeholder='Enter email:' value={email} onChange={(e) => setEmail(e.target.value)}>
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
            <Button type='submit' className='mt-2 w-100' variant='primary'>Register</Button>

        </Form>
        )}
        <Row className='py-3'>
            <Col>
                Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterPage