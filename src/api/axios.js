import axios from "axios";
export const baseUrl = 'http://localhost:4040'
export const withToken = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
        Accept: 'application/json',
        "Content-Type": "application/json",
    }
})