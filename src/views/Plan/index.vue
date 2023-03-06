<script setup>
import { ref, onMounted, reactive, watch, toRaw } from 'vue';
// Store
import usePlanStore from '@/stores/modules/plan';

// HighCharts
import pies from '../Chart/cpns/pies.vue';
import Highcahrts from 'highcharts'
import planBanner from './cpns/banner.vue'
import content from './cpns/content.vue';
import dashBoard from './cpns/dashBoard.vue';
import { storeToRefs } from 'pinia';
import useTouch from '@/utils/touch';

// Highcharts.chart('container', );
// const chartOption = {
//     title: {
//         text: 'Highcharts Wind Barbs'
//     },
//     xAxis: {
//         type: 'datetime',
//         offset: 40
//     },
//     plotOptions: {
//         series: {
//             pointStart: Date.UTC(2017, 0, 29),
//             pointInterval: 36e5
//         }
//     },
//     series: [{
//         type: 'windbarb',
//         data: [
//             [9.8, 177.9],
//             [10.1, 177.2],
//             [11.3, 179.7],
//             [10.9, 175.5],
//             [9.3, 159.9],
//             [8.8, 159.6],
//             [7.8, 162.6],
//             [5.6, 186.2],
//             [6.8, 146.0],
//             [6.4, 139.9],
//             [3.1, 180.2],
//             [4.3, 177.6],
//             [5.3, 191.8],
//             [6.3, 173.1],
//             [7.7, 140.2],
//             [8.5, 136.1],
//             [9.4, 142.9],
//             [10.0, 140.4],
//             [5.3, 142.1],
//             [3.8, 141.0],
//             [3.3, 116.5],
//             [1.5, 327.5],
//             [0.1, 1.1],
//             [1.2, 11.1]
//         ],
//         name: 'Wind',
//         color: Highcahrts.getOptions().colors[1],
//         showInLegend: false,
//         tooltip: {
//             valueSuffix: ' m/s'
//         }
//     }, {
//         type: 'area',
//         keys: ['y', 'rotation'], // rotation is not used here
//         data: [
//             [9.8, 177.9],
//             [10.1, 177.2],
//             [11.3, 179.7],
//             [10.9, 175.5],
//             [9.3, 159.9],
//             [8.8, 159.6],
//             [7.8, 162.6],
//             [5.6, 186.2],
//             [6.8, 146.0],
//             [6.4, 139.9],
//             [3.1, 180.2],
//             [4.3, 177.6],
//             [5.3, 191.8],
//             [6.3, 173.1],
//             [7.7, 140.2],
//             [8.5, 136.1],
//             [9.4, 142.9],
//             [10.0, 140.4],
//             [5.3, 142.1],
//             [3.8, 141.0],
//             [3.3, 116.5],
//             [1.5, 327.5],
//             [0.1, 1.1],
//             [1.2, 11.1]
//         ],
//         color: Highcahrts.getOptions().colors[0],
//         fillColor: {
//             linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
//             stops: [
//                 [0, Highcahrts.getOptions().colors[0]],
//                 [
//                     1,
//                     Highcahrts.color(Highcahrts.getOptions().colors[0])
//                         .setOpacity(0.25).get()
//                 ]
//             ]
//         },
//         name: 'Wind speed',
//         tooltip: {
//             valueSuffix: ' m/s'
//         }
//     }]
// }


//  
const Ref_target = ref()
const { moveX, moveY } = useTouch(Ref_target, false)

const Red_Index = ref()
const Ref_content = ref()
watch([moveX, moveY], ([newV1, newV2], [oldV1, oldV2]) => {
    console.log(Math.floor(newV1), Math.floor(newV2));
})


onMounted(() => {
})

const goodsList = reactive([{ name: '商品', amount: 88.00, subscrition: '描述' }])
const showBottom_popup = ref(false)
function Create_Inventory() {
    console.log('Create_Inventory');
    showBottom_popup.value = true
    /**
     * 1. 弹出PopUp
     * 2. 填写信息
     * 3. 提交
     * 4. 网络请求
     * 5. 成功处理
     * /**
     * 
     *  */
}
</script>

<template>
    <div class="plan" ref="Red_Index">
        <div class="inner">
            <planBanner />
            <div class="del" ref="Ref_target" @touchmove.stop.prevent>来抓我呀</div>
            <dashBoard />
            <div class="options">
                <div class="one box" @click="Create_Inventory">Shopping List</div>
                <div class="two box">Saving Plan</div>
            </div>
            <content ref='Ref_content' />
            <van-popup v-model:show="showBottom_popup" round position="bottom" :style="{ height: '70%' }">
                <div class="popUp-inner">
                    <div class="topBar">
                        <div class="icon_leave"><van-icon @click="showBottom_popup = false" size="20" name="arrow-left" />
                        </div>
                        <div class="title">Create ShoppingList</div>
                    </div>
                    <div class="infos">
                        <div class="icon"><img src="@/assets/img/cost/list/linkedin.svg" alt=""></div>
                        <div class="name">
                            <input type="text" placeholder="Input your ShoppingList Name">
                        </div>
                    </div>
                    <div class="list">
                        <div class="nav"><span>Goods List</span></div>
                        <template v-for="(item, index) in goodsList">
                            <div class="item">
                                <div class="icon"><img src="@/assets/img/cost/list/github.svg" alt=""></div>
                                <div class="middle">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="sub">{{ item.subscrition }}</div>
                                </div>
                                <div class="right">
                                    <div class="amount">￥{{ item.amount }}</div>
                                    <div class="btn"><van-icon color="#555" name="cross" size="18" /></div>
                                </div>
                            </div>

                        </template>
                    </div>
                    <div class="btns">
                        <div class="btn add" @click="click">Add Goods</div>
                        <div class="btn submit">Submit</div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<style lang="less" scoped>
.plan {
    /**
      * margin-top传递问题:
      * 1.border: 1px solid transparent;
      * 2.padding-top: 1px;
      * 3.overflow: auto;
     */
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180.00deg, rgba(67, 136, 131, 0.3) 5%, rgba(67, 136, 131, 0.3) 97%);
    // overflow-y: auto;
    overflow-y: hidden;
    overflow-x: hidden;

    .inner {
        opacity: 0.9;
        width: 100%;
        height: 100%;

        .del {
            position: fixed;
            top: 15px;
            right: 15px;
        }
    }

    .options {
        margin-top: 5px;
        display: flex;
        overflow-x: auto;
        position: relative;
        // width: 200vw;
        padding: 40px 40px;

        &::-webkit-scrollbar {
            display: none;
        }

        .box {
            flex-shrink: 0;
            width: 70vw;
            height: 100px;
            backdrop-filter: blur(10px);
            border-radius: 36px;
            border: 1px solid #c6dbd9AA;
            box-shadow: inset 0 0 10px #ffffffAA;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .one {
            background-color: #027f87;
            margin-right: 30px;
        }

        .two {
            background-color: #57e3b9;
        }

    }

    .popUp-inner {
        box-sizing: border-box;
        padding: 20px;

        .topBar {
            display: grid;
            grid-template-columns: .7fr 2fr;

            .title {
                font-size: 20px;
                font-weight: 550;
            }
        }

        .infos {
            display: flex;
            padding: 20px;


            .icon {
                display: grid;
                width: 70px;
                height: 70px;
                background-color: bisque;
                border-radius: 24px;

                img {
                    place-self: center;
                    width: 50px;
                    height: 50px;
                }
            }

            .name {
                display: flex;
                flex: 1;
                align-items: center;
                margin-left: 10%;

                input {
                    flex: 1;
                    height: 80%;
                    text-align: center;
                    border: 0;
                    background-color: bisque;
                    border-radius: 24px;
                }
            }
        }

        .list {
            padding: 0 30px;
            overflow-y: auto;
            height: 35vh;
            border-top: 2px solid #429690;
            border-radius: 12px;
            border-bottom: 2px solid #429690;

            .nav {
                margin-top: 10px;
                display: flex;
                justify-content: center;

                span {
                    position: relative;
                    right: 4px;
                    font-size: 20px;
                    font-weight: 550;
                    color: #027f87;
                }
            }

            .item {
                display: grid;
                grid-template-columns: .6fr 1fr .3fr;
                grid-template-rows: repeat(auto-fill 1fr);
                margin-top: 10px;
                padding: 10px;
                background-color: #fae3c6;
                border-radius: 24px;

                .icon {
                    img {
                        width: 50px;
                        height: 50px;
                    }
                }

                .middle {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: #7d7f7f;

                    .name {
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .sub {
                        margin-top: 6px;
                        font-size: 12px;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    .amount {
                        font-size: 18px;
                        font-weight: 550;
                        margin-right: 15px
                    }

                }
            }
        }

        .btns {
            padding: 20px;
            display: flex;
            justify-content: space-evenly;


            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 50px;
                font-size: 16px;
                font-weight: 600;
                text-shadow: 0 0 2px #eeeeee;
                background-color: #429690;
                border-radius: 24px;
                color: aliceblue;
                box-shadow: 0 0 5px #027f87;
            }
        }
    }
}
</style>