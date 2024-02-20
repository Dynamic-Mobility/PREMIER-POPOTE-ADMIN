import { createSlice } from "@reduxjs/toolkit";
import {usersApis} from "../../api-requests/users-apis";


const initialState = {
    users : [],
    unapprovedUsers : [],
    otpRequests: [],
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
        setOTPRequests: (state, action) => {
           state.otpRequests = action.payload
        }
    }
})
export const  { setUsers, setOTPRequests, setUnapproved,setProfiles } = userSlice.actions;


export const getAllUsers = (authUser) => async (dispatch) =>{
    try{
        const res = await usersApis.fetchAllUsers(authUser);
        dispatch(setUsers(res.data));
    }
    catch (e) {
     console.log(e.message);
    }
}


export const getOTPRequests = (authUser, values) => async dispatch => {
    try{
        const res = await usersApis.fetchOTPRequests(authUser, values);
        dispatch(setOTPRequests(res.data));
    }
    catch (e) {
        dispatch(setOTPRequests([]));
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


export const getAuditTrail = (authUser, values) => async (dispatch) =>{
    try{
        const res = await usersApis.fetchAuditTrail(authUser, values);
        dispatch(setUnapproved(res));
    }
    catch (e) {
        console.log(e.message);
    }
}



export default userSlice.reducer;


