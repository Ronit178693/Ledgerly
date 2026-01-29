import axios from 'axios';
import { BASE_URI } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URI,
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    // No need to manually attach token, cookie handles it
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {
    return response;
},
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Handle unauthorized error
                // Optional: Redirect only if not already on login page to avoid loops
                if (!window.location.pathname.includes('/login')) {
                    console.log("Unauthorized! Redirecting to login...");
                    window.location.href = "/login";
                }
            }
            else if (error.response.status === 500) {
                console.log("Server Error! Please try again later.");
            }
        }
        return Promise.reject(error);
    });

export default axiosInstance;