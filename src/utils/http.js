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
    console.log(
      `Server Error ${error.response.status} \n${error.message} \n${source}`
    );
  }
  throw new Error(error);
};

httpClient.interceptors.response.use(function (response) {
  return response.data;
}, errorInterceptor);

export default httpClient;
