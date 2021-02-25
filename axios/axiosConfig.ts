import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bookstore-strapi.herokuapp.com",
});

export default axiosClient;
