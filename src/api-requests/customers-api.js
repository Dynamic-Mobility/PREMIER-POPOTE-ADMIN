import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class ParametersApis {
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
   
}

export const parametersApis = new ParametersApis();