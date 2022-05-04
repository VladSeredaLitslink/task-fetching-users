import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
});

// interceptor to catch errors
const errorInterceptor = (error) => {
  if (error.response.status) {
    // all the error responses
    const { baseURL, url } = error.response.config;
    const source = baseURL + url;
    console.error("Server Error", error.response.status, error.message, source); // eslint-disable-line
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }
  return response.data;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
