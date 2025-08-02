import axios from 'axios'
import { Platform } from 'react-native'
import { AppError } from '../helpers/app-error'

const baseURL = Platform.select({
  ios: 'http://192.168.0.5:3001',
  android: 'http://10.0.2.2:3001',
})

const dtMoneyApi = axios.create({
  baseURL,
})

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response?.data) {
      const { message } = error.response.data.message

      return Promise.reject(new AppError(message))
    }

    return Promise.reject(new AppError('Erro ao processar a requisição'))
  }
)

export { dtMoneyApi }

