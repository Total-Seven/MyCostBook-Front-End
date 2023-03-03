import { defineStore } from "pinia";
import { toRaw } from "vue";
import { get_list } from '@/service/index'

const store = {
    state() {
        return {
            fixedTitle: false,
            show: false,
            isHiddenUser: false,
            get_list_infos: {},
            popUp_category_list: [],
            popUp_account: [],
            current_page: 1,
        }
    },
    getters: {},
    actions: {
        async get_bill_list(book_id, current_month) {
            console.group('get_bill_list,发送网络请求');
            console.log('...loading',);
            return new Promise(async (resolve, reject) => {
                console.time('get_bill_list')
                const res = await get_list(book_id, current_month, this.current_page++)
                console.timeEnd('get_bill_list')
                if (res.code == 200) {
                    resolve(res)
                    this.isShowanimation = false
                    console.log('!!!,请求成功🔥', res.data);
                    this.popUp_account = res.data.account
                    //
                    // console.log(toRaw(this.popUp_account));
                    this.popUp_account.forEach(item => {
                        item.icon = 'wechat'
                    })
                    // 
                    this.popUp_category_list = res.data.category_list
                    console.log(this.popUp_account, this.popUp_category_list);
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