import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, ListGroup } from 'react-bootstrap'
import Rating from './Rating'
import dayjs from 'dayjs'
const ReviewComponent = ({review}) => {

  return (
    <ListGroup.Item>
       <strong>{review.name}</strong> 
       <Rating value={review.rating} color='#f8e825'/>
       <p>{dayjs(review.createdAt).format('DD-MM-YYYY')}</p>
       <p>{review.comment}</p>
    </ListGroup.Item>
  )
}

export default ReviewComponent