import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { ListGroup, Form, Button} from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import Message from './Message'
import axios from 'axios'
const AddReviewComponent = ({prodId,refetchFn,userId}) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const [qty, setQty] = useState('')
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')


    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
      }

    const addReviewRequest = async() => {
        const {data} = await axios.post('/api/products/review/'+prodId+'/',JSON.stringify({'rating':rating,'comment':comment}),config)
        // console.log(data)
        return data
    }

    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['addReview',userInfo?.id,prodId],
        mutationFn: addReviewRequest,
        staleTime: 120000,
        onSuccess: (data) => {
            refetchFn()
        }
      })
    const submitHandler = (e) => {
        e.preventDefault()
        mutate()
    }
  return (
    <ListGroup.Item>
        {isError 
        ?
        <Message variant='danger'err={error}>
        {error.response.data}
        </Message> 
        : 
        ''}
         {isSuccess 
        ?
        <Message variant='success'err={error}>
        Review added.
        </Message> 
        : 
        ''}
        <h4>Write a review</h4>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='comment'>
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' rows='5' value={comment} onChange={(e) => setComment(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button disabled={isLoading} className='my-2' type='submit'>Add Review</Button>
        </Form>
    </ListGroup.Item>
  )
}

export default AddReviewComponent