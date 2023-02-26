<script setup>
import { ref } from 'vue';
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { menu } = storeToRefs(chartStore)
// 
const ismenu = ref(false)


const current_index = ref(0)
const shift = (item, index) => {
    current_index.value = index
    menu.value = item
    // console.log('这里是menus:', menu.value);
}
</script>

<template>
    <div class="menus">
        <!-- <div class="menu" @click="ismenu == true ? ismenu = false : ismenu = true">
                                                                                                                                                                                                                                                                        <span>Expense</span>
                                                                                                                                                                                                                                                                        <van-icon v-if="ismenu == false" class="icon" name="arrow-down" />
                                                                                                                                                                                                                                                                        <van-icon v-else-if="ismenu == true" class="icon" name="arrow-up" />
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                    <div class='at-container' :class="{ 'at-item': ismenu }">
                                                                                                                                                                                                                                                                        <div id='at-item'></div>
                                                                                                                                                                                                                                                                    </div> -->
        <div class="menu">
            <template v-for="(item, index) in ['Exp', 'Inc', 'Trf']" :key="index">
                <div class=" item " :class="{ active: current_index == index }" @click="shift(item, index)"><span>{{ item
                }}</span></div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
// 
@keyframes puff-in-horizontal {

    0% {
        transform: scaleX(2);
        filter: blur(4px);
        opacity: 0;
    }

    100% {
        transform: scaleX(1);
        filter: blur(0);
        opacity: 1;
    }
}

.menus {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10px 0;


    .menu {
        background-color: #dcdada;
        // 
        display: flex;
        justify-content: center;
        align-items: center;
        // 
        width: 120px;
        height: 30px;
        padding: 3px;
        // border: 1px solid #438883;
        border-radius: 12px;
        color: #438883;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 30px;
            // background-color: #ece9e9;
            border-radius: 8px;
        }

        .active {
            background-color: #fff;
        }

        span {
            line-height: 24px;
        }

        .icon {
            margin-left: 10px;
        }
    }
}

// div.at-container {
//     width: 90px;
//     height: 60px;
//     padding: 2px;
//     // background-color: pink;
//     // 
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     // 
//     position: absolute;
//     z-index: 9;
//     top: 70px;
//     right: 50px;

// }

// .at-item {
//     width: 100%;
//     height: 100px;
//     // background-color: #ffe672;
//     border: 1px solid #438883;
//     border-radius: 12px;
//     color: #438883;
//     animation-name: puff-in-horizontal;
//     animation-duration: 0.25s;
//     animation-timing-function: linear;
//     animation-delay: 0s;
//     animation-iteration-count: 1;
//     animation-direction: normal;
//     animation-fill-mode: none;
//     filter: blur(1);
//     // border-color: rgb(102, 102, 102);
//     // box-shadow: inset 0px 0px 4px 1px #333;

//     /* shorthand
// 		animation: puff-in-horizontal 1s linear 0s 1 normal none;*/
// }

// .at-item::before {
//     content: 'Income';
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 90px;
//     height: 30px;
//     border-bottom: 1px solid #438883;
// }

// .at-item::after {
//     content: 'Transfer';
//     display: flex;
//     justify-content: center;
//     ;
//     align-items: center;

//     width: 90px;
//     height: 30px;
//     border-radius: 12px;
// }
</style>