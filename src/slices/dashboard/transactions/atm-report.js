import { createSlice } from "@reduxjs/toolkit";
import {
    fetchATMByType,
    fetchATMReport,
    fetchLiveAtmTransactions
} from "../../../redux/services/dashboard/transactions/atm-report";


const initialState = {
    atmReports : [],
    atmTypes : [],
    atmTransactions: [],
}

const atmSlice = createSlice({
    name: 'atmReport',
    initialState,
    reducers:{
        setAtmReport: (state,action) =>{
            state.atmReports = action.payload;
        },
        setAtmTypes: (state,action) =>{
            state.atmTypes = action.payload;
        },
        setAtmTransactions: (state, action) => {
            state.atmTransactions = action.payload;
        }
    }
})
export const  {
    setAtmReport,
    setAtmTypes,
    setAtmTransactions
} = atmSlice.actions;


export const fetchAllAtmReports = (authUser,formData) => async dispatch => {
    const response = await fetchATMReport(authUser,formData);
    console.log("RESPONSE ",response)
    try {
        dispatch(setAtmReport(response.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const getLiveATMTransactions = (authUser) => async dispatch => {
    const response = await fetchLiveAtmTransactions(authUser);
    dispatch(setAtmTransactions(response));
}

// export const getATMByType = (authUser,trntype) => async dispatch => {
//     const response = await fetchATMByType(authUser,trntype);
//     console.log("RESPONSE ",response)
//     try {
//         dispatch(setAtmReport(response.data))
//     } catch (error) {
//         console.log(error.message);
//     }
// }



export default atmSlice.reducer;


