import { defineStore } from "pinia";
import { toRaw } from "vue";
import { get_list, del_bill, detail, add_bill, create_plan, delete_plan } from '@/service/index'

const store = {
    state() {
        return {
            del_bill_info: {},
            add_bill_info: {},
            // 
            add_plan_info: {},
            del_plan_info: {},
            // 
            obj: {
                username: '',
                total_expense: 0,
                total_income: 0,
                total_net: 0,
                list: {},
            },
            fixedTitle: false,
            show: false,
            isHiddenUser: false,
            get_list_infos: {},
            popUp_category_list: [],
            popUp_account: [],
            current_page: 1,
            bill_detail: {},
            type: {},
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
                    this.type = res.data.typess
                    console.log(this.popUp_account, this.popUp_category_list);
                    console.groupEnd('get_bill_list,发送网络请求');
                }
                else {
                    console.log('失败，get_bill_list');
                    reject(res)
                }
            })
        },
        async post_del_bill() {
            console.time('删除账单');
            return new Promise(async (resolve, reject) => {
                const res = await del_bill(this.del_bill_info)
                if (res.code == 200) {
                    console.timeEnd('删除账单');
                    console.log('del_bill🔥成功', res.data);
                    resolve(res.data)
                }
            })
        },
        async get_detail(id) {
            const res = await detail(id)
            if (res.code == 200) {
                this.bill_detail = res.data
                console.log('get_detail成功🔥', this.bill_detail);
            }
        },
        async post_create_plan() {
            console.log('post_create_plan');
            return new Promise(async (resolve, reject) => {
                const res = await create_plan(this.add_plan_info)
                if (res.code == 200) {
                    console.log('create_plan成功🔥', res.data);
                    resolve(res.data)
                    showSuccessToast('成功文案');
                }
                else {
                    console.log('❗❗❗失败❗❗❗');
                }
            })
        },
        async post_del_plan() {
            console.log('post_delete_plan');
            return new Promise(async (resolve, reject) => {
                const res = await delete_plan(this.del_plan_info)
                if (res.code == 200) {
                    console.log('_delete_plan成功🔥', res.data);
                    resolve(res.data)
                }
                else {
                    console.log('❗❗❗失败❗❗❗');
                }
            })
        }
    }
}
const useCostStore = defineStore('Cost', store)

export default useCostStore