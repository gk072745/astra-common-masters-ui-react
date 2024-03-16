import axios from "axios"


const environmentUrl = import.meta.env.VITE_BASE_URL


export const axiosInstance = axios.create({
  baseURL: environmentUrl,
  timeout: 30000,
})
