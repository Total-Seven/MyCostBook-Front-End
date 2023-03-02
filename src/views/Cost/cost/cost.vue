<script setup>
// Vue
import { reactive, ref, toRaw } from 'vue'
import dayjs from 'dayjs'
// Vant

// Router
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
// 组件
import topBar from '@/components/topBar.vue'
import banner from '@/components/banner.vue'
import showMoney from './cpns/showmoney.vue'
import list from './cpns/list.vue'
import users from './cpns/users.vue'
import pop from './cpns/pop.vue'
// Store
import useCostStore from '@/stores/modules/cost'     //Cost
import useTabBarStore from '@/stores/modules/Tabbar' //TabBar

import { storeToRefs } from 'pinia'
const costStore = useCostStore()
const { isHiddenUser } = storeToRefs(costStore)
const tabBarStore = useTabBarStore()
const { isShowBigButton, isShowBoundaries, tabBar } = storeToRefs(tabBarStore)
// 路由
const route = useRoute()
const router = useRouter()
// 
console.log(route.params);
const book_id = route.params.bookname.replace(':', '')
const current_month = dayjs().subtract(1, 'month').format('YYYY-MM')
const current_page = ref(1)
const obj = reactive({
    username: '',
    total_expense: 0,
    total_income: 0,
    total_net: 0,
    list: {},
})
costStore.get_bill_list(book_id, current_month, current_page.value).then(res => {
    console.log(res.data.username, res.data.total_expense, res.data.total_income, res.data.total_net);
    obj.username = res.data.username
    obj.total_expense = res.data.total_expense
    obj.total_income = res.data.total_income
    obj.total_net = res.data.total_net
    obj.list = res.data.list
    console.log(toRaw(obj), '???');
})


onBeforeRouteLeave((to, from) => {
    const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
    )
    console.log(isShowBigButton.value, isShowBoundaries.value, tabBar.value);
    isShowBigButton.value = false;
    isShowBoundaries.value = true;
    tabBar.value[0].activeimg = 'home_active.png'
    tabBar.value[1].style.right = '0'
    tabBar.value[2].style.left = '0'
    // 取消导航并停留在同一页面上
    if (!answer) return false
})

const ShowUsers = () => {
    isHiddenUser.value = false
}

</script>

<template>
    <div class="cost">
        <topBar />
        <banner>
            <template #left>
                <div class="left">
                    <span>Good afternoon,</span>
                    <div class="name">{{ obj?.username }}</div>
                </div>
            </template>
            <template #right>
                <div @click="ShowUsers">
                    <img src="@/assets/img/Profile_Center/Center_tip.png" alt="">
                </div>
            </template>
        </banner>
        <showMoney :expense="obj.total_expense" :income="obj.total_income" :net="obj.total_net" />
        <pop></pop>
        <list :list="obj.list" />
        <users />
    </div>
</template>

<style lang="less" scoped>
.cost {
    position: relative;
    width: 100vvw;
    height: 100vh;

    .left {
        color: #ffffff;
        width: 150px;

        .name {
            width: 250px;
            margin-top: 2px;
            font-size: 20px;
            font-weight: 600;
            line-height: 28px;
        }
    }

    .route {
        position: relative;
        z-index: 3;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.appa {
    width: 100xw;
    height: 80px;
    background-color: black;
    position: relative;
    z-index: 999;
}
</style>