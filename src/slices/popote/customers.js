import { createSlice } from "@reduxjs/toolkit";
import {customersApis} from "../../api-requests/customers-api";

const initialState = {
    customers : [],
    unapprovedCustomers: [],
    totalCount: 0,
    pageSize: 50,
    currentPage: 1,
}

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers:{
        setCustomers: (state,action) =>{
            state.customers = action.payload;
        },
        setUnapprovedCustomers: (state,action) =>{
            state.unapprovedCustomers = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const {
    setUnapprovedCustomers,
    setCustomers,
    setTotalCount,
    setCurrentPage,
    setPageSize,
} = customerSlice.actions;

export const getAllCustomers = (authUser, values) => async dispatch => {
    try {
        const res = await customersApis.fetchAllCustomers(authUser, values);
        if (res.data){
            dispatch(setCustomers(res.data));
            dispatch(setTotalCount(res.totalCount));
            dispatch(setCurrentPage(res.currentPage));
            dispatch(setPageSize(res.pageSize));
        }
        else{
            dispatch(setCustomers([]));
            dispatch(setTotalCount(0));
            dispatch(setCurrentPage(1));
            dispatch(setPageSize(50));
        }

    }
    catch (e) {
        console.log(e.message);
    }
}

export const getUnapprovedCustomers= (authUser, values) => async dispatch => {
    try {
        const res = await customersApis.fetchUnapprovedCustomers(authUser, values);
        if (res.data){
            dispatch(setUnapprovedCustomers(res.data));
            dispatch(setTotalCount(res.totalCount));
            dispatch(setCurrentPage(res.currentPage));
            dispatch(setPageSize(res.pageSize));
        }
        else{
            dispatch(setCustomers([]));
            dispatch(setTotalCount(0));
            dispatch(setCurrentPage(1));
            dispatch(setPageSize(50));
        }

    }
    catch (e) {
        console.log(e.message);
    }
}



export default customerSlice.reducer;


