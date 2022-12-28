import axios from "axios";
import { getEnvVariables } from "../podcasts/helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const podcastApi = axios.create({
  baseURL: VITE_API_URL,
});

podcastApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
  };

  return config;
});

export default podcastApi;
