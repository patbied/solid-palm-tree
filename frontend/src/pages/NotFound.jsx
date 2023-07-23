import React from 'react'
import { useRouteError } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
const NotFound = props => {
    const error = useRouteError()
  return (
    <> 
    <Header/>
    <div className='text-center'>
        <h3>An error has occured</h3>
        <p>{error.statusText || error.message}</p>
    </div>
    <Footer/>
    </>
  )
}



export default NotFound