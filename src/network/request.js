import axios from "axios"

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
        timeout: 50000
    })

    instance.interceptors.request.use(res => {
        //为请求头对象，添加token验证的Authorization字段
        res.headers.Authorization = window.sessionStorage.getItem('token')
        return res
    }, err => {
        console.log(err)
    })

    //响应拦截器
    instance.interceptors.response.use(res => {
        // console.log(res.data)
        return res.data
    }, err => {
        console.log(err)
    })

    return instance(config)
}