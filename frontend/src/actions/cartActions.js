import axios from 'axios'
// import { CART_ADD_ITEM } from '../constants/cartConstants'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS,SAVE_PAYMENT_METHOD } from '../slices/cartSlice'

export const addToCart = (id,qty) => async(dispatch, getState) => {
    const {data} = await axios.get('/api/products/'+id+'/')
    dispatch(CART_ADD_ITEM({ 
           product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty

        }))
    // console.log(getState().cart_add_item.cartItems)
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    
}

export const cartRemove = (id) => async(dispatch,getState) => {
    dispatch(CART_REMOVE_ITEM(id))
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async(dispatch) => {
    // console.log(data)
    dispatch(SAVE_SHIPPING_ADDRESS(data))
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = (data) => async(dispatch) => {
    // console.log(data)
    dispatch(SAVE_PAYMENT_METHOD(data))
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}