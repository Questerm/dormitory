import axios from 'axios'
// 设置超时时间
axios.defaults.timeout = 5000;
// 创建axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 5000, // 请求超时时间毫秒
    withCredentials: false, // 异步请求携带cookie
    ws: true,//是否代理websockets
})
export default request;     