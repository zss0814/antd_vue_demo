
import axios from 'axios';
import qs from 'querystring';



const instance = axios.create({
  
  baseURL: '/abc', 
  timeout: 20000
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {

  config.data = qs.stringify(config.data);
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
   
    return response.data
  },
  error => {
    return new Promise(() => {}) 
  }
)


export default instance

