import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class CustomersApis {
    fetchAllCustomers (authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_ALL_CUSTOMERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchUnapprovedCustomers (authUser, values) {
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(authUser);
            axiosInstance.post(APP_API_URL.FETCH_UNAPPROVED_CUSTOMERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchCustomerCif(auth,cif){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.FETCH_CUSTOMER_CIF,{cif:cif}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchCustomerId(auth,id){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.FETCH_CUSTOMER_BY_ID,{id: id}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    addUpdateCustomers(auth,payload){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.ADD_UPDATE_CUSTOMERS,payload).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    
    getAccountSwitchByCif(auth,cif){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.GET_ACCOUNT_SWITCHBY_CIF,{cif:cif}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    linkAccounts(auth,payload){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.LINK_ACCOUNTS,payload).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    approveCustomer(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.APPROVE_CUSTOMER, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    resetCustomerPin(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.RESET_CUSTOMER_PIN, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    validateResetOTP(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.VALIDATE_RESET_PIN_OTP, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

    blockUnblockCustomer(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.BLOCK_UNBLOCK_CUSTOMER, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    fetchUpdatedCustomers(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.FETCH_UPDATED_CUSTOMERS, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    approveUpdatedCustomer(auth, values){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(auth);
            axiosInstance.post(APP_API_URL.APPROVE_UPDATED_CUSTOMER, values).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
   
}

export const customersApis = new CustomersApis();