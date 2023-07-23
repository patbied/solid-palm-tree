import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems'))  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress'))  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
JSON.parse(localStorage.getItem('paymentMethod'))  : ""



const initialState = {
    // cart: {cartItems: cartItemsFromStorage}
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod:paymentMethodFromStorage
}


export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        CART_ADD_ITEM: (state, action) => {
            // console.log(action.payload)
            const item = action.payload
            const itemExists = state.cartItems.find(x => x.product === item.product)
            if (itemExists){
                return {
                    cartItems: state.cartItems.map(x =>
                    x.product === itemExists.product ? item : x
                    )
                }
                        }
                else {
                    state.cartItems.push(item)
                    // return{
                    //     ...state,
                    //     cartItems:[...state.cart.cartItems,item]
                    // }
            }
        },
        CART_REMOVE_ITEM: (state,action) => {
            const id = action.payload
            
            return {
                cartItems: state.cartItems.filter(x => x.product != id)
            }
            
        },
        CLEAR_CART: (state,action) => {
            state.cartItems = []
        },
        SAVE_SHIPPING_ADDRESS: (state,action) => {
            const data = action.payload
            state.shippingAddress = data
        },
        SAVE_PAYMENT_METHOD: (state,action) => {
            const data = action.payload
            state.paymentMethod = data
        },

         
    }
})

export const {CART_ADD_ITEM, CART_REMOVE_ITEM,SAVE_SHIPPING_ADDRESS,SAVE_PAYMENT_METHOD,CLEAR_CART} = cartSlice.actions
export default cartSlice.reducer