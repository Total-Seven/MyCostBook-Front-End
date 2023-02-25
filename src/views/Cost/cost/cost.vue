<script setup>
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import topBar from '@/components/topBar.vue'
import banner from '@/components/banner.vue'
import showMoney from './cpns/showmoney.vue'
import list from './cpns/list.vue'
import users from './cpns/users.vue'
import pop from './cpns/pop.vue'

import useCostStore from '@/stores/modules/cost'
import useTabBarStore from '@/stores/modules/Tabbar'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const costStore = useCostStore()
const { isHiddenUser } = storeToRefs(costStore)
const tabBarStore = useTabBarStore()
const { isShowBigButton, isShowBoundaries, tabBar } = storeToRefs(tabBarStore)
const route = useRoute()
const router = useRouter()

const click = () => {
    router.back()
}

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
// Vant

</script>

<template>
    <div class="cost">
        <topBar />
        <banner>
            <template #left>
                <div class="left" @click="click">
                    <span>Good afternoon,</span>
                    <div class="name">Enjelin Morgeana</div>
                </div>
            </template>
            <template #right>
                <div @click="ShowUsers">
                    <img src="@/assets/img/Profile_Center/Center_tip.png" alt="">
                </div>
            </template>

        </banner>
        <showMoney />
        <pop></pop>
        <list />
        <users />
        <!-- <div class="route">
                                                                                            {{ route.path }}
                                                                                        </div> -->
</div>
</template>

<style lang="less" scoped>
.cost {
    position: relative;
    width: 100vvw;
    height: 100vh;
    overflow-y: auto;
    margin-bottom: 60px;

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