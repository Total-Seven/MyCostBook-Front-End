<script setup>
// 
import { ref, computed } from 'vue'
// 
import dayjs from 'dayjs'
// Vant
import { showSuccessToast } from 'vant'
import 'vant/es/toast/style'
// util
import { createURLObj } from '@/utils';
// 
import topBar from '@/components/topBar.vue';
import homeBanner from './cpns/homeBanner.vue';
import infos from './cpns/infos.vue'
import planList from './cpns/planList.vue';
// Async component
import { defineAsyncComponent } from 'vue'
// Store
import useLoginStore from '@/stores/modules/login';
import useCostStore from '@/stores/modules/cost';
import { storeToRefs } from 'pinia';
const loginStore = useLoginStore()
const cosetStore = useCostStore()
const { user_info, plan_list } = storeToRefs(loginStore)
const { add_plan_info } = storeToRefs(cosetStore)
// 
const mybook = defineAsyncComponent(() =>
    import('./cpns/mybook.vue')
)
/**
* var
*/
// const books = [
//     {
//         id: 1,
//         name: 'Default',
//         book_type: 0,
//         img: 'default.svg',
//         style: { bottom: '10px', width: '130px', height: '120px' }
//     },
//     {
//         id: 2,
//         name: 'Family',
//         book_type: 1,
//         img: 'work.svg',
//         style: { bottom: '18px', width: '115px', height: '100px' }

//     },
//     {
//         id: 3,
//         name: 'Trip',
//         book_type: 3,
//         img: 'sleep.svg',
//         style: { bottom: '28px', right: '3px', width: '115px', height: '120px' }

//     },
//     {
//         id: 4,
//         name: 'Baby',
//         book_type: 4,
//         img: 'Amazing.svg',
//         style: { bottom: '28px', right: '3px', width: '130px', height: '120px' }

//     },
//     {
//         id: 12,
//         name: 'School',
//         book_type: 2,
//         img: 'happy.svg',
//         style: { bottom: '20px', right: '3px', width: '120px', height: '105px' }
//     }
// ]
const total_infos = computed(() => {
    return {
        surplus: {
            net: user_info.value.net,
            expense: 1230,
            income: 1353,
        },
        SaveMoney: user_info.value.saved_money,
        budget: user_info.value.infos.budget,
    }
})
const showShare = ref(false)
const options = [
    {
        name: '7 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-fire.png',
    },
    {
        name: '30 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-light.png',
    },
    {
        name: '90 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-water.png',
    },
    {
        name: '180 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-fire.png',
    },
];
/**
* function
*/

function _CreatePlant() {
    console.log('home createPLan');
    showShare.value = true
}
function select_planMode(option, index) {
    console.log(option.name, index);
    showBottom_POPUP.value = true
    choice_PLan_Mode.value = index
}
function map_planMode(number) {
    switch (number) {
        case 0: return 7
        case 1: return 30
        case 2: return 90
        case 3: return 180
    }
}

const showBottom_POPUP = ref(false)
const now = ref(dayjs().format('YYYY-MM-DD'))
const added_End_Date = computed(() => {
    const day = map_planMode(choice_PLan_Mode.value)
    return dayjs(now.value).add(day, 'day').format('YYYY-MM-DD')
})
// 

const Plan_Name = ref()                 // 值：计划名
const choice_PLan_Mode = ref()          // 值：选择模式
let showStart_date_POPUP = ref(false)   // 日期选择器
const daily_money = ref(0)  //每日金额
const target_money = computed(() => {   //达成金额
    return daily_money.value * map_planMode(choice_PLan_Mode.value)
})
const current_StartDate = ref([dayjs().format('YYYY'), dayjs().format('MM', dayjs().format('DD'))])
// 
function Submit() {
    const period = map_planMode(choice_PLan_Mode.value)
    console.log('period:', period, 'name:', Plan_Name.value);
    console.log('Start_date:', now.value, 'daily_money:', daily_money.value)
    const obj = { name: Plan_Name.value, period: period, start_date: now.value, daily_money: daily_money.value }
    add_plan_info.value = createURLObj(obj)
    cosetStore.post_create_plan().then(data => {
        console.log(data);
        showSuccessToast('创建成功');
        // 添加列表项
        obj.id = data.plan_id
        obj['end-date'] = added_End_Date.value
        obj.target_money = daily_money.value * period
        obj.saved_money = 0
        obj.persentage = '0.0%'
        plan_list.value.push(obj)
        showBottom_POPUP.value = false
        showShare.value = false
    })
}
function confirms({ selectedValues }) {
    const year = current_StartDate.value[0]
    const month = current_StartDate.value[1]
    const day = current_StartDate.value[2]
    console.log(year, month, day);
    now.value = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD')

    // 
    showStart_date_POPUP.value = false
}
</script>
<template>
    <div class="LedgerHome">
        <topBar />
        <homeBanner />
        <infos :total_infos="total_infos" class="infos" />
        <Suspense>
            <mybook />
        </Suspense>
        <!-- <tabbar class="tabbar"></tabbar> -->
        <planList @CreatePlan="_CreatePlant" />
        <van-share-sheet @select="select_planMode" v-model:show="showShare" :options="options" />
        <!-- 圆角弹窗（底部） -->
        <van-popup class="popUp" v-model:show="showBottom_POPUP" round position="bottom" :style="{ height: '60%' }">
            <div class="inner">
                <div class="topBar">
                    <div class="icon"><van-icon name="arrow-left" size="24" /></div>
                    <span>{{ map_planMode(choice_PLan_Mode) }} Day Saving Plan</span>
                </div>
                <div class="infos">
                    <div class="left">
                        <div class="icon">
                            <img src="@/assets/img/home/SavePlan/building.svg" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <div class="text">
                            <div class="one">{{ map_planMode(choice_PLan_Mode) }}day later</div>
                            <div class="two">can save</div>
                            <div class="three">￥{{ target_money }}</div>
                        </div>
                    </div>
                </div>
                <div class="box name">
                    <input type="text" v-model="Plan_Name" placeholder="Enter Your Saving Plan">
                    <div>Plan</div>
                </div>
                <div class="Date Start_date" @click="showStart_date_POPUP = true">
                    <div class="date">
                        <div>Start Date</div>
                    </div>
                    <div class="Start">{{ now }}</div>
                </div>
                <div class="Date EndDate">
                    <div class="date">
                        <div>End Date </div>
                    </div>
                    <div class="End">{{ added_End_Date }}</div>
                </div>

                <div class="box target_amount">
                    <input v-model="daily_money" type="number" placeholder="daily money">
                    <div> Amount</div>
                </div>
                <div class="btnInner">
                    <div class="btn" @click="Submit"><van-icon name="success" color="#a9e0d1" size="56" /></div>
                </div>
            </div>

        </van-popup>
        <van-popup v-model:show="showStart_date_POPUP" round position="bottom" :style="{ height: '30%', width: '100%', }">
            <van-date-picker v-model="current_StartDate" title="选择起始日期" @confirm="confirms"
                @cancel="showStart_date_POPUP = false" />
        </van-popup>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gray {
    border-radius: 24px;
    background-color: #dbdbdb;
}

.LedgerHome {
    position: relative;
    font-family: Inter;
    color: #cdcdcd;
    height: 100vh;
    // overflow-y: auto;
    margin-bottom: 100px;

    .popUp {
        color: #3333;

        .inner {
            box-sizing: border-box;
            padding: 20px;
            color: #333;

            .topBar {
                display: grid;
                grid-template-columns: .6fr 2fr;
                height: 50px;


                span {
                    font-weight: 600;
                    font-size: 22px;
                }
            }

            .infos {
                display: grid;
                grid-template-columns: .8fr 2fr;
                margin-top: 15px;
                height: 80px;

                .left {
                    .flex();

                    .icon {
                        .flex();
                        width: 70px;
                        height: 70px;
                        background-color: rgba(84, 193, 164, .5);
                        border-radius: 24px;

                        img {
                            width: 50px;
                            height: 50px;
                        }
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    .text {
                        color: black;
                        font-size: 16px;

                        .three {
                            color: var(--primary--color);
                            margin-top: 5px;
                            font-size: 18px;
                            font-weight: 600;
                        }
                    }
                }
            }

            .box {
                margin: 15px 0;
                display: flex;
                align-items: center;
                height: 50px;

                input {
                    height: 100%;
                    width: 80%;
                    margin-right: 8px;
                    text-align: center;
                    border: 0;
                    .gray();
                }


                div {
                    .flex();
                    flex: 1;
                    height: 100%;
                    border-radius: 24px;
                    background-color: #dbdbdb;
                }
            }

            .Date {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .date {
                    display: flex;
                    color: #5c5c5c;
                    position: relative;
                    left: 6%
                }

                .Start {
                    font-size: 16px;
                    position: relative;
                    right: 6%
                }

                .End {
                    font-size: 16px;
                    position: relative;
                    right: 6%
                }
            }

            .Start_date {
                height: 50px;
                margin-top: 10px;
                background-color: #dbdbdb;
                border-radius: 24px;
                .gray();
            }

            .EndDate {
                height: 50px;
                margin-top: 10px;
                background-color: #dbdbdb;
                border-radius: 24px;
                .gray();
            }

            .btnInner {
                display: flex;
                flex-direction: row-reverse;
                margin-top: 10px;

                .btn {
                    .flex();
                    width: 110px;
                    height: 55px;
                    border-radius: 24px;
                    background-color: var(--primary--color);
                }
            }

        }

    }
}
</style>