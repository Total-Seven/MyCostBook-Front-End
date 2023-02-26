import LAxios from '../request/index'

// 登入注册
export function setBudget(data) {
    return LAxios.post({
        url: `/budget/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function getUserBudget() {
    return LAxios.get({
        url: `/budget/getUserBudget`,
    })
}