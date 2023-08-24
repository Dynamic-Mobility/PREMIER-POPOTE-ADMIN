import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionType, fetchTransactions,fetchATMTransactionTypes,fetchTransactionByTransactionId,filterTransactions } from "../../../redux/services/dashboard/transactions/all-transactions";

const initialState = {
    transactions : [],
    atmTransactionTypes : [],
    transactionsById: [],
    filterTransactionsResponse: []
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers:{
        setTransactions: (state,action) =>{
            state.transactions = action.payload;
        },
        setTransactionTypes: (state,action) =>{
            state.atmTransactionTypes = action.payload;
        },
        setTransactionsById: (state,action) =>{
            state.transactionsById = action.payload;
        },
        setFilterTransactions: (state,action) =>{
            state.filterTransactionsResponse = action.payload;
        },
    }
})
export const  { setTransactions,setTransactionTypes,setTransactionsById,setFilterTransactions } = transactionSlice.actions;


export const getAllTransactions = (authUser) => async dispatch => {
    const response = await fetchTransactions(authUser)
    try {
        dispatch(setTransactions(response.data))
    } catch (error) {
    }
}

export const getAllTransactionsById = (authUser) => async dispatch => {
    const response = await fetchTransactionByTransactionId(authUser)
    try {
        dispatch(setTransactionsById(response.data))
    } catch (error) {
    }
}

export const getAllATMTransactionTypes = (authUser) => async dispatch => {
    const response = await fetchATMTransactionTypes(authUser)
    try {
        dispatch(setTransactionTypes(response))
    } catch (error) {
    }
}
export const getAllTransactionTypes = (authUser) => async dispatch => {
    const response = await fetchTransactionType(authUser)
    try {
        dispatch(setTransactionTypes(response))
    } catch (error) {
    }
}

export const filterAllTransactions = (authUser,values) => async dispatch => {
    const response = await filterTransactions(authUser,values)
    try {
        dispatch(setFilterTransactions(response))
    } catch (error) {
    }
}



export default transactionSlice.reducer;


