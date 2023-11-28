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
}

export const transactionsApis = new TransactionsApis();