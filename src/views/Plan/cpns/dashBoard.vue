<script setup>
// Vue
import { ref, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Vant
import { showConfirmDialog } from 'vant';
import 'vant/es/dialog/style'
// Utils
import { createURLObj } from '@/utils';
// Store
import usePlanStore from '@/stores/modules/plan'
// 最主要是这里模块的引入 很坑 
// import Highcharts from 'highcharts/highstock';
import Highcahrts from 'highcharts'
// 这个一定要引入 不然报错
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js'
import { storeToRefs } from 'pinia';
// Router
import { useRouter } from 'vue-router';
const router = useRouter()
// 
HighchartsMore(Highcahrts)
SolidGauge(Highcahrts);
/**
 * Store
 */
const planStore = usePlanStore()
const { userinfo, set_budget_info } = storeToRefs(planStore)
// 网络请求
console.log('网络请求');
planStore.get_userBudget().then(res => {
    console.log('网络请求成功', toRaw(userinfo.value));
})
/**
* var
*/
const instance = getCurrentInstance()
const chartOptions = computed(() => {
    return {
        chart: {
            backgroundColor: '#bdd1cf',
            type: 'solidgauge',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            plotBorderColor: null,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: null,
        pane: {
            center: ['50%', '95%'],
            size: '190%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcahrts.theme && Highcahrts.theme.background2) || '#8f9f9daa',
                borderWidth: 0,
                innerRadius: '80%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {  // 点击后显示
            enabled: false
        },
        yAxis: {
            min: 0,
            // 👇
            max: userinfo.value.budget,
            // title: { text: '预算', },
            stops: [
                [0.2, '#62e2bc'], // red
                [0.8, '#92c4c0'], // yellow
                [0.9, '#15888f'] // green
                // [0.9, '#55BF3B'] // green
            ],
            // plotBands: [
            //     {
            //         from: 0,
            //         to: 30,
            //         thickness: '20%',
            //         color: {
            //             linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            //             stops: [[0, 'red'], [1, 'orange']]
            //         }
            //     },
            //     {
            //         from: 30,
            //         to: 70,
            //         thickness: '20%',
            //         color: {
            //             linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            //             stops: [[0, 'orange'], [1, 'yellow']]
            //         }
            //     },
            //     {
            //         from: 69,
            //         to: 100,
            //         thickness: '20%',
            //         color: {
            //             linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            //             stops: [[0, 'yellow'], [1, 'green']]
            //         }
            //     }
            // ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 150,
            tickWidth: 5,
            tickPosition: 'outside',
            labels: {
                y: 10,
                distance: -50,
                style: {
                    color: '#555d6c',
                    fontSize: '12px',
                }
            }
        },
        plotOptions: {
            solidgauge: {
                animation: {
                    duration: 500,
                },
                cursor: 'pointer',
                dataLabels: {
                    y: 5,
                    borderWidth: 5,
                    useHTML: true,
                },
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '本月支出',
            data: [userinfo.value.current_budget],
            innerRadius: 80,
            dataLabels: {
                useHTML: true,
                format: '<div style="text-align:center;border:0;outline:none;"><span span style="font-size:25px;color:' +
                    ('black') + '"><span style="font-size:12px;color:#777777"></span>{y:.1f}</span>' +
                    '</div>',
            },
            tooltip: {
                valueSuffix: '元'
            }
        }]
    }
})
/**
* function
*/
function draw() {
    new Highcahrts.chart('highCharts', {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: '速度'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '速度',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcahrts.theme && Highcahrts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">km/h</span></div>'
            },
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]
    });
}
// 
// onMounted(() => {
//     console.log('挂载');
// })
// onUpdated(() => {
//     console.log('更新');
// })
// 点击按钮 set预算
const title = ref('Set Budget')
const amount = ref()

const show = ref(false);
const popup = () => {
    // userinfo.value.budget = 1800
    console.log('popUp');
    show.value = true
    if (userinfo.value.budget) {
        console.log('popUp:', userinfo.value.budget);
        amount.value = userinfo.value.budget
    }
    // showConfirmDialog({
    //     title: '标题',
    //     message:
    //         '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    //     beforeClose,
    // });

}
const Close = (action) => {

    if (action == 'confirm' && !amount.value) {
        title.value = '金额不可为空'
        setTimeout(() => {
            title.value = 'Set Budget'
        }, 1500)
    }
    else if (action == 'confirm') {
        if (amount.value < userinfo.value.current_budget) {
            title.value = '金额不可小于当前预算'
            setTimeout(() => {
                title.value = 'Set Budget'
            }, 1500)
            return
        }
        set_budget_info.value = createURLObj({ budget: amount.value, current_budget: userinfo.value.current_budget })
        console.log(action);
        // 
        planStore.Post_set_budget()
            .then(res => {
                userinfo.value.budget = amount.value
                console.log('200', res.data);
                show.value = false
                Highcahrts.redraw()
            })
            .catch(res => {
                console.log('500', res.data);
            })
    }
    if (action == 'cancel') {
        show.value = false
    }
}
</script>

<template>
    <div class="dashBoard">
        <!-- <img class="bg" src="../img/Cards.svg" alt=""> -->
        <div class="box">
            <highcharts class="chart" :options="chartOptions" style="width:90vw;height:200px"></highcharts>
            <div class="text" @click="popup"><span>本月预算</span></div>
        </div>
        <van-dialog v-model:show="show" title="Set Budget" show-cancel-button
            confirm-button-color=" rgba(66.17, 149.81, 143.75, 1)" :before-close="Close">
            <div class="inner">
                <input v-model="amount" placeholder="￥/月"
                    style="width: 50%;height: 40px;background-color: #bfbfbfAA;border:0;outline: none;border-radius: 24px;" />
            </div>
            <template #title>
                <div>
                    <span>{{ title }}</span>
                </div>
            </template>
        </van-dialog>
    </div>
</template>

<style lang="less" scoped>
.dashBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    .box {
        margin-top: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 24px;
        border: 1px solid #ffffffAA;
        box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.4);
        // background-image: url(../img/Cards.svg);
        // background-repeat: no-repeat;
        // background-size: cover;
        // top: 135px;
        width: 90vw;
        height: 27vh;

        // opacity: 0.5;
        // height: 120px;
        .text {
            position: absolute;
            top: 5px;
            right: 12px;
            font-size: 16px;
            font-weight: 700;
            margin-top: 10px;
            color: #333;
            background-color: #ecdb72;
            padding: 2px 6px;
            border-radius: 12px;
        }
    }

    .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;

        input {
            position: relative;
            text-align: center;
        }

        input::-webkit-input-placeholder {
            // input::-moz-placeholder、input:-moz-placeholder 、 input:-ms-input-placeholder
            position: absolute;
            color: #a1a1a1;
            // position: relative;
            top: 10px;
            right: 10px;
        }
    }

    .chart {
        // position: absolute;
        // bottom: 0;
        padding-top: 45px;
        // position: absolute;
        // top: 137.5px;
        border-radius: 24px;
        // backdrop-filter: blur(2px);
    }
}
</style>