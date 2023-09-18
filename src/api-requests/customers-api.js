import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class CustomersApis {
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
   
}

export const customersApis = new CustomersApis();