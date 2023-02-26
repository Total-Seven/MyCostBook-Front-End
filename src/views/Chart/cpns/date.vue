<script setup>
// Vue
import { ref, computed, watch } from 'vue';
// Dayjs
import dayjs from 'dayjs'
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { data, menu, tab } = storeToRefs(chartStore)
/**
 * 根据Year、Month、Week、Day决定（tab）
 */
const date_arr = computed(() => {
    return data.value[menu.value][tab.value].time  // 后端返回可选择的日期（用户有账单记录的）
})
// 理想索引
const init_index = computed(() => {
    return date_arr.value.findIndex(el => {
        return el == data.value[menu.value].nowTime[tab.value]    // nowTime对象里存着各tab的理想日期，在可选择的日期里一定能找到。
    })
})
// 当前索引
const current_index = ref(0)
/**
 * 监听 tab 和 menu 的变化，做边界判断
 */
watch(date_arr, (newV, oldV) => {
    console.log(0, current_index.value, date_arr.value.length);
    // if (current_index.value > date_arr.value.length) {
    current_index.value = init_index.value
    // }
})

// 文字显示内容
const now = computed(() => {
    return date_arr.value[current_index.value]
})

// 点击事件
const decreaseShift = () => {
    if (current_index.value == 0) return
    current_index.value--
}
const IncreaseShift = () => {
    if (current_index.value == date_arr.value.length - 1) return
    current_index.value++
}
</script>

<template>
    <div class="date">
        <div class=" box left" @click="decreaseShift">
            <img src="../img/left.svg" alt="">
        </div>
        <div class=" box time">{{ now }}</div>
        <div class=" box right" @click="IncreaseShift">
            <img src="../img/right.svg" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.date {
    position: relative;
    display: flex;
    width: 90vw;
    justify-content: space-around;
    margin: 25px 0 0 20px;

    img {
        width: 35px;
        height: 35px;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 85px;
        height: 35px;
        color: rgb(102, 102, 102);
    }

    .time {
        flex: 1;
        position: relative;
        top: 2px;
    }
}
</style>