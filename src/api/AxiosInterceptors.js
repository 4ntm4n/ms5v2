import axios from "axios";

/* 
 * 
 * purpose of this interceptors file is to build one axios instance
 * that has both an request AND a response interceptor that works together in
 * a single request, on every requiest, appose to having two separate instances
 * as shown in the walkthrough project at code institute. */

//create baseURL
const baseURL = "http://localhost:8000";

//create axios instance
const api = axiosInstance.create({
    baseURL,
    headers: {Authorization: `Bearer $tokens.access`}
});

//function to refresh token and notify subscribers

//function to subscribe to token refresh

//create request interceptor for updating token

//create response interceptor to retry if a request fails


//export axios instance

