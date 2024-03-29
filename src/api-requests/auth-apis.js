import JwtHelper from "../helpers/jwt-helper";
import {axiosInstance} from "./axios-instance";
import {APP_API_URL} from "../utils/api-endpoints";

import SimpleCrypto from  'simple-crypto-js'
import useAxios from "../hooks/use-axios";

const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

class AuthApis{
    async Login (values) {
        const encryptedData = {
            data: secretKey.encrypt(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.LOGIN, encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if(data.token !== null){
                    resolve(data);
                }
            }).catch(e => {
                if (e.response.status === 400){
                    reject(new Error(e.response?.data ?? "Invalid credentials"))
                }
                if (e.response.status === 401){
                    reject(e.response?.data)
                }
                else{
                    reject(new Error(e.message))
                }
            })
        })
    };
    async decodeToken(accessToken) {
        return new Promise((resolve, reject) => {
            try {
                // Decode access token
                const jwt = new JwtHelper()
                const decodedToken  = jwt.decodeToken(accessToken);
                resolve(decodedToken);
            } catch (err) {
                reject(new Error("Internal server error"));
            }
        });
    }

    async validateOTP(token, values){
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Authorization':  `Bearer ${token}`,
                }
            };
            axiosInstance.post(APP_API_URL.VALIDATE_OTP, values, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }

    async resendOTP(token, values){
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Authorization':  `Bearer ${token}`,
                }
            };
            axiosInstance.post(APP_API_URL.RESEND_OTP, values, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }

    async fetchUserMenus(token, values){
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Authorization':  `Bearer ${token}`,
                }
            };
            axiosInstance.post(APP_API_URL.GET_USER_MENUS, values, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }
    async logoutUser(values){
        const encryptedData = {
            data: secretKey.encrypt(values)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.LOGOUT, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }

    async refreshUserToken (values) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.REFRESH_TOKEN, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }

}

export const authApi = new AuthApis();