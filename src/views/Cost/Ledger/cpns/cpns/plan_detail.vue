<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Vant
import { showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
// Utils
import dayjs from 'dayjs'
// 组件
// Router
import { useRoute, useRouter } from 'vue-router'
import { createURLObj } from '@/utils'
// Store
import useCostStore from '@/stores/modules/cost'
import { storeToRefs } from 'pinia'
const costStore = useCostStore()
const { update_plan_info } = storeToRefs(costStore)
/**
* var
*/
const route = useRoute()
const router = useRouter(0)
const Deposited = ref(Number(route.query.saved_money))
/**
* function
*/
function handle_PlanDetail(start_date, daily_money, period) {
    let detailArr = new Array()
    const hand = () => {
        for (let day = 0; day <= period - 1; day++) {
            const obj = {}
            obj.amount = daily_money
            detailArr.push(obj)
            obj.total = detailArr.reduce((pre, cur) => {
                return pre += keepTwoDecimalStr(cur.amount)
            }, 0)
            obj.date = dayjs(start_date, 'YYYY-MM-DD').add(day, 'day').format('YYYY-MM-DD')
        }
        return detailArr
    }
    return hand
}
const handler = handle_PlanDetail(dayjs(route.query.start_date).add(8, 'hour'), route.query.daily_money, route.query.period)

// 数组数组
const detail_arr = ref(handler())
// 计算已存的个数
for (let index = 0; index < detail_arr.value.length; index++) {
    const element = detail_arr.value[index];
    console.log(detail_arr.value[index]);
    if (index < route.query.light_number) element.active = true
}
// 点击事件 翻页 加钱
function clickItem(item, index, $event) {

    console.log(item.active);  //undefined false
    const add_obj = { id: route.query.id, daily_money: route.query.daily_money, mode: 1 }
    const sub_obj = { id: route.query.id, daily_money: route.query.daily_money, mode: 2 }

    if (item.active == undefined || item.active == false) {
        /**
        * 发送网络请求：id(route.query.id)、daily_money (route.query.daily_money)
        * return 200
        * 手动修改active   ()
        */
        update_plan_info.value = createURLObj(add_obj)
        costStore.Update_plan()
            .then(data => {
                // 修改总金额
                console.log(Deposited.value);
                Deposited.value += Number(route.query.daily_money)
                console.log(Deposited.value);
                // 修改总金额 End
                console.log(data);
                showSuccessToast('成功')
                item.active == true ? item.active = false : item.active = true
            })
            .catch(() => {
                showFailToast('失败')
            })
    }
    else if (item.active == true) {
        // true
        /**
         * 发送网络请求：id(route.query.id)、daily_money (route.query.daily_money)
         * return 200
         * 手动修改active   ()
         */
        update_plan_info.value = createURLObj(sub_obj)
        costStore.Update_plan().then(data => {
            // 修改总金额
            console.log(Deposited.value);
            Deposited.value -= Number(route.query.daily_money)
            console.log(Deposited.value);
            // 修改总金额 End
            console.log(data);
            showSuccessToast('成功')
            item.active == true ? item.active = false : item.active = true
        }).catch(() => {
            showFailToast('失败')
        })
    }
    // finally  


}
//保留两位小数
function keepTwoDecimalStr(num) {
    const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
    let s = result.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return Number(s);
};
console.log();
const persentage = computed(() => {
    return keepTwoDecimalStr(route.query.saved_money / route.query.target_money)
})
</script>   

<template>
    <div class="plan_detail">
        <!-- <h2>{{ route.query }}</h2> -->
        <div class="topBar">
            <div class="icon"><van-icon @click="router.back()" name="arrow-left" size="24" /></div>
            <div class="headline">Plan Detail</div>
        </div>
        <div class="infos">
            <div class="info">
                <div class="icon">
                    <img src="@/assets/img/home/SavePlan/letterBook.svg" alt="">

                </div>
                <div class="_info">
                    <div class="name">{{ route.query.name }}</div>
                    <div class="amount">￥{{ route.query.target_money }}</div>
                </div>
                <div class="mode">
                    <span>{{ route.query.period }} Day</span>
                </div>
            </div>
            <div class="progress">
                <div class="box top">
                    <span>Deposited ￥{{ Deposited }}</span><span>remaining ￥{{ route.query.target_money -
                        route.query.saved_money }}</span>
                </div>
                <div class="middle">
                    <div class="progresss">
                        <van-progress inactive :percentage="persentage * 100" />
                    </div>
                    <span>{{ persentage * 100 }}%</span>
                </div>
                <div class="box bottom">
                    <span>{{ dayjs(route.query.start_date).format('YYYY-MM-DD') }} / {{
                        dayjs(route.query['end-date']).format('YYYY-MM-DD') }}</span><span>
                    </span>
                </div>
            </div>
        </div>
        <div class="line"> </div>
        <div class="title"><span>Deposit Detail</span>
            <div class="icon"><img src="@/assets/img/tabbar/chart.png" alt=""></div>
        </div>
        <div class="content">
            <template v-for="(item, index) in         detail_arr" :key="index">
                <div class="item" :class="{ flip: item.active, 'style-filled': item.active }"
                    @click="clickItem(item, index)">
                    <div class="amount">
                        ￥ <span>{{ item.amount }}</span>
                    </div>
                    <div class="total">total ￥<span>{{ item.total }}</span></div>
                    <div class="date">{{ item.date }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
@keyframes flip-vertical {

    0% {
        transform: translateZ(-800px) rotateY(90deg);
        opacity: 0;
    }

    50% {
        transform: translateZ(-160px) rotateY(87deg);
        opacity: 1;
    }

    100% {
        transform: translateZ(0) rotateY(0);
    }
}


.flip {

    // width: 100px;
    // height: 100px;
    background-color: #ffe672;
    animation-name: flip-vertical;
    animation-duration: .5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;

}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.style-filled {
    color: aliceblue !important;
    background-color: rgba(66, 150, 144, 1) !important;

    span {
        color: aliceblue !important;
    }
}

.headline {
    position: relative;
    font-weight: 660;
    font-size: 24px;
}

.headline::after {
    position: absolute;
    bottom: 0px;
    left: 6px;
    content: '';
    display: block;
    width: 40%;
    height: 5px;
    border-radius: 12px;
    background-color: #429690AA;
}

.plan_detail {
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #fff;

    .topBar {
        display: grid;
        grid-template-columns: .8fr 2fr;
        height: 50px;

        span {
            font-weight: 700;
            font-size: 24px;
        }

    }

    .infos {
        margin-top: 25px;

        .info {
            display: grid;
            grid-template-columns: .7fr 2fr 1fr;

            .icon {
                padding: 10px;
                background-color: var(--primary--color);
                border-radius: 24px;

                img {
                    width: 50px;
                    height: 50px;
                }
            }

            ._info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 15px;

                .name {
                    font-weight: 550;
                    font-size: 18px;
                }

                .amount {
                    margin-top: 10px;
                    font-size: 24px;
                    font-weight: 800;
                    color: var(--primary--color);
                }
            }

            .mode {
                padding-bottom: 8px;
                display: flex;
                align-items: flex-end;
                flex-direction: column-reverse;

                span {
                    display: block;
                    display: flex;
                    justify-content: center;
                    padding: 2px 4px;
                    width: 80px;
                    border-radius: 12px;
                    background-color: #429690AA;
                }
            }
        }

        .progress {
            margin-top: 25px;

            color: #484848;


            .box {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }

            .middle {
                display: flex;
                margin-top: 20px;

                .progresss {
                    width: 92%;
                    margin-right: 2px;
                }

                span {
                    color: #484848;

                }
            }

        }
    }

    .line {
        margin-top: 20px;
        width: 100%;
        height: 20px;
        border: 4px solid #d5d5d5aa;
        border-radius: 12px;
    }

    .title {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-weight: 700;
            font-size: 24px;
        }

        .icon {
            width: 35px;
            height: 35px;
        }
    }

    .content {
        margin-top: 25px;
        padding-bottom: 50px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(autp-fill 1fr);
        grid-gap: 20px 20px;



        .item {
            color: #483c3c;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100px;
            background-color: rgba(66, 150, 144, .8);
            border-radius: 16px;
            border: 1px solid rgba(66, 150, 144, .2);
            box-shadow: 0 0 10px rgba(66, 150, 144, .8);

            .amount {
                margin-bottom: 5px;

                span {
                    color: #333;
                    font-weight: 700;
                    font-size: 20px;
                }
            }

            .total {
                margin-bottom: 10px;

                span {
                    color: #333;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>