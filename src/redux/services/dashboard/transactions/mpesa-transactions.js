import useAxios from "../../../../hooks/use-axios";
import { APP_API_URL } from "../../../../utils/api-endpoints";


export const fetchMpesaTransactions = (authUser,values) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_MPESA_TRANSACTIONS,values)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}