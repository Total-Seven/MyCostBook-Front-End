//axios 
import { loginOrRegister } from '@/service'
// Pinia
import { defineStore, storeToRefs } from 'pinia'
// 路由
import { useRouter } from 'vue-router'
// Store
import useLoginStore from './login'
const loginStore = useLoginStore()
const { token } = storeToRefs(loginStore)

// useRouter().push()

const useRegisterStore = defineStore('register', {
    state: () => ({
        submit_register: {},
        token: '',
        default_book_id: 0,
    }),
    actions: {
        /**
         * 注册成功，自动登录。
         * 保存token
         * 跳转到home
         */
        PostRegister() {
            return new Promise(async (resolve, reject) => {
                this.isShowanimation = true
                const res = await loginOrRegister('register', this.submit_register)
                if (res.code == 200) {
                    this.default_book_id = res.data.default_book_id
                    this.token = res.data.token
                    resolve(res)
                } else if (res.code == 500) {
                    this.isShowanimation = false
                    reject(res)
                }
            })
        }
    }
})

export default useRegisterStore