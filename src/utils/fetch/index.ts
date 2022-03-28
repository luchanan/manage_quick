import axios, {AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios'
import address from '@/utils/fetch/address'
import { ElMessageBox, ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000
})
function addressJoin (url: string) {
  if (address[url]) {
    return `${address[url]}`
  }
  return url
}
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
      (config.headers as AxiosRequestHeaders).token = token
    }
    config.url = addressJoin(config.url as string)
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data
    if (res.code === 0) {
      return Promise.resolve(res)
    }
    if (res.code === 401) {
      return ElMessageBox.confirm(res.msg || '登录超时，请重新登录', '提示', {
        confirmButtonText: '重试',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        location.href = '/#/login'
      })
    }
    const msg = res.message || res.msg || '未知错误'
    return Promise.reject(new Error(msg))
  }, error => {
    console.log('err' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default {
  post(url: string, data?: any) {
    return service({
      url,
      method: 'POST',
      data
    })
  },
  get(url: string, params: any) {
    return service({
      url,
      method: 'GET',
      params
    })
  },
  put(url: string, data: any) {
    return service({
      url,
      method: 'PUT',
      data
    })
  },
  delete(url: string, data: any) {
    return service({
      url,
      method: 'DELETE',
      data
    })
  },
}