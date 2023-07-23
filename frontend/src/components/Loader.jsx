import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = ({size}) => {
  return (
        <Spinner animation="grow" role='status' size={size ? size : ''} style={{height:'100px',width:'100px',margin:'auto',display:'block'}}>
            {/* <span className='sr-only'>Loading...</span> */}
        </Spinner>
  )
}

export default Loader