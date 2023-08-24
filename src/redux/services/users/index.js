import useAxios from "../../../hooks/use-axios";
import { APP_API_URL } from "../../../utils/api-endpoints";

export const fetchUsers = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.GET_USERS)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const fetchProfiles = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.GET_PROFILES)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const createUser = (authUser, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .post(APP_API_URL.CREATE_USER, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const createProfile = (authUser, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .post(APP_API_URL.ADD_PROFILE, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const fetchUnApprovedUsers = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.UN_APPROVED_USERS)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const approveUsers = (authUser, approverId, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .post(`${APP_API_URL.APPROVE_USERS}/${approverId}`, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
