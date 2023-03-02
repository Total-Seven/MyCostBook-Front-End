import { useRouter } from 'vue-router';
import { showToast } from 'vant';

import { defineStore } from 'pinia'

import { loginOrRegister } from '@/service'


const router = useRouter()


const useLoginStore = defineStore('login', {
    state: () => ({

        submit_login: {},
        token: '',
        isShowanimation: false,
        books: {},
        user_info: {
            infos: {},
            account: {},
            net: 0,
            assets: 0,
            debt: 0,
        }
    }),
    actions: {
        PostRegister() {
            console.log(register);
        },
        PostLogin() {
            console.group('Login,发送网络请求');
            console.log('...loading',);
            return new Promise(async (resolve, reject) => {
                this.isShowanimation = true
                const res = await loginOrRegister('login', this.submit_login)
                if (res) {
                    this.user_info.infos = res.data.userInfo
                    this.books = res.data.books
                    this.user_info.account = res.data.accounts
                    this.user_info.net = res.data.net
                    this.user_info.assets = res.data.assets
                    this.user_info.debt = res.data.debt
                    console.log('成功返回', res);
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