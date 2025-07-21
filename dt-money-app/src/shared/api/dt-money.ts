import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
})

const dtMoneyApi = axios.create({
  baseURL,
})

export { dtMoneyApi }
