import axios, { AxiosError, AxiosResponse } from "axios";

const config = {
  // baseURL: import.meta.env.VITE_FAKE_JSON_STORE_URL,
  baseURL: "https://picsum.---photos",
};

const api = axios.create(config);
const responseHandler = (response: AxiosResponse) => {
  return response;
};
const errorHandler = (error: AxiosError) => {
  console.log("axios error", error);
  return error;
};

api.interceptors.response.use(responseHandler, errorHandler);

export { api };
