import axios from 'axios'
import { BASE_URL } from './constant.ts'
import { ACCESS_TOKEN } from '../constants'

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
