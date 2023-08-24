import useAxios from "../../../../hooks/use-axios";
import { APP_API_URL } from "../../../../utils/api-endpoints";


export const fetchRequests = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_REQUESTS)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}

export const fetchRequestById = (authUser,trnId) =>{
    console.log("ID ",trnId);
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_REQUESTS_BY_ID,{
            params: {
                trnId: trnId
              },
        })
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}
