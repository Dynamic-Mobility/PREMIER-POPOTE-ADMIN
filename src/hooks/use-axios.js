import axios from 'axios';
import dayjs from 'moment';
import {APP_API_URL} from "../utils/api-endpoints";

const useAxios = useAuth => {
    const {user, logout, refreshToken} = useAuth;
    const axiosInstance = axios.create({
        headers: { Authorization: `bearer ${user?.accessToken}` },
    });

    console.log(user.exp);

    axiosInstance.interceptors.request.use(async req => {
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            return req;
        }
        //refresh auth token

        const config = {
            headers: {
                'Authorization': user.accessToken,
            }
        };

        const response = await axios.post(`${APP_API_URL.REFRESH_TOKEN}`, {
            token: user.accessToken,
            refreshToken: user.refreshToken,
        }, config);

        if (response.statusCode !== 200) {
            await logout();
            return;
        }
        const { data} = response;
        await refreshToken(data.token, data.refreshToken);
        req.headers.Authorization = `Bearer ${data.token}`;

        return req;
    });

    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        async err => {
            const originalConfig = err.config;
            if (err.response) {
                // Access Token was expired
                if (err.response?.status === 401) {
                    await logout();
                }
                // if (err.response?.status === 403 && err.response.data) {
                //     return Promise.reject(err.response.data);
                // }
            }
            return Promise.reject(err);
        },
    );

    return axiosInstance;
};

export default useAxios;