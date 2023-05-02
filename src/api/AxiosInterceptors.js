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
  headers: { Authorization: `Bearer $tokens?.access` },
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
    // code to subscribe to a token refresh
};
//create request interceptor for updating token
api.interceptors.request.use((config) => {
    console.log("hello from before a request");
});
//create response interceptor to retry if a request fails
api.interceptors.response.use(
    response => response,
    error => {
        // handle failed request because of token expired
        // (aka status 401.) and retry request after token-change
    }
);
//export axios instance
export default api;
