import { defineStore } from "pinia";

import { get_list } from '@/service/index'

const store = {
    state() {
        return {
            show: false,
            isHiddenUser: false,
            get_list_infos: {},
        }
    },
    getters: {},
    actions: {
        async get_bill_list(book_id, current_month, current_page) {
            console.group('get_bill_list,发送网络请求');
            console.log('...loading',);
            return new Promise(async (resolve, reject) => {
                console.time('get_bill_list')
                const res = await get_list(book_id, current_month, current_page)
                console.timeEnd('get_bill_list')
                if (res.code == 200) {
                    resolve(res)
                    this.isShowanimation = false
                    console.log('!!!,请求成功🔥', res.data);
                    console.groupEnd('get_bill_list,发送网络请求');
                }
                else {
                    console.log('失败，get_bill_list');
                    reject(res)
                }
            })
        }
    }
}
const useCostStore = defineStore('Cost', store)

export default useCostStore