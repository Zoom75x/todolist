import axios from 'axios'
import { BASE_URL } from './constant.ts'
import { ACCESS_TOKEN } from '../constants'
import { toast } from 'react-toastify'

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
})

export const setAuthHeader = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  console.log(ACCESS_TOKEN)
  if (ACCESS_TOKEN) {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
}
export const errorHandler =(error:unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.status === 401) {
      toast.error("Неправильный логин или пароль", { type: "error" })
    } else {
      toast.error(error.message, {})
    }
    return error
  }
}