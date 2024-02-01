import { createSlice } from "@reduxjs/toolkit";
import {usersApis} from "../../api-requests/users-apis";

const initialState = {
    auditTrail : [],
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
    setFilters
} = auditTrailSlice.actions;

export const resetFilters = () => dispatch => {
    dispatch(setFilters(initialState.filters))
}
export const fetchAuditTrail = (authUser, filters) => async dispatch => {
    try{
        const res = await usersApis.fetchAuditTrail(authUser, filters);
        dispatch(setUserAuditTrail(res));
        //dispatch(setTotalRecords(res?.totalPages))
    }
    catch (e) {
        console.log(e.message);
    }
}


export default auditTrailSlice.reducer;


