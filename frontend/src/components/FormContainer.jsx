import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
const FormContainer = ({children}) => {
  return (
    <Container className='d-flex justify-content-center'>
        <Row ></Row>
            <Col xs={12} md={6}> 
                {children}        
            </Col>
    </Container>
  )
}

export default FormContainer