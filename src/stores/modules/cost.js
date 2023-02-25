import { defineStore } from "pinia";

const store = {
    state() {
        return {
            show: false,
            isHiddenUser: false
        }
    },
    getters: {},
    actions: {},

}
const useCostStore = defineStore('Cost', store)

export default useCostStore