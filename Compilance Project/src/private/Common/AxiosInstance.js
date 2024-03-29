import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    }
});

export default axiosInstance;