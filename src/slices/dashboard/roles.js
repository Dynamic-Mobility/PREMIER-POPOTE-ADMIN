import { createSlice } from "@reduxjs/toolkit";
import {rolesApis} from "../../api-requests/roles-apis";
import {PERMISSIONS} from "../../utils/constants";

const initialState = {
    roles : [],
    menus : [],
    permissions : [
        ...PERMISSIONS,
    ],
    isLoadingTypes: false,
    isLoadingMenus: false,
}

const settingsSlice = createSlice({
    name: 'roles',
    initialState,
    reducers:{
        setRoles: (state,action) =>{
            state.roles = action.payload;
        },
        setIsLoadingTypes: (state, action) => {
            state.isLoadingTypes = action.payload;
        },
        setIsLoadingMenus: (state, action) => {
            state.isLoadingMenus = action.payload;
        },
        setPermissions: (state,action) =>{
            state.permissions = action.payload;
        },
        setMenus: (state,action) =>{
            state.menus = action.payload;
        },
    }
});

export const {
    setIsLoadingTypes,
    setRoles,
    setMenus,
    setIsLoadingMenus,
} = settingsSlice.actions;

export const getAllRoles = (authUser) => async dispatch => {
    dispatch(setIsLoadingTypes(true));
    try {
        const res = await rolesApis.fetchAllRoles(authUser);
        dispatch(setRoles(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoadingTypes(false));
}

export const getAllMenus = (authUser) => async dispatch => {
    dispatch(setIsLoadingMenus(true));
    try {
        const res = await rolesApis.fetchAllMenus(authUser);
        dispatch(setMenus(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoadingMenus(false));
}


export default settingsSlice.reducer;


