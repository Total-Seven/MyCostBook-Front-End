import LAxios from '../request/index'

export function getUserInfos() {
    return LAxios.get({
        url: `/user/get_userinfo`,
    })
}

export function addCategory(data) {
    return LAxios.post({
        url: `/category/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function deleteCategory(data) {
    return LAxios.post({
        url: `/category/delete`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function gerAllAcount() {
    return LAxios.get({
        url: `/account/getAllAccount`,
    })
}
export function addBook(data) {
    return LAxios.post({
        url: `/book/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function delBook(data) {
    return LAxios.post({
        url: `/book/del`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function updateBook(data) {
    return LAxios.post({
        url: `/book/update`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}