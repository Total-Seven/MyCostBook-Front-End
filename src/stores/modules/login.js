import { useRouter } from 'vue-router';
import { showToast } from 'vant';

import { defineStore } from 'pinia'

import { loginOrRegister } from '@/service'


const router = useRouter()


const useLoginStore = defineStore('login', {
    state: () => ({
        // 
        isShowPlaneLoading: false,
        // 
        submit_login: {},
        token: '',
        isShowanimation: false,
        // 
        books: {},
        plan_list: [],
        all_cg: [],
        category_list: [],
        // 
        user_info: {
            infos: {},
            account: {},
            net: 0,
            assets: 0,
            debt: 0,
            saved_money: 0,
            budget: 0,
        }
    }),
    actions: {
        PostRegister() {
            console.log(register);
        },
        PostLogin() {
            console.group('Login,发送网络请求');
            return new Promise(async (resolve, reject) => {
                this.isShowanimation = true
                const res = await loginOrRegister('login', this.submit_login)
                if (res.code == 200) {
                    this.user_info.infos = res.data.userInfo   // ❌❌❌
                    // function del_shooping_book(raw_arr) {
                    //     console.log(raw_arr);
                    //     const targetIndex = raw_arr.findIndex(el => {
                    //         return el.name == '购物清单'
                    //     })
                    //     return raw_arr.splice(targetIndex - 1, 1)
                    // }
                    // this.books = del_shooping_book(res.data.books)
                    this.books = res.data.books
                    // this.books = res.data.books
                    this.category_list = res.data.category_list
                    this.all_cg = res.data.all_cg
                    this.plan_list = res.data.plan
                    // 账户
                    this.user_info.account = res.data.accounts
                    this.user_info.net = res.data.net
                    this.user_info.assets = res.data.assets
                    this.user_info.debt = res.data.debt
                    this.user_info.saved_money = res.data.Saved_Money
                    this.user_info.budget = res.data.userInfo.budget
                    resolve(res)
                    this.isShowanimation = false
                    console.log('!!!,请求成功🔥');
                    console.groupEnd('Login,发送网络请求');
                }
                else {
                    this.isShowanimation = false
                    // 
                    reject()
                    throw new Error('出错了')
                }
                // if (!res.data) {
                //     throw new Error('登入失败')
                // }
                // this.token = res.data.token
                // console.log('1.登入成功！', this.token);
                // router.push('/home')
            })
        }
    },
})
export default useLoginStore