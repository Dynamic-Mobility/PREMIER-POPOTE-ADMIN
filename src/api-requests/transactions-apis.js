import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class TransactionsApis {
    fetchAllTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_ALL_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    downloadAllTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_ALL_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    fetchMpesaTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_MPESA_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    downloadMpesaTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_MPESA_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    fetchAirtimeTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_AIRTIME_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    downloadAirtimeTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_AIRTIME_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchBillTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_BILLS_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    downloadBillTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_BILLS_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    fetchPesalinkTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_PESALINK_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    downloadPesalinkTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_PESALINK_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchTransferTransactions(useAuth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.FETCH_TRANSFERS_TRANSACTIONS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    downloadTransferTransactionReport(authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_TRANSFERS_TRANSACTIONS_REPORT, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
}

export const transactionsApis = new TransactionsApis();