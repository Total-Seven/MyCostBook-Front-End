<script setup>
import { ref, reactive, watch, toRaw, computed } from 'vue'
import { storeToRefs } from 'pinia'
// Util
import { createURLObj } from '@/utils'
// router
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
// Store
import useCostStore from '@/stores/modules/cost'
import useLoginStore from '@/stores/modules/login'
import { arrayExpression } from '@babel/types'
const loginStore = useLoginStore()
const { user_info, category_list } = storeToRefs(loginStore)
// 用户ID： user_info.value.infos.id
//
const costStore = useCostStore()
const { obj, add_bill_info, show, popUp_category_list, popUp_account, type } = storeToRefs(costStore)
// 
const route = useRoute()
// setTimeout(() => {
//     console.log(toRaw(popUp_category_list.value), toRaw(popUp_account.value));
// }, 2000);
const amount_value = ref()
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
const active = ref('Expense')
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
const select_account_id = ref()
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
    select_account_id.value = option.id
    text_select_account.value = option.name
    isShowSelectAccount.value = false
}
function selectCategory(option, index) {
    console.log(option, index);
    options_category.value.push(category1)
}
//category
const activeId = ref()
const activeIndex = ref()
const items = computed(() => {
    return type.value[active.value]
})
// const items = [

//     {
//         "id": 1,
//         "name": "餐饮",
//         "type": 1,
//         "user_id": 0,
//         "text": "餐饮",
//         "children": [
//             {
//                 "id": 136,
//                 "name": "三餐",
//                 "type_id": 1,
//                 "user_id": 50,
//                 "avatar": "0"
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "name": "服饰",
//         "type": 1,
//         "user_id": 0,
//         "text": "服饰"
//     },
//     {
//         "id": 3,
//         "name": "交通",
//         "type": 1,
//         "user_id": 0,
//         "text": "交通"
//     },
//     {
//         "id": 4,
//         "name": "日常",
//         "type": 1,
//         "user_id": 0,
//         "text": "日常"
//     },
//     {
//         "id": 5,
//         "name": "购物",
//         "type": 1,
//         "user_id": 0,
//         "text": "购物",
//         children: [
//             {
//                 "id": 135,
//                 "text": "购物清单",
//                 "type_id": 5,
//                 "user_id": 50,
//                 "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
//             }
//         ]
//     },
//     {
//         "id": 6,
//         "name": "医疗",
//         "type": 1,
//         "user_id": 0,
//         "text": "医疗"
//     },
//     {
//         "id": 7,
//         "name": "学习",
//         "type": 1,
//         "user_id": 0,
//         "text": "学习"
//     },
//     {
//         "id": 8,
//         "name": "旅行",
//         "type": 1,
//         "user_id": 0,
//         "text": "旅行"
//     },
//     {
//         "id": 9,
//         "name": "人情",
//         "type": 1,
//         "user_id": 0,
//         "text": "人情"
//     },
//     {
//         "id": 10,
//         "name": "其他",
//         "type": 1,
//         "user_id": 0,
//         "text": "其他"
//     },
//     {
//         "id": 17,
//         "name": "住宿",
//         "type": 1,
//         "user_id": 0,
//         "text": "住宿"
//     },
//     {
//         "id": 18,
//         "name": "娱乐",
//         "type": 1,
//         "user_id": 0,
//         "text": "娱乐"
//     },
//     {
//         "id": 19,
//         "name": "美妆",
//         "type": 1,
//         "user_id": 0,
//         "text": "美妆"
//     },
//     {
//         "id": 20,
//         "name": "会员",
//         "type": 1,
//         "user_id": 0,
//         "text": "会员",
//         "children": [
//             {
//                 "id": 137,
//                 "name": "社交VIP",
//                 "type_id": 20,
//                 "user_id": 50,
//                 "avatar": "0"
//             }
//         ]
//     },
//     {
//         "id": 21,
//         "name": "通讯",
//         "type": 1,
//         "user_id": 0,
//         "text": "通讯"
//     },
//     {
//         "id": 25,
//         "name": "恋爱",
//         "type": 1,
//         "user_id": 0,
//         "text": "恋爱"
//     },
//     {
//         "id": 26,
//         "name": "吸烟",
//         "type": 1,
//         "user_id": 0,
//         "text": "吸烟"
//     }
// ]

// 提交

function Submit(params) {
    let date = 0
    if (select_date.value == '今日') {
        console.log('默认');
        date = dayjs().format('YYYY-MM-DD')
    }
    else {
        console.log('用户选择日期');
        date = select_date.value
    }
    let payType = active.value == 'Expense' ? 2 : 1
    console.group('Submit');
    console.log('pay_type:', payType)
    console.log('account_id:', select_account_id.value);
    console.log('book_id:', route.params.bookname.replace(':', ''))
    console.log('category_id:', choice_category.value.id);
    console.log('category_name:', choice_category.value.name);
    console.log('amount:', amount_value.value);
    console.log('date:', date);
    console.groupEnd('Submit');
    add_bill_info.value = createURLObj({
        pay_type: payType,
        amount: amount_value.value,
        account_id: select_account_id.value,
        book_id: route.params.bookname.replace(':', ''),
        category_id: choice_category.value.id,
        category_name: choice_category.value.name,
        budget_mode: 0,
        date: date
    })
    costStore.post_add_bill().then(data => {
        console.log(data);
        // 添加成功后处理
        const target_objIndex = obj.value.list.findIndex(_obj => {
            return _obj.date == date
        })
        const insertObj = { id: data.id, pay_type: payType, amount: amount_value.value, date: date, category_id: choice_category.value.id, category_name: choice_category.value.name }
        if (target_objIndex !== -1) {
            console.log('找到targetIndex');
            obj.value.list[target_objIndex].bills.unshift(insertObj)
        }
        else if (target_objIndex == -1) {
            console.log('没找到');
            if (dayjs().isBefore(dayjs(date))) {
                obj.value.list.unshift({
                    date: date,
                    bills: [insertObj]
                })
            }
            else {
                obj.value.list.push({
                    date: date,
                    bills: [insertObj]
                })
            }
        }
    })
    show.value = false
    setTimeout(() => {
        select_date.value = '今日'
        text_select_account.value = '选择账户'
        Text_category.value = '选择分类'
        select_account_id.value = 0
        choice_category.value = {}
        amount_value.value = undefined
    }, 1500);
}

function clickNav(index) {
    console.log(index);
}
const Text_category = ref('选择分类')
const choice_category = ref()
function clickItem(item) {
    console.log(item);
    isShowSelectCategory.value = false
    choice_category.value = item
    Text_category.value = item.name
}
</script>

<template>
    <div class="pop">
        <van-popup v-model:show="show" round position="bottom" :style="{ padding: '58px 30px', height: '85%' }" closeable
            close-icon-position="top-left">
            <div class="tabs">
                <van-tabs v-model:active="active" swipeable animated>
                    <!-- <van-tab v-for="pay_type in ['Expense', 'Income', 'transform']" :title="pay_type" disabled>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <h2> pay_type</h2> {{ index }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </van-tab> -->
                    <van-tab title="Expense" name="Expense"></van-tab>
                    <van-tab title="Income" name="Income"> </van-tab>
                    <van-tab title="transform" disabled></van-tab>
                </van-tabs>
            </div>
            <div class="content">
                <div class="box category" @click="ClickCategory">
                    <div class="leftBox categoryLeft">
                        <img src="@/assets/img/cost/list/other/shoubiao.svg" alt="" :style="style">
                        <span v-html="Text_category"></span>
                    </div>
                    <div class="categoryRight">
                        <van-icon name="arrow-down" />
                    </div>
                </div>
                <van-popup v-model:show="isShowSelectCategory" round position="bottom"
                    :style="{ padding: '58px 30px', height: '62%' }" closeable close-icon-position="top-left">
                    <van-tree-select @click-nav="clickNav" @click-item="clickItem" height="450" v-model:active-id="activeId"
                        v-model:main-active-index="activeIndex" :items="items" />
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
                <div class="box submit" @click="Submit">
                    <span>Submit</span>
                </div>
                <div class="calculator">
                    <van-number-keyboard v-model="amount_value" :show="show" title=" " extra-key="." @blur="show = false"
                        :hide-on-click-outside=false />
                </div>
                <div class="others"></div>
            </div>
            <van-share-sheet :options="options_account" @select="selectAccount" title="选择账户"
                v-model:show="isShowSelectAccount" />
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