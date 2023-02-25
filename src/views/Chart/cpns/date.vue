<script setup>

import { ref } from 'vue';
import dayjs from 'dayjs'

const current_index = ref(0)
const shift = (index) => {
    current_index.value = index
    console.log('click', index, current_index.value);
}

const now = dayjs().format()
</script>

<template>
    <div class="date">
        <div class=" box left">
            <img src="../img/left.svg" alt="">
        </div>
        <div class=" box time">{{ now }}</div>
        <div class=" box right">
            <img src="../img/right.svg" alt="">
        </div>
</div>
</template>

<style lang="less" scoped>
.date {
    // padding: 0 20px;
    position: relative;
    z-index: 4;
    display: flex;
    width: 90vw;
    justify-content: space-around;
    margin-top: 25px;
    margin-left: 20px;

    img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
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