import { createSlice } from "@reduxjs/toolkit";


const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))  : null    

const initialState = {
    userInfo: userInfoFromStorage
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        USER_LOGIN: (state,action) => {
            state.userInfo = action.payload
        },
        USER_LOGOUT: (state) => {
            state.userInfo = null
        },
        UPDATE_USER: (state,action) => {
            state.userInfo = action.payload 
        }
    }
})

export const {USER_LOGIN, USER_LOGOUT, UPDATE_USER} = userSlice.actions
export default userSlice.reducer