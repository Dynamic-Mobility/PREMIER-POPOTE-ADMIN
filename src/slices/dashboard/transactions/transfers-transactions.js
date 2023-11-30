import { createSlice } from "@reduxjs/toolkit";
import {transactionsApis} from "../../../api-requests/transactions-apis";

const initialState = {
    transferTransactions : [],
    pageSize: 100,
    totalRecords: 0,
    activePage: 1,
    filters: {
        query: '',
        customerId:"",
        channel: null,
        startDate: null,
        endDate: null,
        refNo: null,
        mobileNo: "",
        amount: "",
        txnType: [],
        accountFrom: "",
        isProcessed: false,
    },
}

const transactionSlice = createSlice({
    name: 'transfer-transactions',
    initialState,
    reducers:{
        setTransactions: (state,action) =>{
            state.transferTransactions = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setTotalRecords: (state, action) => {
            state.totalRecords = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    }
});

export const {
    setTransactions,
    setActivePage,
    setTotalRecords,
    setPageSize,
    setFilters
} = transactionSlice.actions;

export const resetFilters = () => dispatch => {
    dispatch(setFilters(initialState.filters))
}
export const fetchTransferTransactions = (authUser, filters) => async dispatch => {
    try{
        const res = await transactionsApis.fetchTransferTransactions(authUser, filters);
        dispatch(setTransactions(res?.data));
        dispatch(setTotalRecords(res?.totalPages))
    }
    catch (e) {

    }
}


export default transactionSlice.reducer;


