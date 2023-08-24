import useAxios from "../../../../hooks/use-axios";
import { APP_API_URL } from "../../../../utils/api-endpoints";


export const fetchATMReport = (authUser, formData) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_ATM_REPORT, formData)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const fetchATMByType = (authUser,trntype) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_ATM_TRANSACTION_TYPE, trntype)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const fetchLiveAtmTransactions = (authUser) => {
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_LIVE_ATM_TRANSACTIONS)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const fetchATMTransactionTypes = (authUser) => {
    return new Promise((resolve, reject) => {
        const axiosInstance = useAxios(authUser);
        axiosInstance.get(APP_API_URL.GET_ATM_TRANSACTION_TYPES)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}

export const fetchFilteredATMTransactions = (authUser, filters) => {
    return new Promise((resolve, reject) => {
        const axiosInstance = useAxios(authUser);
        axiosInstance.post(APP_API_URL.GET_ATM_TRANSACTION_TYPES, filters)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}