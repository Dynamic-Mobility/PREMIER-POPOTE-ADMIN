import { createSlice } from "@reduxjs/toolkit";
import {utilitiesApis} from "../../api-requests/utilities-apis";

const initialState = {
    branches : [],
    departments: [],
    isLoading: false,
}

const settingsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers:{
        setDepartments: (state,action) =>{
            state.departments = action.payload;
        },
        setBranches: (state,action) =>{
            state.branches = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

export const {
    setBranches,
    setDepartments,
    setIsLoading
} = settingsSlice.actions;

export const getAllBranches= (authUser, branchId) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const res = await utilitiesApis.fetchBranches(authUser, branchId);
        dispatch(setBranches(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoading(false));
}

export const getAllDepartments= (authUser) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const res = await utilitiesApis.fetchDepartments(authUser);
        dispatch(setDepartments(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoading(false));
}




export default settingsSlice.reducer;


