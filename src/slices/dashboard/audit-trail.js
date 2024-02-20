import { createSlice } from "@reduxjs/toolkit";
import {usersApis} from "../../api-requests/users-apis";
import {customersApis} from "../../api-requests/customers-api";

const initialState = {
    auditTrail : [],
    customerAuditTrail: [],
    pageSize: 100,
    totalRecords: 0,
    activePage: 1,
    filters: {
        username: "",
        department: "",
        branch: "",
        loggedIn: true,
        email: "",
        active: true,
        query: '',
    },
}

const auditTrailSlice = createSlice({
    name: 'audit-trail',
    initialState,
    reducers:{
        setUserAuditTrail: (state,action) =>{
            state.auditTrail = action.payload;
        },
        setCustomerAuditTrail: (state, action) => {
          state.customerAuditTrail = action.payload;
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
    setUserAuditTrail,
    setActivePage,
    setTotalRecords,
    setPageSize,
    setFilters,
    setCustomerAuditTrail,
} = auditTrailSlice.actions;

export const resetFilters = () => dispatch => {
    dispatch(setFilters(initialState.filters))
}
export const fetchAuditTrail = (authUser, filters) => async dispatch => {
    try{
        const res = await usersApis.fetchAuditTrail(authUser, filters);
        dispatch(setUserAuditTrail(res.data));
        dispatch(setTotalRecords(res?.totalPages))
    }
    catch (e) {
        console.log(e.message);
    }
}

export const fetchCustomerAuditTrail = (authUser, filters) => async dispatch => {
    try{
        const res = await customersApis.fetchCustomerAuditTrail(authUser, filters);
        dispatch(setCustomerAuditTrail(res.data));
        //dispatch(setTotalRecords(res?.totalPages))
    }
    catch (e) {
        console.log(e.message);
    }
}


export default auditTrailSlice.reducer;


