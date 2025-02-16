import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
  timeout: 5000,
});

export default apiClient;
