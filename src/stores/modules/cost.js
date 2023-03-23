import { defineStore } from "pinia";

import { get_list, del_bill, detail, add_bill, create_plan, delete_plan, Update_plan, transform } from '@/service/index'

import dayjs from 'dayjs'

const store = {
    state() {
        return {
            reach150: false,
            // 
            current_month: dayjs().format('YYYY-MM'),
            // 
            del_bill_info: {},
            add_bill_info: {},
            transform_bill_info: {},
            // 
            add_plan_info: {},
            del_plan_info: {},
            update_plan_info: {},
            // 
            obj: {
                username: '',
                total_expense: 0,
                total_income: 0,
                total_net: 0,
                list: {},
            },
            fixedTitle: false,
            // 点击按钮添加账单
            show: false,
            // 
            isHiddenUser: true,  // 默认cost页 -- User(friends) 隐藏
            get_list_infos: {},
            popUp_category_list: [],
            popUp_account: [],
            current_page: 1,
            totalPage: 1,
            bill_detail: {},
            type: {},
        }
    },
    getters: {},
    actions: {
        // 记账页--列表
        async get_bill_list(book_id) {
            if (this.current_page > this.totalPage) return false
            console.group('get_bill_list,发送网络请求', '当前页数:', this.current_page, '总页数:', this.totalPage);
            return new Promise(async (resolve, reject) => {
                const res = await get_list(book_id, this.current_month, this.current_page++)
                if (res.code == 200) {
                    resolve(res)
                    this.isShowanimation = false
                    console.log(`%c ! 请求成功🔥,数据:${res.data}`, 'background:green');
                    console.dir(res.data)
                    this.totalPage = res.data.totalPage
                    this.popUp_account = res.data.account
                    //
                    // console.log(toRaw(this.popUp_account));
                    this.popUp_account.forEach(item => {
                        item.icon = 'wechat'
                    })
                    // 
                    this.popUp_category_list = res.data.category_list
                    this.type = res.data.typess
                    console.groupEnd('get_bill_list,发送网络请求');
                }
                else {
                    console.log('失败，get_bill_list');
                    reject(res)
                }
            })
        },
        async post_add_bill() {
            console.time('添加账单');
            return new Promise(async (resolve, reject) => {
                const res = await add_bill(this.add_bill_info)
                if (res.code == 200) {
                    console.timeEnd('添加账单');
                    console.log('add_bill🔥成功', res.data);
                    resolve(res.data)
                }
            })
        },
        async post_transform() {
            console.time('转账');
            return new Promise(async (resolve, reject) => {
                const res = await transform(this.transform_bill_info)
                if (res.code == 200) {
                    console.timeEnd('转账');
                    console.log('post_transform🔥成功', res.data);
                    resolve(res.data)
                }
                else {
                    console.warn('转账失败❌', res);
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
                else {
                    reject(res)
                }
            })
        },
        // 记账页--详情
        async get_detail(id) {
            const res = await detail(id)
            if (res.code == 200) {
                this.bill_detail = res.data
                console.log('get_detail成功🔥', this.bill_detail);
            }
        },
        // 首页--计划
        async post_create_plan() {
            console.log('post_create_plan');
            return new Promise(async (resolve, reject) => {
                const res = await create_plan(this.add_plan_info)
                if (res.code == 200) {
                    console.log('create_plan成功🔥', res.data);
                    resolve(res.data)
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
        },
        async Update_plan() {
            console.log('post_Update_plan');
            return new Promise(async (resolve, reject) => {
                const res = await Update_plan(this.update_plan_info)
                if (res.code === 200) {
                    console.log('_Update_plan成功🔥', res.data);
                    resolve(res.data)
                }
                else {
                    console.log('❗❗❗失败❗❗❗');
                    reject()
                }
            })
        }
    }
}
const useCostStore = defineStore('Cost', store)

export default useCostStore