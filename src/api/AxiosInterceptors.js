import axios from "axios";

/*
 *
 * purpose of this interceptors file is to build one axios instance
 * that has both an request AND a response interceptor that works together in
 * a single request, on every requiest, appose to having two separate instances
 * as shown in the walkthrough project at code institute. 
 * If multiple requests are made at the same time, this apprach solves the issue 
 * of the server being bombarded with requests to the refresh token endpoint,
 * by only letting one request reach the function that makes the request to the refresh
 * endpoint on the server, the rest of the requests will be stored in a promise 
 * and updated once a new refresh token is obtained.*/

//get tokens from localStorage
let tokens = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : null;

//create baseURL
const baseURL = "http://localhost:8000";

//create axios instance
const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${tokens?.access}` },
});

//define list of subscribers,check if refresh is already in progress
let isRefreshing = false;
let refreshSubscribers = [];

/*
 *
 * if multiple requests at the same time, the first request to rech here
 * sets the isRrefreshing to true, which makes the following requests being
 * pushed to the list of 'refreshSubscribers' array. it then makes a request to
 * get the new refresh token and replace the old one from local storage. Then
 * it goes through the list of subscribers to update all of their header info
 * using setting the callback variable. refreshSubscribers are emptied,
 * and finally isRefreshing is toggled back to initial state.*/
const refreshTokenAndNotifySubscriber = () => {
  if (!isRefreshing) {
    isRefreshing = true;

    return axios
      .post(`${baseURL}/api/token/refresh/`, { refresh: tokens.refresh })
      .then((response) => {
        tokens = response.data;
        localStorage.setItem("tokens", response.data);
        refreshSubscribers.forEach((callback) =>
          callback(response.data.access)
        );
        refreshSubscribers = [];
      })
      .finally(() => {
        isRefreshing = false;
      });
  }
};

//function to subscribe to token refresh
const onAccessTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

/*
 *
 * the promise in this interceptor waits for a new access token, creates a 
 * callback function that updates the original request with the new access 
 * token and retries the original request; it will not execute until the 
 * refresh token process has completed */
api.interceptors.request.use((config) => {
  console.log("hello from before a request");
  return config;
});
//create response interceptor to retry if a request fails
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const status = error.response.status;

    if (status === 401) {
      if (!isRefreshing) {
        refreshTokenAndNotifySubscriber();
      }

      const retryOriginalRequest = new Promise((resolve) => {
        onAccessTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);
//export axios instance
export default api;
