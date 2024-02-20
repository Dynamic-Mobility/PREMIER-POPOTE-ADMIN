import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class UsersApis {
    fetchOTPRequests(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_OTP_REQUESTS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
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
    updateUser(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.UPDATE_USERS, values).then( response => {
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

    enableDisableUser(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.ENABLE_DISABLE_USERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchAuditTrail (authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_AUDIT_TRAIL, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchAuditTrailReport (authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_AUDIT_TRAIL_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchUserReport (authUser, values) {
            return new Promise((resolve, reject) => {
                const axiosInstance = useAxios(authUser);
                axiosInstance.post(APP_API_URL.FETCH_USER_REPORT, values).then( response => {
                    resolve(response.data)
                }).catch(e => {
                    reject(new Error(e.message))
                    console.log(e.message)
                })
            })
        }




}

export const usersApis = new UsersApis();