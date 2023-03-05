<script setup>
// Vue
import { watch, reactive, ref, toRaw, onActivated } from 'vue'
import dayjs from 'dayjs'
// Vant
// Hook
import useScroll from '@/hooks/useScroll'
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
import useLoginStore from '@/stores/modules/login'
import useTabBarStore from '@/stores/modules/Tabbar' //TabBar
import { storeToRefs } from 'pinia'
const costStore = useCostStore()
const { obj, isHiddenUser, popUp_account, popUp_category_list, fixedTitle, current_page } = storeToRefs(costStore)
const tabBarStore = useTabBarStore()
const { isShowBigButton, isShowBoundaries, tabBar } = storeToRefs(tabBarStore)
const loginStore = useLoginStore()
const { user_info, category_list } = storeToRefs(loginStore)
// 用户ID： user_info.value.infos.id
console.log(toRaw(user_info.value.account), toRaw(category_list.value));
// 路由
const route = useRoute()
const router = useRouter()
// 
const Ref_cost = ref()
const Ref_banner = ref()
// 
const book_id = route.params.bookname.replace(':', '')
const current_month = dayjs().format('YYYY-MM')
// 
costStore.get_bill_list(book_id, current_month).then(res => {
    obj.value.username = res.data.username
    obj.value.total_expense = res.data.total_expense
    obj.value.total_income = res.data.total_income
    obj.value.total_net = res.data.total_net
    obj.value.list = [...res.data.list]
    console.log(toRaw(obj.value), '???');
})


onBeforeRouteLeave((to, from) => {
    // const answer = window.confirm(
    //     'Do you really want to leave? you have unsaved changes!'
    // )
    console.log(isShowBigButton.value, isShowBoundaries.value, tabBar.value);
    isShowBigButton.value = false;
    isShowBoundaries.value = true;
    tabBar.value[0].activeimg = 'home_active.png'
    tabBar.value[1].style.right = '0'
    tabBar.value[2].style.left = '0'
    // 取消导航并停留在同一页面上
    // if (!answer) return false
})

// 
const welcome = ref('Good afternoon,')
function changeWelcomText() {
    const time = dayjs().format('HH')
    console.log('现在的时间是:', time);
    if (time >= 6 && time < 12) welcome.value = 'Good Morning'
    if (time >= 12 && time < 19) welcome.value = 'Good Afternoon'
    if (time >= 19) welcome.value = 'Good Evening'
}
changeWelcomText()
// 
const ShowUsers = () => {
    isHiddenUser.value = false
}
// 动画
const { isReachBottom, top, Top, pageHeight } = useScroll(Ref_cost)
const reach100 = ref(false)
const reach150 = ref(false)
let title_style = {}
// 追加分页
watch(top, (newV) => {
    console.log(top.value);
    if (top.value > 50) {
        reach100.value = true
    }
    else reach100.value = false
    if (top.value > 150) {
        reach150.value = true
    }
    else reach150.value = false
    if (isReachBottom.value == true) {
        console.log('发送请求');
        costStore.get_bill_list(book_id, current_month).then(res => {
            obj.value.username = res.data.username
            obj.value.total_expense = res.data.total_expense
            obj.value.total_income = res.data.total_income
            obj.value.total_net = res.data.total_net
            obj.value.list.push(...res.data.list)
        })
    }
    if (top.value > 400) {
        title_style = { 'background-color': '#429690' }
    }
})
// 给list的title传对象

// 
function changemonth(month) {
    console.log(month);
    console.group('切换月份')
    console.time('切换月份')
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


// 
onActivated(() => {
    console.log('activated', top.value);
    Ref_cost.value.scrollTop = top.value
})
</script>

<template>
    <div class="cost" ref="Ref_cost">
        <topBar />
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
        <showMoney :expense="obj.total_expense" :income="obj.total_income" :net="obj.total_net"
            :class="{ 'in-visibility': reach150 }" />
        <pop></pop>
        <list @changeMonth="changemonth" :list="obj.list" :title_style="title_style" />
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
        transform: translateX(-100px);
        transform-origin: left;
        opacity: 0;
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
        opacity: 0;
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

    .money {
        // display: none;
        opacity: .5;
    }

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