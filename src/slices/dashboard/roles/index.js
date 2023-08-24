import { createSlice } from "@reduxjs/toolkit";
import {fetchPermissions, fetchRoles, fetchAllMenus, fetchUserMenus} from "../../../redux/services/dashboard/roles";


const initialState = {
    roles : [],
    permissions: [],
    menus: [],
    isLoading: false,
}

const branchSlice = createSlice({
    name: 'roles',
    initialState,
    reducers:{
       setRoles: (state,action) =>{
            state.roles = action.payload;
        },
        setPermissions: (state, action) =>{
            state.permissions = action.payload;
        },
        setMenus: (state, action) =>{
           state.menus = action.payload
        },
        setIsLoading: (state, action) => {
           state.isLoading = action.payload;
        }
    }
})
export const  { setRoles, setIsLoading, setPermissions, setMenus } = branchSlice.actions;


export const getAllRoles = (authUser) => async (dispatch) =>{
    const res = await fetchRoles(authUser)
    dispatch(setRoles(res));
}
export const getAllPermissions = (authUser) => async dispatch => {
    const res = await fetchPermissions(authUser);
    dispatch(setPermissions(res))
}

export const getAllMenus = (authUser) => async dispatch => {
    const res = await fetchAllMenus(authUser);
    dispatch(setMenus(res))
}

export const getUserMenus = (authUser) => async dispatch => {
    dispatch(setIsLoading(true));
    try{
        const res = await fetchUserMenus(authUser);
        //console.log(res);
        dispatch(setMenus(res))
    }
    catch (e) {
        console.log(e)
    }
    finally
    {
        dispatch(setIsLoading(false));
    }
}



export default branchSlice.reducer;


