import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class RolesApis {
    fetchAllRoles(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.get(APP_API_URL.FETCH_ROLES).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchAllMenus(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_MENUS, {}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    fetchRolePermissions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_ROLES_PERMISSIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    createRole(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.ADD_ROLE, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

}

export const rolesApis = new RolesApis();