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
        user_info: {}
    }),
    actions: {
        PostRegister() {
            console.log(register);
        },
        PostLogin() {
            return new Promise(async (resolve, reject) => {
                this.isShowanimation = true
                const res = await loginOrRegister('login', this.submit_login)
                if (res.code == 200) {
                    resolve(res)
                }
                else if (res.code == 500) {
                    this.isShowanimation = false
                    reject(res)
                }
                else {
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