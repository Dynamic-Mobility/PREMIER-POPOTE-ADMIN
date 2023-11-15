import { createSlice } from "@reduxjs/toolkit";
import {settingsApis} from "../../api-requests/settings-apis";

const initialState = {
    transactionTypes : [],
    unapprovedLimits: [],
    unapprovedEditedLimits: [],
    isLoadingTypes: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        setTransactionTypes: (state,action) =>{
            state.transactionTypes = action.payload;
        },
        setIsLoadingTypes: (state, action) => {
            state.isLoadingTypes = action.payload;
        },
        setUnapprovedLimits: (state,action) =>{
            state.unapprovedLimits = action.payload;
        },
        setEditedUnapprovedLimits: (state,action) =>{
            state.unapprovedEditedLimits = action.payload;
        },
    }
});

export const {
    setTransactionTypes,
    setUnapprovedLimits,
    setIsLoadingTypes,
    setEditedUnapprovedLimits
} = settingsSlice.actions;

export const getTransactionTypes = (authUser) => async dispatch => {
    dispatch(setIsLoadingTypes(true));
    try {
        const res = await settingsApis.fetchTransactionTypes(authUser);
        dispatch(setTransactionTypes(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoadingTypes(false));
}

export const getUnapprovedLimits = (authUser) => async dispatch => {
    try {
        const res = await settingsApis.fetchUnapprovedLimits(authUser);
        dispatch(setUnapprovedLimits(res));
    }
    catch (e) {
        console.log(e.message);
    }
}

export const getEditedUnapprovedLimits = (authUser) => async dispatch => {
    try {
        const res = await settingsApis.fetchEditedUnapprovedLimits(authUser);
        dispatch(setEditedUnapprovedLimits(res));
    }
    catch (e) {
        console.log(e.message);
    }
}



export default settingsSlice.reducer;


