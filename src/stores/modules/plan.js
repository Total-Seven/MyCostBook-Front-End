import { defineStore } from "pinia";
import { setBudget, getUserBudget, create_ShoppingList, all_inventory, del_inventory, Add_Goods, Del_Goods, charge } from "@/service";

const store = {
    state() {
        return {
            userinfo: {},
            set_budget_info: {},
            // shopping_list: [
            //     { isShow: false, name: '清单一', total: 888.00, icon: "", goods_list: [{ name: '臭袜子', amount: 88, checked: false }, { name: '钵钵鸡', amount: 88, checked: false }, { name: '旅游', amount: 88, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] },
            //     { isShow: false, name: '清单二', total: 777.00, icon: "", goods_list: [{ name: '吃火锅', amount: 77, checked: false }, { name: 'DUnk', amount: 88, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] },
            //     { isShow: false, name: '清单三', total: 666.00, icon: "", goods_list: [{ name: '衣服', amount: 66, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] }
            // ],
            shopping_list: [],
            create_ShoppingList_info: {},
            delete_ShoppingList_info: {},
            add_goods_info: {},
            del_goods_info_id: 0,
            // 
        }
    },
    getters: {},
    actions: {
        async get_userBudget() {
            console.group('Fortune,发送网络请求');
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('Fortune')
                const res = await getUserBudget()
                if (res) {
                    if (res.code == 200) {
                        const { id, budget_mode, budget, current_budget } = res.data.userInfo
                        this.userinfo = { id, budget_mode, budget, current_budget }
                        console.groupEnd('Fortune,发送网络请求');
                        resolve(res)
                    }
                    else if (res.code == 500) {
                        console.log('500', res);
                        reject(res)
                    }
                }
                else {
                    console.log('setBudget失败');
                }
            })
        },
        async Post_set_budget() {
            console.group('Set Budget,发送网络请求');
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('Set Budget')
                const res = await setBudget(this.set_budget_info)
                if (res) {
                    if (res.code === 200) {
                        this.userinfo = res.data.user_budget[0]
                        console.log('', res.data.user_budget[0], this.userinfo);
                        console.log('200', res.data);
                        resolve(res)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('Set Budget')
                        console.groupEnd('Set Budget,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('setBudget失败');
                }
            })
        },
        async get_all_inventory() {
            console.group('get_all_inventory,发送网络请求');
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('get_all_inventory')
                const res = await all_inventory()
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        this.shopping_list = res.data.list
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('get_all_inventory')
                        console.groupEnd('get_all_inventory,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('get_all_inventory失败');
                }
            })
        },
        async Post_Create_Shopping_list() {
            console.group('Create_Shopping_list,发送网络请求');
            console.log('...正在加载');
            console.log(this.create_ShoppingList_info);
            return new Promise(async (resolve, reject) => {
                console.time('Create_Shopping_list')
                const res = await create_ShoppingList(this.create_ShoppingList_info)
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('Create_Shopping_list')
                        console.groupEnd('Create_Shopping_list,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('Create_Shopping_list失败');
                }
            })
        },
        async Post_Delete_Shopping_list() {
            console.group('Delete_Shopping_list,发送网络请求');
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('Delete_Shopping_list')
                const res = await del_inventory(this.delete_ShoppingList_info)
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('Delete_Shopping_list')
                        console.groupEnd('Delete_Shopping_list,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('Delete_Shopping_list失败');
                }
            })
        },
        async Post_Add_Goods() {
            console.group('Add_Goods,发送网络请求');
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('Add_Goods')
                const res = await Add_Goods(this.add_goods_info)
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('Add_Goods')
                        console.groupEnd('Add_Goods,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('Add_Goods失败');
                }
            })
        },
        async Post_Del_Goods() {
            console.group('Del_Goods,发送网络请求');
            console.log('...正在加载');
            console.log(this.del_goods_info_id);
            return new Promise(async (resolve, reject) => {
                console.time('Del_Goods')
                const res = await Del_Goods(this.del_goods_info_id)
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('Del_Goods')
                        console.groupEnd('Del_Goods,发送网络请求');
                    }
                    else if (res.code === 500) {
                        console.log('500', res.data);
                        reject(res)
                    }
                }
                else {
                    console.log('Del_Goods失败');
                }
            })
        },
        async Post_charge(charge_infos) {
            console.group('charge,发送网络请求');
            console.log(charge_infos);
            console.log('...正在加载');
            return new Promise(async (resolve, reject) => {
                console.time('charge')
                const res = await charge(charge_infos)
                console.log(res);
                if (res) {
                    if (res.code === 200) {
                        console.log('200', res.data);
                        resolve(res.data)
                        console.log('!!!,请求成功🔥');
                        console.timeEnd('charge')
                        console.groupEnd('charge,发送网络请求');
                    }
                }
                else {
                    console.log('charge失败', res);
                }
            })
        },
    },
}
const usePlanStore = defineStore('Plan', store)

export default usePlanStore 