import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;


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

const baseURL = "http://localhost:8000";

let isRefreshing = false;
let refreshSubscribers = [];

function getTokens() {
  return localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens"))
    : null;
}
const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${getTokens()?.access}` },
});

/*
 *
 * if multiple requests at the same time, the first request to rech here
 * sets the isRrefreshing to true, which makes the following requests being
 * pushed to the list of 'refreshSubscribers' array. it then makes a request to
 * get the new refresh token and replace the old one from local storage. Then
 * it goes through the list of subscribers to update all of their header info
 * using setting the callback variable. refreshSubscribers are emptied,
 * and finally isRefreshing is toggled back to initial state.*/
function refreshTokenAndNotifySubscribers() {
  if (!isRefreshing) {
    isRefreshing = true;
    const tokens = getTokens();
    return axios
      .post(`${baseURL}/api/token/refresh/`, { refresh: tokens.refresh })
      .then((response) => {
        localStorage.setItem("tokens", JSON.stringify(response.data));
        refreshSubscribers.forEach((callback) =>
          callback(response.data.access)
        );
        refreshSubscribers = [];
      })
      .finally(() => {
        isRefreshing = false;
      });
  }
}

//function to subscribe to token refresh
const onAccessTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

/*
 *
 * the interceptor before each request checksif tokens exists in memory.
 * If it doesnt, it tries to get it from the localStorage.
 * If it doesnt exisit there, the token i set to null */
api.interceptors.request.use((config) => {
  const tokens = getTokens();
  config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
});
/*
 *
 * the promise in this interceptor waits for a new access token, creates a
 * callback function that updates the original request with the new access
 * token and retries the original request; it will not execute until the
 * refresh token process has completed */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    const tokens = getTokens();

    if (status === 401) {
      if (!isRefreshing) {
        refreshTokenAndNotifySubscribers();
      }
      const retryOriginalRequest = new Promise((resolve) => {
        onAccessTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default api;
