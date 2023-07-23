import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const Root = () => {
  return (
    <>
    <Header/>
        <main className='py-3'> 
        <Container> 
            <Outlet/>
        </Container>
        </main>
    <Footer/>
    </>
  )
}

export default Root