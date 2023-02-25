<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCostStore from '@/stores/modules/cost'
const costStore = useCostStore()
const { show } = storeToRefs(costStore)

defineProps({})
defineEmits({})
defineExpose({})

const value = ref()
const showBottom = ref()
const style = {
    display: 'block', width: '32px', height: '32px', position: 'relative',
    top: '0px', left: '0px',
    'box-shadow': '0px 4px 4px #666',
    'border-radius': '16px',
}

const currentDate = ref(['2023', '02', '16'])
const confirms = () => {
    console.log('确认');
    showBottom.value = false
}
</script>

<template>
    <div class="pop">
        <van-popup v-model:show="show" round position="bottom" :style="{ padding: '58px 30px', height: '85%' }" closeable
            close-icon-position="top-left" close-on-click-overlay="false">
            <div class="tabs">
                <van-tabs v-model:active="active" swipeable animated>
                    <!-- <van-tab v-for="pay_type in ['Expense', 'Income', 'transform']" :title="pay_type" disabled>
                                                                                                                                                                                <h2> pay_type</h2> {{ index }}
                                                                                                                                                                            </van-tab> -->
                    <van-tab title="Expense"></van-tab>
                    <van-tab title="Income"> </van-tab>
                    <van-tab title="transform" disabled></van-tab>
                </van-tabs>
            </div>
            <div class="content">
                <div class="box category">
                    <div class="leftBox categoryLeft">
                        <img src="@/assets/img/cost/list/other/shoubiao.svg" alt="" :style="style">
                        <span>Netfllix</span>
                    </div>
                    <div class="categoryRight">
                        <van-icon name="arrow-down" />
                    </div>
                </div>
                <div class="box account">
                    <div class="leftBox accountLeft">
                        <div class="pic">
                            <img src="@/assets/img/cost/list/paypal.svg" alt="">
                        </div>
                        <div class="text">选择账户</div>
                    </div>
                    <div class="accountRight">
                        <span class="amount">￥ {{ value }}</span>
                    </div>
                </div>
                <div class="box date">
                    <div class="leftBox dateLeft" @click="showBottom = true">
                        <div class="icon"><img src="@/assets/img/cost/date.svg" alt=""></div>
                        <span>选择日期</span>
                    </div>
                    <!-- 圆角弹窗（底部） -->
                    <van-popup v-model:show="showBottom" round position="center" :style="{ height: '30%', width: '100%', }">
                        <van-date-picker v-model="currentDate" title="选择日期" @confirm="confirms" />
                    </van-popup>
                </div>
                <div class="calculator">
                    <van-number-keyboard v-model="value" :show="show" title="键盘标题" extra-key="." close-button-text="完成"
                        @blur="show = false" :hide-on-click-outside=false />
                </div>
                <div class="others"></div>
            </div>
            <img class="bgc" src="../img/1.png" alt="">
        </van-popup>
</div>
</template>

<style lang="less" scoped>
.pop {
    .bgc {
        display: block;
        position: fixed;
        right: 2px;
        z-index: -1;
        width: 100%;
        filter: blur(5px);
    }

    .tabs {
        color: #fff // 
    }

    .content {
        .box {
            position: absolute;
            width: 318px;
            height: 50px;
            box-sizing: border-box;
            border: 1px solid #5e10bf;
            box-shadow: 1px 1px 5px #5e10bf;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;

            .leftBox {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }


        }

        img {
            display: block;
            width: 32px;
            height: 32px;
            position: relative;
            top: -2px;
            left: 0px;
            box-shadow: 0px 4px 4px #666;
            border-radius: 16px;

        }

        .category {
            /* Rectangle 19 */
            left: 48px;
            top: 140px;

            .categoryLeft {


                img {
                    vertical-align: middle;
                }

                span {
                    display: block;
                    width: 43px;
                    height: 17px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 20px;
                    margin-left: 15px;

                }
            }
        }

        .account {

            left: 48px;
            top: 220px;

            .accountLeft {

                .text {
                    display: block;
                    width: 68px;
                    height: 17px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 20px;
                    margin-left: 15px;
                }


                .text {
                    color: #000
                }

                .text::after {
                    content: '';
                    position: relative;
                    left: 4px;
                    display: inline-block;
                    box-sizing: border-box;
                    // background-color: #000;
                    width: 10px;
                    height: 10px;
                    border: 5px transparent solid;
                    border-top-color: #888;
                    // 
                    // transform: rotate();
                }
            }

            .accountRight {
                .amount {
                    color: red;
                    font-weight: 700;
                    font-size: 18px;
                }
            }
        }

        .date {
            // padding: 0 15px;
            position: absolute;
            left: 48px;
            top: 300px;
            width: 315px;
            height: 50px;

            .dateLeft {
                span {
                    display: block;
                    width: 68px;
                    height: 17px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 20px;
                    margin-left: 15px;
                }

                span::after {
                    content: '';
                    position: relative;
                    left: 4px;
                    display: inline-block;
                    box-sizing: border-box;
                    // background-color: #000;
                    width: 10px;
                    height: 10px;
                    border: 5px transparent solid;
                    border-top-color: #888;
                    // 
                    // transform: rotate();
                }
            }


        }


    }
}
</style>