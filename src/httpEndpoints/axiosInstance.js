import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const axiosinstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: headers,
});

export default axiosinstance;
