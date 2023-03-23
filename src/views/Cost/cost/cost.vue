<script setup>
// Vue
import { watch, computed, ref, onActivated } from 'vue'
// Utils && Hook
import { createURLObj } from '@/utils'
import dayjs from 'dayjs'
import useScroll from '@/hooks/useScroll'
// Router
import { useRoute, onBeforeRouteLeave } from 'vue-router'
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
// store -- Cost
var costStore = useCostStore()
var { obj, isHiddenUser, current_page, current_month, reach150, transform_bill_info } = storeToRefs(costStore)
// store -- Tabbar
const tabBarStore = useTabBarStore()
const { isShowBigButton, isShowBoundaries, tabBar } = storeToRefs(tabBarStore)







// Ref
const Ref_cost = ref()
const Ref_banner = ref()

// 路由
const route = useRoute()
const book_id = route.params.bookname.replace(':', '')

costStore.get_bill_list(book_id).then(res => {
    obj.value.username = res.data.username
    obj.value.total_expense = res.data.total_expense
    obj.value.total_income = res.data.total_income
    obj.value.total_net = res.data.total_net
    obj.value.list = [...res.data.list]
}).catch(error => {
    console.warn(error);
})


function changeTabBar() {
    isShowBigButton.value = true
    isShowBoundaries.value = false
    tabBar.value[0].activeimg = route.meta.activeimg   // 返回 
    tabBar.value[0].JumpPath = route.meta.JumpPath
    tabBar.value[1].style.right = route.meta.right
    tabBar.value[2].style.left = route.meta.left
}
changeTabBar()


onBeforeRouteLeave((to, from) => {
    console.log('Leave', isShowBigButton.value, isShowBoundaries.value, tabBar.value);
    isShowBigButton.value = false;
    isShowBoundaries.value = true;
    tabBar.value[0].activeimg = 'home_active.png'
    tabBar.value[1].style.right = '0'
    tabBar.value[2].style.left = '0'

    current_page.value = 1
})


// 动画
const { isReachBottom, top, } = useScroll(Ref_cost)
const reach100 = ref(false)

/**
 * 
 */
const welcome = ref('Good afternoon,')
function changeWelcomText() {
    const time = dayjs().format('HH')
    if (time >= 6 && time < 12) welcome.value = 'Good Morning'
    if (time >= 12 && time < 19) welcome.value = 'Good Afternoon'
    if (time >= 19) welcome.value = 'Good Evening'
}
changeWelcomText()

/**
 * Keep-Alive
 */
// 
const ShowUsers = () => {
    isHiddenUser.value = false
}


// 
function changemonth(month) {
    console.log('cost:month', month);
    console.group('切换月份')
    console.time('切换月份')
    current_month.value = month
    current_page.value = 1
    costStore.get_bill_list(book_id, month).then(res => {
        obj.value.username = res.data.username
        obj.value.total_expense = res.data.total_expense
        obj.value.total_income = res.data.total_income
        obj.value.total_net = res.data.total_net
        obj.value.list = res.data.list
    })
    console.timeEnd('切换月份')
    console.groupEnd('切换月份')
}


const testt = ref(false)
function observerScroll() {
    watch(top, (newV) => {
        if (top.value > 50) {
            reach100.value = true
        }
        else reach100.value = false
        if (top.value > 150) {
            // 异步去修改
            reach150.value = true
            testt.value = true
        }
        else reach150.value = false
        if (isReachBottom.value == true) {
            costStore.get_bill_list(book_id).then(res => {
                if (!res) return
                obj.value.username = res.data.username
                obj.value.total_expense = res.data.total_expense
                obj.value.total_income = res.data.total_income
                obj.value.total_net = res.data.total_net
                obj.value.list.push(...res.data.list)
            })
        }
    })
}
observerScroll()



</script>

<template>
    <div class="cost" ref="Ref_cost">
        <topBar />
        <div class="banner">
            <banner ref="Ref_banner">
                <template #left>
                    <div class="left" :class="{ 'out-left': reach100 }">
                        <span v-html="welcome"></span>
                        <div class="name">{{ obj?.username }}</div>
                    </div>
                </template>
                <template #right>
                    <div @click="ShowUsers" :class="{ 'out-right': reach100 }"
                        style="display: flex;justify-content: center;align-items: center; height: 35px; background-color: rgba(255, 255, 255, .15);">
                        <img style="width: 25px;height: 25px;" src="@/assets/img/cost/frineds.svg" alt="">
                    </div>
                </template>
            </banner>
        </div>
        <showMoney :class="{ 'in-visibility': reach150 }" />
        <pop></pop>
        <list @changeMonth="changemonth" :list="obj.list" :reach150="reach150" :testt="testt" />
        <users />
    </div>
</template>

<style lang="less" scoped>
@keyframes shutter-out-left {

    0% {
        transform: translateX(0);
        transform-origin: left;
        opacity: 1;
    }

    100% {
        transform: translateX(-131px);
        transform-origin: left;
        // opacity: 0;
        display: none;
    }
}



@keyframes shutter-out-right {

    0% {
        transform: translateX(0);
        transform-origin: right;
        opacity: 1;
    }

    100% {
        transform: translateX(100px);
        transform-origin: right;
        // opacity: 0;
        display: none;
    }
}



@keyframes in-visibility {

    0% {
        transform: translateY(0);
        transform-origin: center;
        opacity: 1;
    }

    100% {
        transform: translateY(-100px);
        transform-origin: center;
        opacity: 0;
    }
}

.in-visibility {
    animation-name: in-visibility;
    animation-duration: .5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
}

.out-left {
    width: 100px;
    height: 100px;
    background-color: transparent;

    animation-name: shutter-out-left;
    animation-duration: .2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;

    /* shorthand
		animation: shutter-out-left 1s linear 0s 1 normal none;*/
}


.out-right {
    width: 100px;
    height: 100px;
    background-color: transparent;
    animation-name: shutter-out-right;
    animation-duration: .2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
}


.cost {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;


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


    .money {
        // display: none;
        opacity: .5;
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