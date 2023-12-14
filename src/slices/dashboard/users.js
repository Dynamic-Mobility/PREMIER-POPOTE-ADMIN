import { createSlice } from "@reduxjs/toolkit";
import {usersApis} from "../../api-requests/users-apis";


const initialState = {
    users : [],
    unapprovedUsers : [],
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
       setUsers: (state,action) =>{
            state.users = action.payload;
        },
       setUnapproved: (state,action) =>{
            state.unapprovedUsers = action.payload;
        },
    }
})
export const  { setUsers, setUnapproved,setProfiles } = userSlice.actions;


export const getAllUsers = (authUser) => async (dispatch) =>{
    try{
        const res = await usersApis.fetchAllUsers(authUser);
        dispatch(setUsers(res));
    }
    catch (e) {
     console.log(e.message);
    }
}



export const getAllUnApprovedUsers = (authUser) => async (dispatch) =>{
    try{
        const res = await usersApis.fetchUnapprovedUsers(authUser);
        dispatch(setUnapproved(res));
    }
    catch (e) {
        console.log(e.message);
    }
}




export default userSlice.reducer;


