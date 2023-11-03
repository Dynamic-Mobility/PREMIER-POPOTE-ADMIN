import { createSlice } from "@reduxjs/toolkit";


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
}

export const getAllUnApprovedUsers = (authUser) => async (dispatch) =>{
}




export default userSlice.reducer;


