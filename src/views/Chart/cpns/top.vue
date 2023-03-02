<script setup>
import { ref, computed } from 'vue'
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { data, current_menu, current_tab, current_dateIndex } = storeToRefs(chartStore)
// 
const date_arr = computed(() => {
    return data.value[current_menu.value][current_tab.value].time  // 后端返回可选择的日期（用户有账单记录的）
})
const current_key = computed(() => {
    return date_arr.value[current_dateIndex.value]
})

const top_obj = computed(() => {
    return data.value[current_menu.value][current_tab.value].top_obj
})
const top_array = computed(() => {
    return top_obj.value[current_key.value]
})
// 
const listData = [
    {
        icon: 'bangzhushouce.svg',
        name: 'Food',
        price: '184.27',
        percentage: '50.50',
        bill_nnumber: '6',
    }, {
        icon: 'ziyuan22.svg',
        name: 'Transfer',
        price: '85.00',
        percentage: '30.00',
        bill_nnumber: '20',
    }, {
        icon: 'gongwenbao.svg',
        name: 'Transfer',
        price: '755.00',
        percentage: '78.00',
        bill_nnumber: '15',
    }, {
        icon: 'ziyuan42.svg',
        name: 'Transfer',
        price: '85.00',
        percentage: '40.00',
        bill_nnumber: '2',
    }, {
        icon: 'yuechi.svg',
        name: 'Transfer',
        price: '5725.00',
        percentage: '10.00',
        bill_nnumber: '90',
    }, {
        icon: 'shujubiaoge.svg',
        name: 'Transfer',
        price: '85.00',
        percentage: '20.00',
        bill_nnumber: '15',
    }, {
        icon: 'houtaishuju.svg',
        name: 'Transfer',
        price: '8.00',
        percentage: '60.00',
        bill_nnumber: '10',
    }, {
        icon: 'shezhi.svg',
        name: 'Transfer',
        price: '35.00',
        percentage: '55.00',
        bill_nnumber: '15',
    }, {
        icon: 'jinggao.svg',
        name: 'Transfer',
        price: '823.00',
        percentage: '95.00',
        bill_nnumber: '11',
    }, {
        icon: 'shouji-yidongduanxiazai.svg',
        name: 'Transfer',
        price: '565.00',
        percentage: '27.00',
        bill_nnumber: '50',
    }
]
function getUrl(img) {
    return new URL(`../../../assets/img/cost/list/other/${img}`, import.meta.url).href
}
</script>

<template>
    <div class="top">
        <div id="title">Top</div>
        <div id="list">
            <template v-for="(item, index) in top_array" :key="index">
                <div class="item">
                    <div class="left">
                        <!-- <img class="pic" :src="getUrl(item.icon)" alt=""> -->
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="middle">
                        <div class="middleTop">
                            <strong class="big">{{ item.billLedger }}</strong>
                            <span class="percentage">{{ item.percentage }}</span>
                        </div>
                        <div class="middleBottom">
                            <van-progress :percentage="item.percentage" :pivot-text="item.percentage" :show-pivot=false
                                pivot-color="rgba(66,150,144,1)" stroke-width="6"
                                color="linear-gradient(to right, rgba(66,150,144,1),rgba(42.47,124.31,118.38,1)" />
                        </div>
                    </div>
                    <div class="right">
                        <div class="text">
                            <div class="up">￥{{ item.amount }}</div>
                            <div class="down">{{ item.number }}</div>
                        </div>
                        <div class="icon">
                            <van-icon name="arrow" size=18 color="#928f8f" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.top {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    margin-top: 20px;

    #title {
        margin-left: 25px;
        font-size: 28px;
        font-weight: 800;
        color: var(--primary--color) // color: #333;
    }

    #list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 360px;
            height: 50px;
            margin-top: 20px;

            .left {
                width: 45px;
                height: 45px;
                border-radius: 20px;
                background-color: var(--primary--color);
                display: flex;
                justify-content: center;
                align-items: center;

                .pic {
                    width: 35px;
                    height: 35px;
                }
            }

            .middle {
                width: 200px;
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .middleTop {
                    width: 150px;
                    display: flex;
                    margin-bottom: 10px;

                    span {
                        position: relative;
                        top: 1px;
                        font-size: 12px;
                        margin-left: 6px;
                        color: #928f8f
                    }

                }

                // .middleBottom {}
            }

            .right {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                flex: 1;


                .text {
                    position: relative;
                    top: 2px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    .up {
                        font-size: 16px;
                        font-weight: 700;
                        color: #ff5b5bFF
                    }

                    .down {
                        margin-top: 2px;
                        font-size: 12px;
                        color: #928f8f
                    }
                }

                .icon {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>