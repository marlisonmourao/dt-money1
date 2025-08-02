import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AxiosInstance } from 'axios'

export function addTokenRequest(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const userData = await AsyncStorage.getItem('@dtmoney:user')

    if (userData) {
      const { token } = JSON.parse(userData)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })
}
