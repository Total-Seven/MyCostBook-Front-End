<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import pies from '../Chart/cpns/pies.vue';
import Highcahrts from 'highcharts'
import planBanner from './cpns/banner.vue'
import content from './cpns/content.vue';
import dashBoard from './cpns/dashBoard.vue';
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

import useTouch from '@/utils/touch';
const Ref_target = ref()
const { moveX, moveY } = useTouch(Ref_target, false)

const Red_Index = ref()
const Ref_content = ref()
watch([moveX, moveY], ([newV1, newV2], [oldV1, oldV2]) => {
    console.log(Math.floor(newV1), Math.floor(newV2));
})

onMounted(() => {

})

</script>

<template>
    <div class="plan" ref="Red_Index">
        <div class="inner">
            <planBanner />
            <div class="del" ref="Ref_target" @touchmove.stop.prevent>来抓我呀</div>
            <dashBoard />
            <div class="options">
                <div class="one box">Shopping List</div>
                <div class="two box">Saving Plan</div>
            </div>
            <content ref='Ref_content' />
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
}
</style>