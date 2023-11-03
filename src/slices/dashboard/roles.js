import { createSlice } from "@reduxjs/toolkit";
import {settingsApis} from "../../api-requests/settings-apis";
import {rolesApis} from "../../api-requests/roles-apis";

const initialState = {
    roles : [],
    menus : [
        {
            "id": 3,
            "route": "/dashboard",
            "pageName": "Dashboard",
            "icon": "home",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": null
        },
        {
            "id": 1,
            "route": "/members",
            "pageName": "Members",
            "icon": "diversity_3",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": [
                {
                    "id": 1,
                    "menuId": 1,
                    "route": "/dashboard/members/pensioners",
                    "pageName": "Pensioners",
                    "icon": "groups",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 2,
                    "menuId": 1,
                    "route": "/dashboard/members/beneficiaries",
                    "pageName": "Beneficiaries",
                    "icon": "reduce_capacity",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 3,
                    "menuId": 1,
                    "route": "/dashboard/members/active-members",
                    "pageName": "Active Members",
                    "icon": "badge",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                }
            ]
        },
        {
            "id": 2,
            "route": "/maintenance",
            "pageName": "Maintenance",
            "icon": "admin_panel_settings",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": [
                {
                    "id": 4,
                    "menuId": 2,
                    "route": "/dashboard/maintenance/regions",
                    "pageName": "Regions",
                    "icon": "location_on",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 5,
                    "menuId": 2,
                    "route": "/dashboard/maintenance/cycles",
                    "pageName": "Census Cycles",
                    "icon": "event_repeat",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 6,
                    "menuId": 2,
                    "route": "/dashboard/maintenance/agm-meetings",
                    "pageName": "AGM Cycles",
                    "icon": "summarize",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                }
            ]
        },
        {
            "id": 5,
            "route": "/approvals",
            "pageName": "Approvals",
            "icon": "manage_accounts",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": [
                {
                    "id": 9,
                    "menuId": 5,
                    "route": "/dashboard/approvals/bypassed-registrations",
                    "pageName": "Registration",
                    "icon": "group_add",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 1009,
                    "menuId": 5,
                    "route": "/dashboard/approvals/bypassed-verification",
                    "pageName": "Verification",
                    "icon": "verified",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 1010,
                    "menuId": 5,
                    "route": "/dashboard/approvals/users",
                    "pageName": "Users",
                    "icon": "how_to_reg",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                }
            ]
        },
        {
            "id": 4,
            "route": "/users",
            "pageName": "User Management",
            "icon": "manage_accounts",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": [
                {
                    "id": 7,
                    "menuId": 4,
                    "route": "/dashboard/users",
                    "pageName": "Manage Users",
                    "icon": "group_add",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                },
                {
                    "id": 8,
                    "menuId": 4,
                    "route": "/dashboard/profiles",
                    "pageName": "Manage Profiles",
                    "icon": "admin_panel_settings",
                    "enabled": true,
                    "order": null,
                    "permissionId": null,
                    "permission": null
                }
            ]
        },
        {
            "id": 1005,
            "route": "/dashboard/settings",
            "pageName": "Settings",
            "icon": "settings_suggest",
            "enabled": true,
            "permissionId": null,
            "permission": null,
            "order": null,
            "children": null
        }
    ],
    permissions : [
        {
            "id": 1,
            "permission": "View"
        },
        {
            "id": 2,
            "permission": "Create"
        },
        {
            "id": 3,
            "permission": "Update"
        },
        {
            "id": 4,
            "permission": "Export"
        }
    ],
    isLoadingTypes: false,
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
    setPermissions,
    setMenus
} = settingsSlice.actions;

export const getAllRoles = (authUser) => async dispatch => {
    dispatch(setIsLoadingTypes(true));
    try {
        //const res = await rolesApis.fetchAllRoles(authUser);
        let res = [
            {
                id: 1,
                name: "System Admin",
                permissions: [

                ],
            },
            {
                id: 2,
                name: "Approver",
                permissions: [

                ],
            }
        ]
        dispatch(setRoles(res));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoadingTypes(false));
}

export const getAllPermissions = (authUser) => async dispatch => {
    try {
        const res = await rolesApis.fetchAllMenus(authUser);
        dispatch(setPermissions(res));
    }
    catch (e) {
        console.log(e.message);
    }
}
export const getAllMenus = (authUser) => async dispatch => {
    try {
        const res = await rolesApis.fetchAllMenus(authUser);
        dispatch(setMenus(res));
    }
    catch (e) {
        console.log(e.message);
    }
}


export default settingsSlice.reducer;


