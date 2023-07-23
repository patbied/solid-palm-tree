import axios from "axios";
import {UPDATE_USER } from "../slices/userSlice";


export const updateUser = (id) => async(dispatch, getState) => {
        const user = getState().user.userInfo
        console.log(user)
        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                }
        }
        const {data} = await axios.get(
                `/api/users/${id}`,
                config
        )
        console.log(data)

        // dispatch(UPDATE_USER({
        //     data
        // }))
}