import { request } from './request.js'

export function getLeftMenu() {
    return request({
        url: 'menus',
        method: 'get'
    })
}