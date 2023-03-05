<script setup>
// utils
import { createURLObj } from '@/utils';
// router
import { useRouter } from 'vue-router';
// 
import dayjs from 'dayjs';
import { ref, computed, toRaw } from 'vue';

import useCostStore from '@/stores/modules/cost'     //Cost
import { storeToRefs } from 'pinia';
const costStore = useCostStore()
const { del_bill_info } = storeToRefs(costStore)
// import { resolveBaseUrl } from 'vite';
// 
const router = useRouter()
// 
const props = defineProps({
    list: {
        type: Object,
        default: () => { }
    },
    title_style: {
        type: Object,
        default: () => { }
    }
})
const emit = defineEmits(['changeMonth'])
// const list = [
//     { icon: 'bangzhushouce.svg', name: 'Upwork', amount: '850.00', date: 'Today', style: { color: 'red' } },
//     { icon: 'gongwenbao.svg', name: 'Transfer', amount: '85.00', date: 'Yesterday', style: { color: 'green' } },
//     { icon: 'jinggao.svg', name: 'Paypal', amount: '1,850.00', date: 'Jan 30,2022', style: { color: 'red' } },
//     { icon: 'shezhi.svg', name: 'Youtube', amount: 850.00, date: 'Today', style: { color: 'green' } },
//     { icon: 'houtaishuju.svg', name: 'ins', amount: '11.99', date: 'Yesterday', style: { color: 'green' } },
//     { icon: 'shujuanquan.svg', name: 'Facebook', amount: 850.00, date: 'Jan 30,2022', style: { color: 'red' } },
//     { icon: 'shouji-yidongduanxiazai.svg', name: 'Upwork', amount: 850.00, date: 'Today' },
//     { icon: 'shujubiaoge.svg', name: 'Upwork', amount: 850.00, date: 'Jan 30,2022', style: { color: 'red' } },
//     { icon: 'yuechi.svg', name: 'Upwork', amount: 850.00, date: 'Today', style: { color: 'green' } },
//     { icon: 'ziyuan42.svg', name: 'Upwork', amount: 850.00, date: 'Yesterday', style: { color: 'red' } },
//     { icon: 'ziyuan22.svg', name: '', amount: 850.00, date: 'Jan 30,2022', style: { color: 'green' } },
// ]
const showPickDate = ref(false)
const currentDate = ref([dayjs().format('YYYY'), dayjs().format('MM')])
function getUrl(img) {
    return new URL(`../../../../assets/img/cost/list/other/${img}`, import.meta.url).href
}
// const getTime = computed((date) => {
//     return dayjs(date).format('HH:mm:ss')
// })
function getTime(date) {
    return dayjs(date).format('HH:mm:ss')
}
// 
function clickItem(item, value) {
    console.log('ID:', item.id, 'date:', item.date, toRaw(value), value.date, '同组账单', value.bills);
    router.push({
        path: '/detail:id' + item.id,
        query: item.id,
        params: item
    })
}

// 
const titleText = ref('This Month Transactions')
function confirms(value,) {
    const year = value.selectedValues[0]
    const month = value.selectedValues[1]
    console.log(`${year}-${month}`);
    /**
    * 事件 emit =>给cost
    * 
    * 选择：只能今年1-12月
    * 
    * costStore.get_bill_list(book_id, current_month)
    * 
    * 重新发送网络请求：当前分页改为1   book_id不变    current_month 变
    */
    emit('changeMonth', `${year}-${month}`)
    titleText.value = `${year}-${month} Transactions`
    showPickDate.value = false
}
let isClickDel = ref(false)
function beforeClose({ position }) {
    switch (position) {
        case 'right': {
            if (isClickDel == true) {
                return new Promise((resolve, reject) => {
                    console.log('点击删除后关闭');
                    isClickDel.value = false
                    return true
                })
            }
        }
    }
}
function del_bill(value, item) {
    isClickDel = true
    console.log('del:', toRaw(item), 'in=>', toRaw(value.bills));
    // 发送网络请求，
    del_bill_info.value = createURLObj({ id: item.id })
    // 返回200
    costStore.post_del_bill().then(data => {
        console.log(data);
        const targetIndex = value.bills.findIndex(el => {
            el.id == item.id
        })
        // 删除数据
        value.bills.splice(targetIndex, 1)
    })
}
const red_style = { color: '#ff5b5b' }
const green_style = { color: '#52a3a1' }
function set_style(type) {
    if (type == 2) return red_style
    if (type == 1) return green_style
}
</script>

<template>
    <router-view></router-view>
    <van-popup v-model:show="showPickDate" round position="center" :style="{ height: '30%', width: '100%', }">
        <van-date-picker :columns-type="['year', 'month']" v-model="currentDate" title="选择日期" @confirm="confirms"
            @cancel="showPickDate = false" />
    </van-popup>
    <div class="list">
        <div class="title" @click="showPickDate = true" :class="title_style">
            <div class="titleInner">
                <div class="left">
                    <h3 v-html="titleText"></h3>
                </div>
                <div class="right"><span>See More</span></div>
            </div>
        </div>
        <div class="bills">
            <template v-for="(value, key, index) in list" :key="index">
                <div class="item">
                    <h3>{{ value.date }}</h3>
                    <template v-for="(item, index) in value.bills" :key="index">
                        <van-swipe-cell :before-close="beforeClose">
                            <template #left>
                                <van-button square type="primary" text="标记" class="delete-button-left" />
                            </template>
                            <div class="iten" @click="clickItem(item, value)">
                                <div class="left">
                                    <div class="picture">
                                        <!-- <img src="../../../../assets/img/cost/list/airbnb.svg" alt=""
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            style="display: block;width: 44px;height:40px"> -->
                                        <img src="@/assets/img/cost/list/other/jinggao.svg" alt=""
                                            style="display: block;width: 35px;height:35px">
                                        <!-- <img :src="getUrl(item.icon)" alt="" style="display: block;width: 35px;height:35px"> -->
                                    </div>
                                    <div class="infos">
                                        <div class="top"><span>{{ item.category_name }}</span></div>
                                        <div class="bottom"><span> {{ getTime(item.date) }} </span></div>
                                    </div>
                                </div>
                                <div class="amount" :style="item.style"><span :style="set_style(item.pay_type)">${{
                                    item.amount
                                }}</span>
                                </div>
                            </div>
                            <template #right>
                                <van-button square type="danger" @click="del_bill(value, item)" text="删除"
                                    class="delete-button-right" />
                                <van-button square type="primary" text="退款" class="delete-button-right"
                                    style="background-color: pink;border-color: pink;" />
                            </template>
                        </van-swipe-cell>
                    </template>
                </div>
            </template>

        </div>
    </div>
</template>

<style lang="less" scoped>
.list {
    position: absolute;
    top: 370px;
    padding: 0 25px;
    width: 90vw;
    // 视口的高度-表格的bottom-（users顶部到页面视口的距离）
    // height: 100vh;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    ::-webkit-scrollbar {
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .title {
        position: sticky;
        z-index: 9;
        top: 0;
        background-color: #fff;
        // box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

        .titleInner {
            display: flex;
            justify-content: space-between;
            // padding: 5px;
            box-sizing: border-box;

            .left {
                color: #222;
                font-size: 16px;
            }

            .right {
                color: #666666;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                position: relative;
                right: 10px;
            }
        }

    }

    .bills {
        display: flex;
        flex-direction: column;
        margin-bottom: 60px;


        .item {
            .delete-button-right {
                margin-left: 1px;
                height: 100%;
            }

            .delete-button-left {
                margin-right: 1px;
                height: 100%;
                background-color: var(--primary--color);
                border-color: var(--primary--color);
            }

            .iten {
                display: flex;
                width: 100%;
                height: 66px;
                padding: 0 0 0 0;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;

                .left {
                    display: flex;

                    .picture {
                        display: flex;
                        position: relative;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        background-color: #D0E6E4FF;

                    }

                    .infos {
                        margin-left: 15px;
                        display: flex;
                        flex-direction: column;

                        .top {
                            font-size: 16px;
                            font-weight: 550;
                            color: #333;
                        }

                        .bottom {
                            color: #8c8686;
                            font-size: 12px;
                            margin-top: 10px;
                        }
                    }
                }

                .amount {
                    font-weight: 700;
                    font-size: 16px;
                    filter: blur(0.1px);
                }


            }
        }

    }
}
</style>