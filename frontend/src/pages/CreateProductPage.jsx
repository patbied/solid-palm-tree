import React, {useEffect, useState} from 'react'
import FormContainer from '../components/FormContainer'
import { useMutation } from '@tanstack/react-query'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
const CreateProductPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [cat, setcat] = useState('')
    const [desc, setDesc] = useState('')
    const [countInStock,setCountInStock] = useState('')
    const [file, setFile] = useState()
    
    const userInfo = useSelector(state => state.user.userInfo)
    const config = {
        headers: {
            'Content-type':'multipart/form-data',
            Authorization: `Bearer ${userInfo?.token}`
        } 
    }

    const createProductRequest = async() => {
        const toSend = {
            name,
            price,
            brand,
            category:cat,
            description:desc,
            countInStock:countInStock,
            image: file,
        }
        const {data} = await axios.post('/api/products/create/',toSend,config)
        return data
    }
    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProductRequest,
        onSuccess: ((data) => {
            // console.log("suc")
        }),
        onError: ((data) => {
            // console.log(data)
        })
      })

      useEffect(() => {
        if(!userInfo?.isAdmin){
            navigate('/')
        }
    },[userInfo])

    const submitHandler = (e) => {
        
        if (name && brand && cat && price && desc && countInStock && file){
            e.preventDefault()
            // console.log(file)
            
            mutate()
        }
        
    }
  return (
    <FormContainer>
         {isError 
        ?
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
         {isSuccess 
        ?
        <Message variant='success'err={error}>
        Product created.
        </Message> 
        : 
        ''}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required type='name' placeholder='Enter name:' value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control required label="Choose file" type='file' onChange={(e) => setFile(e.target.files[0])}>
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control required type='text' placeholder='Enter brand:' value={brand} onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control required type='text' placeholder='Enter category:' value={cat} onChange={(e) => setcat(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control required type='text' placeholder='Enter description:' value={desc} onChange={(e) => setDesc(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control required type='number' placeholder='Enter price:' value={price} onChange={(e) => setPrice(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='countinstock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control required type='number' placeholder='Enter count in stock:' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' className='mt-2 w-100' variant='primary'>Add Product</Button>
        </Form>
    </FormContainer>
  )
}

export default CreateProductPage