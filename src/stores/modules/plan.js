import { defineStore } from "pinia";
import { setBudget, getUserBudget } from "@/service";

const store = {
    state() {
        return {
            userinfo: {},
            set_budget_info: {},
        }
    },
    getters: {},
    actions: {
        async get_userBudget() {
            return new Promise(async (resolve, reject) => {
                const res = await getUserBudget()
                if (res) {
                    if (res.code == 200) {
                        const { id, budget_mode, budget, current_budget } = res.data.userInfo
                        this.userinfo = { id, budget_mode, budget, current_budget }
                        // console.log('200', res.data);
                        // console.log(this.userinfo);
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
            return new Promise(async (resolve, reject) => {
                const res = await setBudget(this.set_budget_info)
                if (res) {
                    if (res.code === 200) {
                        resolve(res)
                    }
                    else if (res.code === 500) {
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