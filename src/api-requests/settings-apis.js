import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class SettingsApis {
    fetchTransactionTypes(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_TRANSACTION_TYPES, {}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    createTransactionLimit(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.ADD_TRANSACTION_LIMIT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    fetchUnapprovedLimits(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_UNAPPROVED_LIMITS, {}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    approveUnapprovedLimits(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.APPROVE_UNAPPROVED_LIMITS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
}

export const settingsApis = new SettingsApis();