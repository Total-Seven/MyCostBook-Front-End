import { defineStore } from "pinia";
import { setBudget, getUserBudget } from "@/service";

const store = {
    state() {
        return {
            userinfo: {},
            set_budget_info: {},
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
        }
    },
}
const usePlanStore = defineStore('Plan', store)

export default usePlanStore 