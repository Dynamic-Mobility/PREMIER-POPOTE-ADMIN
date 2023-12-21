import { createSlice } from "@reduxjs/toolkit";
import {customersApis} from "../../api-requests/customers-api";
import {BLOCK_TYPES} from "../../utils/constants";

const initialState = {
    customers : [],
    unapprovedCustomers: [],
    updatedCustomers: [],
    pendingAccounts: [],
    blockedAccounts: [],
    blockedCustomers: [],
    unblockedCustomers: [],
    unblockedAccounts: [],
    pinResets: [],
    totalCount: 0,
    pageSize: 250,
    currentPage: 1,
}

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers:{
        setCustomers: (state,action) =>{
            state.customers = action.payload;
        },
        setPendingAccounts: (state,action) =>{
            state.pendingAccounts = action.payload;
        },
        setBlockedAccounts: (state,action) =>{
            state.blockedAccounts = action.payload;
        },
        setBlockedCustomers: (state,action) =>{
            state.blockedCustomers = action.payload;
        },
        setUnBlockedCustomers: (state,action) =>{
            state.unblockedCustomers = action.payload;
        },
        setUnBlockedAccounts: (state,action) =>{
            state.unblockedAccounts = action.payload;
        },
        setUpdatedCustomers: (state,action) =>{
            state.updatedCustomers = action.payload;
        },
        setUnapprovedCustomers: (state,action) =>{
            state.unapprovedCustomers = action.payload;
        },
        setPinResets: (state,action) =>{
            state.pinResets = action.payload;
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
    setUnBlockedCustomers,
    setBlockedAccounts,
    setPendingAccounts,
    setBlockedCustomers,
    setUnBlockedAccounts,
    setCustomers,
    setTotalCount,
    setCurrentPage,
    setPageSize,
    setUpdatedCustomers,
    setPinResets,
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


export const getUpdatedCustomers = (authUser, values) => async dispatch => {
    try {
        const res = await customersApis.fetchUpdatedCustomers(authUser, values);
        if (res.data){
            dispatch(setUpdatedCustomers(res.data));
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

export const getUnblockedCustomers = (authUser, values) => async dispatch => {
    try {
        const formData = {
            ...values,
            blockType: BLOCK_TYPES.CUSTOMER
        }
        const res = await customersApis.fetchUnBlockedCustomersAccounts(authUser, formData);

        if (res.data){
            dispatch(setUnBlockedCustomers(res.data));
            // dispatch(setTotalCount(res.totalCount));
            // dispatch(setCurrentPage(res.currentPage));
            // dispatch(setPageSize(res.pageSize));
        }
        else{
            dispatch(setUnBlockedCustomers([]));
            dispatch(setTotalCount(0));
            dispatch(setCurrentPage(1));
            dispatch(setPageSize(50));
        }

    }
    catch (e) {
        console.log(e.message);
    }
}
export const getPinResets = (authUser, values) => async dispatch => {
    try {
        const res = await customersApis.fetchPinRequests(authUser, values);

        if (res.data){
            dispatch(setPinResets(res.data));
        }
        else{
            dispatch(setPinResets([]));
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


