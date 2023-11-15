import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class UsersApis {
    fetchAllUsers(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_USERS, {}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchUnapprovedUsers(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_UNAPPROVED_USERS, {}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    createUser(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.ADD_USERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    approveUsers(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.APPROVE_USERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }





}

export const usersApis = new UsersApis();