import { request } from './request.js'

export function loginFn(logininfo) {
    return request({
        url: 'login',
        method: 'post',
        data: logininfo
    })
}