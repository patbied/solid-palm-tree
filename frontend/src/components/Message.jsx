import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({variant,children, err}) => {
  return (
    <Alert variant={variant} dismissible>
      {/* { (status == 404) ?
       'Not found. Error 404.' 
       :  */}
       {children}
       {/* } */}
      {/* <p>
        {err.response.data['password'] ? 'Password is incorrect' : ''}
      </p>
      <p>
        {err.response.data['username'] ? 'Email is incorrect' : ''}
        </p> */}

    </Alert>
  )
}

export default Message