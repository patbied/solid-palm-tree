import { useState } from 'react'
import { HomeScreen } from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import CartScreen from './pages/CartScreen.jsx'
import NotFound from './pages/NotFound'
import Root from './pages/Root'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import ViewUser from './pages/ViewUser'
import ProductListPage from './pages/ProductListPage'
import CreateProductPage from './pages/CreateProductPage'
import OrderListPage from './pages/OrderListPage'
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const App = () => {



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <NotFound/>,
      children: [
        {
          path: '/',
          element: <HomeScreen/>,
        },
        {path: '/products/:id',
        element: <ProductScreen/>
        },{
          path: '/cart/:id?',
          element: <CartScreen/>
        },{
          path: '/login',
          element: <LoginPage/>
        },{
          path: '/register',
          element: <RegisterPage/>
        },{
          path: '/profile',
          element: <ProfilePage/>
        },{
          path: '/shipping',
          element: <ShippingPage/>
        },{
          path: '/payment',
          element: <PaymentPage/>
        },{
          path: '/placeorder',
          element: <PlaceOrderPage/>
        },{
          path:'/order/:id',
          element: <OrderPage/>
        },{
          path:'/admin',
          children: [
            {
              path: '/admin/users',
              element: <UserListPage/>
            },
            {
              path: '/admin/user/:id',
              element: <ViewUser/>
            },
            {
              path: '/admin/products',
              element: <ProductListPage/>,
            },
            {
              path:'/admin/products/create',
              element: <CreateProductPage/>
            }, {
              path: '/admin/orders',
              element: <OrderListPage/>
            }
                
              

            
          ]
        }
      ]
    }
  ])
  return (
    <div>

          <RouterProvider router={router}/>

    </div>
    // <BrowserRouter>
    //   <Header/>
    //   <main className='py-3'>
    //     <Container>
    //     <Routes> 
    //       <Route path="/" element={<HomeScreen/>}/>
          
    //     </Routes>
    //     </Container>
    //   </main>
    //   <Footer/>
    // </BrowserRouter>
  )
}

export default App
