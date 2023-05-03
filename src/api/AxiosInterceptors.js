import axios from "axios";

/*
 *
 * purpose of this interceptors file is to build one axios instance
 * that has both an request AND a response interceptor that works together in
 * a single request, on every requiest, appose to having two separate instances
 * as shown in the walkthrough project at code institute. */

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

//function to refresh token and notify subscribers
const refreshTokenAndNotifySubscriber = () => {
  //define method to refresh token here
};

//function to subscribe to token refresh
const onAccessTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};
//create request interceptor for updating token
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
        console.log("we need to call the refresh token endpoint!");
      }

      /*
       *
       * this promise waits for a new access token, creates a callback function 
       * that updates the original request with the new access token, and retries 
       * the original request; it will not execute until the refresh token process 
       * has completed */
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
