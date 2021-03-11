import axios from "axios";

export const dataAPI = axios.create({
  baseUrl: "http://financeos:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = axios.create({
  baseUrl: "http://financeos:5001/api/auth",
  header: {
    "Content-Type": "application/json",
  },
});

export default dataAPI;
