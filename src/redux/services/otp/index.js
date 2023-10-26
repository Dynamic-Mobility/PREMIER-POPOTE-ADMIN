import { APP_API_URL } from "../../../utils/api-endpoints";
import useAxios from "../../../hooks/use-axios";
import axios from "axios";


export const validateOtp = (values,userDetails) =>{
    return new Promise((resolve,reject) =>{
        const config = {
            headers:{
                Authorization: userDetails?.token
            },
            params:{
                otp: values.otp
            }
        }
        axios.post(APP_API_URL.VALIDATE_OTP,{},config)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

