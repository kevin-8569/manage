import axios from "axios"

export function request(config) {
    const instance = axios.create({
        baseURL: '',
        timeout: 500
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