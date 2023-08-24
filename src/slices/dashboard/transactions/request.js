import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestById, fetchRequests } from "../../../redux/services/dashboard/transactions/request";


const initialState = {
    requests : [],
    idRequests: []
}

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers:{
        setRequest: (state,action) =>{
            state.requests = action.payload;
        },
        setIdRequests: (state,action) =>{
            state.idRequests = action.payload;
        },
    }
})
export const  { setRequest,setIdRequests } = requestSlice.actions;


export const getAllRequests = (authUser) => async dispatch => {
    const response = await fetchRequests(authUser)
    console.log("RESPONSE ",response)
    try {
        dispatch(setRequest(response.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllRequestsById = (authUser,trnId) => async dispatch => {
    const response = await fetchRequestById(authUser,trnId)
    console.log("RESPONSE ",response)
    try {
        dispatch(setIdRequests(response.data))
    } catch (error) {
        console.log(error.message);
    }
}



export default requestSlice.reducer;


