import axios from "axios";
// import dotenv from "dotenv";

console.log("Backend URL:", process.env.REACT_APP_BACKEND_UR); // Debugging line

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
