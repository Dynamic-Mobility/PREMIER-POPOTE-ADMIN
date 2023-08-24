import useAxios from "../../../../hooks/use-axios";
import { APP_API_URL } from "../../../../utils/api-endpoints";

export const fetchTransactions = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.GET_TRANSACTIONS)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const fetchATMTransactionTypes = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.GET_ATM_TRANSACTION_TYPE)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const fetchTransactionByTransactionId = (authUser, trnId) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(`${APP_API_URL.GET_TRANSACTION_BY_ID}`, {
        params: {
          trnId: trnId,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const filterTransactions = (authUser, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .post(APP_API_URL.FILTER_TRANSACTIONS, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const filterEsbTransactions = (authUser, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .post(APP_API_URL.FILTER_ESB_TRANSACTIONS, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};


export const downloadEsbTransactions = (authUser, values) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    const config = {
      responseType: "blob",
    };
    axiosInstance
      .post(APP_API_URL.DOWNLOAD_TRANSACTIONS_REPORT, values, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};


export const fetchTransactionType = (authUser) => {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(authUser);
    axiosInstance
      .get(APP_API_URL.GET_TRANSACTION_TYPE)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
