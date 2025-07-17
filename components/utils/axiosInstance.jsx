import axios from "axios";
import { BASE_URL } from "../Constant/constant";

// Global Basic Auth Credentials
const BASIC_AUTH_USERNAME = "admin";
const BASIC_AUTH_PASSWORD = "+2e64JP2jL9+<ho8L-";

// Encode Basic Auth Credentials
const basicAuthHeader = `Basic ${btoa(
  `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`
)}`;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL globally
  headers: {
    Authorization: basicAuthHeader, // Attach Basic Auth header to all requests
  },
});

export default axiosInstance;
