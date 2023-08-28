import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTransactions : [],
    pageSize: 10,
    activePage: 1,
    filters: {
        query: '',
        startDate: null,
        endDate: null,
        refNo: null,
        mobileNo: null,
        txnType: null,
    },
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers:{
        setTransactions: (state,action) =>{
            state.activeTransactions = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
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
    setPageSize,
    setFilters
} = transactionSlice.actions;

export const resetFilters = () => dispatch => {
    dispatch(setFilters(initialState.filters))
}
export const fetchAllTransaction = () => dispatch => {

}


export default transactionSlice.reducer;


