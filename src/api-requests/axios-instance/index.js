import axios from "axios";
import axiosRetry from 'axios-retry';
import {AUTH_TOKEN_KEY} from "../../utils/constants";
export const axiosInstance = axios.create({
    //baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
axiosInstance.interceptors.request.use(async (request) => {
    let token;
    token = globalThis.localStorage?.getItem(AUTH_TOKEN_KEY);
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

axiosRetry(axiosInstance, {
    retries: 3, // Number of retries
    // retryCondition(error) {
    //     // Conditional check the error status code
    //     switch (error.response.status) {
    //         case 500:
    //         case 502:
    //             return true; // Retry request with response status code 404 or 429
    //         default:
    //             return false; // Do not retry the others
    //     }
    // },
});