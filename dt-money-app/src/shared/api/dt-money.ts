import axios from 'axios'
import { Platform } from 'react-native'
import { AppError } from '../helpers/app-error'
import { addTokenRequest } from '../helpers/axios.helper'

const baseURL = Platform.select({
  ios: 'http://192.168.0.5:3001',
  android: 'http://10.0.2.2:3001',
})

const dtMoneyApi = axios.create({
  baseURL,
})

addTokenRequest(dtMoneyApi)

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    const apiMessage = error?.response?.data?.message
    if (typeof apiMessage === 'string') {
      return Promise.reject(new AppError(apiMessage))
    }

    return Promise.reject(new AppError('Erro ao processar a requisição'))
  }
)

export { dtMoneyApi }
