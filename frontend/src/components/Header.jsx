import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../slices/userSlice';
const Header = () => {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const userInfo = useSelector(state => state.user.userInfo)
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    dispatch(USER_LOGOUT())
    navigate('/')
  }

  // console.log(userInfo)

  
  const {cartItems} = cart
  useEffect(() => {
    setQuantity(cartItems.reduce((acc,item) => acc+Number(item.qty),0))
    
    // console.log(userInfo)
    // console.log(userInfo.name)
  },[cart, userInfo])
  return (
    <header>
    <Navbar expand="md" bg="dark" variant='dark' >
        <Container> 
          <LinkContainer to="/"> 
          <Navbar.Brand className='ml-1'>Ecommerce Site</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <LinkContainer to="/cart"> 
              <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart({quantity})</Nav.Link>
            </LinkContainer>
            {userInfo?.isAdmin && (
                 <NavDropdown title="Admin Menu" id="username">
                 <LinkContainer to='/admin/users/'>
                   <NavDropdown.Item>Users</NavDropdown.Item>
                 </LinkContainer>  
                 <LinkContainer to='/admin/products/'>
                   <NavDropdown.Item>Products</NavDropdown.Item>
                 </LinkContainer> 
                 <LinkContainer to='/admin/orders/'>
                   <NavDropdown.Item>Orders</NavDropdown.Item>
                 </LinkContainer> 
                 </NavDropdown>
              )}
            {userInfo ? ( 
              <> 
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>  
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
             
             
             </>
            ): ( 
              <> 
            <LinkContainer to="/login"> 
              <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Register"> 
            <Nav.Link><i className='fas fa-user'></i>Register</Nav.Link>
          </LinkContainer>
          </>
            )}
            </Nav>
          </Navbar.Collapse>
          </Container>
    </Navbar>
    </header>
  )
}

export default Header





