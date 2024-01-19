import axios, { AxiosError, AxiosResponse } from "axios";

const config = {
  baseURL: import.meta.env.VITE_FAKE_JSON_STORE_URL,
};
const api = axios.create(config);

const responseHandler = (response: AxiosResponse) => {

  return response;
};

const errorHandler = (error: AxiosError) => {
  return error;
};

api.interceptors.response.use(responseHandler, errorHandler);

export { api };
