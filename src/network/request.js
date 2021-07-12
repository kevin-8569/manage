import axios from "axios"

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
        timeout: 50000
    })

    instance.interceptors.request.use(res => {
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