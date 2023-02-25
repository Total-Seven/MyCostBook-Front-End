import LAxios from '../request/index'

// 登入注册
export function loginOrRegister(method, data) {
    return LAxios.post({
        url: `/user/${method}`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}