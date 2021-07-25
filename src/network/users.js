import { request } from './request.js'

export function getUsersInfo(usersinfo) {
    return request({
        url: 'users',
        method: 'get',
        params: usersinfo
    })
}

export function putUsersInfo(info) {
    return request({
        url: 'users/' + info,
        method: 'put',
    })
}

export function addUser(config) {
    return request({
        url: 'users',
        method: 'post',
        data: config
    })
}

export function deleteUsers(config) {
    return request({
        url: 'users/' + config,
        method: 'delete',
    })
}