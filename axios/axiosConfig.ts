import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.URL_SERVER || "http://localhost:1337",
});

export default axiosClient;
