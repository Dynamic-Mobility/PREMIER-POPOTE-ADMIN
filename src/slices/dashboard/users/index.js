import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers,fetchUnApprovedUsers,fetchProfiles } from "../../../redux/services/users";


const initialState = {
    users : [],
    unapprovedUsers : [],
    profiles : [],
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
       setProfiles: (state,action) =>{
            state.profiles = action.payload;
        },
    }
})
export const  { setUsers, setUnapproved,setProfiles } = userSlice.actions;


export const getAllUsers = (authUser) => async (dispatch) =>{
    const res = await fetchUsers(authUser)
    dispatch(setUsers(res));
}

export const getAllUnApprovedUsers = (authUser) => async (dispatch) =>{
    const res = await fetchUnApprovedUsers(authUser)
    dispatch(setUnapproved(res));
}

export const getAllProfiles = (authUser) => async (dispatch) =>{
    const res = await fetchProfiles(authUser)
    dispatch(setProfiles(res));
}




export default userSlice.reducer;


