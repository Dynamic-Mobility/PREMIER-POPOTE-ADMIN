import { createSlice } from "@reduxjs/toolkit";
import { fetchESBReport } from "../../../redux/services/dashboard/transactions/esb-report";

const initialState = {
    esbReports : null,
}

const esbSlice = createSlice({
    name: 'esbReport',
    initialState,
    reducers:{
        setEsbReport: (state,action) =>{
            state.esbReports = action.payload;
        },
    }
})
export const  { setEsbReport } = esbSlice.actions;


export const fetchAllEsbReports = (authUser,formData) => async dispatch => {
    const response = await fetchESBReport(authUser,formData);
    try {
        dispatch(setEsbReport(response))
    } catch (error) {
        console.log(error.message);
    }
}



export default esbSlice.reducer;


