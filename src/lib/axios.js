import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

export const publicAPi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)

    if (!refreshToken) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/auth/refresh-token') // Corrigido: evita loop no próprio refresh
    ) {
      request._retry = true
      try {
        const response = await publicAPi.post('/auth/refresh-token', {
          refreshToken,
        })

        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken)

        request.headers.Authorization = `Bearer ${newAccessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)

        console.error(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
