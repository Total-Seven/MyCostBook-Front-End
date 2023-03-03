<script setup>
import { ref, reactive, watch, toRaw, computed } from 'vue'
import { storeToRefs } from 'pinia'
// 
import dayjs from 'dayjs'
// Store
import useCostStore from '@/stores/modules/cost'
import useLoginStore from '@/stores/modules/login'
const loginStore = useLoginStore()
const { user_info, category_list } = storeToRefs(loginStore)
// 用户ID： user_info.value.infos.id
// 
const costStore = useCostStore()
const { show, popUp_category_list, popUp_account } = storeToRefs(costStore)
// setTimeout(() => {
//     console.log(toRaw(popUp_category_list.value), toRaw(popUp_account.value));
// }, 2000);
const amount_value = ref(0)
const showBottom = ref()
const style = {
    display: 'block', width: '32px', height: '32px', position: 'relative',
    top: '0px', left: '0px',
    'box-shadow': '0px 4px 4px #666',
    'border-radius': '16px',
}

const select_date = ref('今日')
const currentDate = ref([dayjs().format('YYYY'), dayjs().format('MM'), dayjs().format('DD')])
const confirms = () => {
    console.log('确认');
    showBottom.value = false
    const date = `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]}`
    console.log('currentDate', date)
    select_date.value = date
}

// Tabs
const active = ref(0)
watch(active, (newV) => {
    console.log('active', newV);
    if (newV == 1) plusSubtract.value = '+'
    else if (newV == 0) plusSubtract.value = '-'
    else if (newV == 2) plusSubtract.value = '+'
})
watch(amount_value, (newV) => {
    console.log('amount', newV);
})
watch(currentDate, (newV) => {
    console.log('currentDate', newV);
})
/**
 * 选择类别
 * 选择账户
 */
// 替换文本
const text_select_account = ref('选择账户')
const plusSubtract = ref('-')
// 开关
const isShowSelectAccount = ref(false)
const isShowSelectCategory = ref(false)
// 开
function ClickAccount() {
    console.log('clickAccount');
    isShowSelectAccount.value = true
}
function ClickCategory() {
    console.log('ClickCategory');
    isShowSelectCategory.value = true
}
// 
const options_account = computed(() => {
    return popUp_account.value
})
// 关
function selectAccount(option, index) {
    console.log(option.name, index);
    text_select_account.value = option.name
    isShowSelectAccount.value = false
}
function selectCategory(option, index) {
    console.log(option, index);
    options_category.value.push(category1)
}
//
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
                <div class="box category" @click="ClickCategory">
                    <div class="leftBox categoryLeft">
                        <img src="@/assets/img/cost/list/other/shoubiao.svg" alt="" :style="style">
                        <span>选择分类</span>
                    </div>
                    <div class="categoryRight">
                        <van-icon name="arrow-down" />
                    </div>
                </div>
                <van-popup v-model:show="isShowSelectCategory" round position="bottom"
                    :style="{ padding: '58px 30px', height: '62%' }" closeable close-icon-position="top-left"
                    close-on-click-overlay="false">
                </van-popup>
                <div class="box account">
                    <div class="leftBox accountLeft" @click="ClickAccount">
                        <div class="pic">
                            <img src="@/assets/img/cost/list/paypal.svg" alt="">
                        </div>
                        <div class="text" v-html="text_select_account"></div>
                    </div>
                    <div class="accountRight">
                        <span class="amount"><span v-html="plusSubtract"></span>￥{{ amount_value }}</span>
                    </div>
                </div>
                <div class="box date">
                    <div class="leftBox dateLeft" @click="showBottom = true">
                        <div class="icon"><img src="@/assets/img/cost/date.svg" alt=""></div>
                        <span v-html="select_date"></span>
                    </div>
                    <!-- 圆角弹窗（底部） -->
                    <van-popup v-model:show="showBottom" round position="center" :style="{ height: '30%', width: '100%', }">
                        <van-date-picker v-model="currentDate" title="选择日期" @confirm="confirms"
                            @cancel="showBottom = false" />
                    </van-popup>
                </div>
                <div class="box submit">
                    <span>Submit</span>
                </div>
                <div class="calculator">
                    <van-number-keyboard v-model="amount_value" :show="show" title=" " extra-key="." @blur="show = false"
                        :hide-on-click-outside=false />
                </div>
                <div class="others"></div>
            </div>
            <van-share-sheet v-model:show="isShowSelectAccount" title="选择账户" :options="options_account"
                @select="selectAccount" />
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
        display: flex;
        flex-direction: column;

        .box {
            position: absolute;
            width: 318px;
            height: 50px;
            box-sizing: border-box;
            border: 1px solid #5e10bf;
            box-shadow: 1px 1px 8px #5e10bf;
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
                    width: 63px;
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
                    margin-left: 15px;
                    width: 128px;
                    height: 17px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 20px;
                }


                .text::after {
                    content: '';
                    position: relative;
                    left: 8px;
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
                    color: #5e10bf;
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
                    width: 100px;
                    height: 17px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 20px;
                    margin-left: 15px;
                }

                span::after {
                    content: '';
                    position: relative;
                    left: 8px;
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

        .submit {
            // padding: 0 15px;

            position: absolute;
            left: 135px;
            top: 385px;
            width: 150px;
            height: 50px;
            border-radius: 48px;
            background-color: #5e10bf;
            color: aliceblue;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: 16px;
                font-weight: 600;
                text-shadow: 0 5px 5px #9e6cd8;
                position: relative;
                right: 2px;
            }
        }

    }
}
</style>