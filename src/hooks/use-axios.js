import axios from 'axios';
import dayjs from 'moment';
import { APP_API_URL } from "../utils/api-endpoints";

const useAxios = useAuth => {
    const { user, logout, refreshToken } = useAuth;
    const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${user?.accessToken}` },
    });

    let isRefreshing = false;
    let refreshQueue = [];

    const processQueue = (error, token = null) => {
        refreshQueue.forEach((promResolve, index) => {
            if (error) {
                promResolve(Promise.reject(error));
            } else {
                promResolve(token);
            }
            delete refreshQueue[index];
        });
        refreshQueue = [];
    };

    axiosInstance.interceptors.request.use(async req => {
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            return req;
        }

        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user?.accessToken}`,
                    }
                };

                const response = await axios.post(`${APP_API_URL.REFRESH_TOKEN}`, {
                    token: user.accessToken,
                    refreshToken: user.refreshToken,
                    sessionId: user.sessionId,
                }, config);

                if (response.status !== 200) {
                    throw new Error('Token refresh failed');
                }

                const { data } = response;
                await refreshToken(data.token, data.refreshToken, data.sessionId);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

                isRefreshing = false;
                processQueue(null, data.token);

                return req;
            } catch (error) {
                isRefreshing = false;
                await logout();
                processQueue(error);
                return Promise.reject(error);
            }
        } else {
            return new Promise((resolve, reject) => {
                refreshQueue.push((token) => {
                    if (token) {
                        req.headers.Authorization = `Bearer ${token}`;
                        resolve(req);
                    } else {
                        reject(new Error('Token refresh failed'));
                    }
                });
            });
        }
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
