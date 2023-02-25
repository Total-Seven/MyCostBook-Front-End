<script setup>
import { ref } from 'vue';

const current_index = ref(0)
const shift = (index) => {
    current_index.value = index
    console.log('click', index, current_index.value);
}
</script>

<template>
    <div class="tabs">
        <template v-for="(item, index) in ['Day', 'Week', 'Month', 'Year']" :key="index">
            <div class="box" :class="{ 'shadow-drop-center': current_index == index }" @click="shift(index)">
                <span class="font">{{ item }}</span>
            </div>
        </template>
</div>
</template>

<style lang="less" scoped>
@-webkit-keyframes shadow-drop-2-center {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-box-shadow: 0 0 0 0 rgb(0, 0, 0);
        box-shadow: 0 0 0 0 rgb(0, 0, 0);
    }

    100% {
        -webkit-transform: translateZ(50px);
        transform: translateZ(50px);
        -webkit-box-shadow: 0 0 20px 0px rgb(67, 136, 131);
        box-shadow: 0 0 20px 0px rgb(67, 136, 131);
    }
}

@keyframes shadow-drop-2-center {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-box-shadow: 0 0 0 0 rgb(0, 0, 0);
        box-shadow: 0 0 0 0 rgb(0, 0, 0);
    }

    100% {
        -webkit-transform: translateZ(50px);
        transform: translateZ(50px);
        -webkit-box-shadow: 0 0 20px 0px rgb(67, 136, 131);
        box-shadow: 0 0 20px 0px rgb(67, 136, 131);
    }
}

.tabs {
    position: relative;
    z-index: 4;
    display: flex;
    width: 100vw;
    justify-content: center;
    margin-top: 20px;

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 85px;
        height: 35px;
        color: rgb(102, 102, 102);
    }

    .shadow-drop-center {
        font-weight: 600;
        font-size: 16px;
        background-color: rgba(67, 136, 131);
        -webkit-animation: shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        color: #f5f5f5;
    }
}
</style>