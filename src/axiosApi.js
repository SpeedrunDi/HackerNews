import axios from 'axios'
import { serverApi } from './config'

const axiosApi = axios.create({
  baseURL: serverApi,
})

export default axiosApi
