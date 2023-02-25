<script setup>
import { onMounted } from 'vue'
// 最主要是这里模块的引入 很坑 
// import Highcharts from 'highcharts/highstock';
import Highcahrts from 'highcharts'
// 这个一定要引入 不然报错
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js'
HighchartsMore(Highcahrts)
SolidGauge(Highcahrts);
/**
* var
*/
const chartOptions = {
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
    tooltip: {
        enabled: false
    },
    yAxis: {
        min: 0,
        // 👇
        max: 100,
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
        tickWidth: 1,
        tickPosition: 'outside',
        labels: {
            y: 16,
            distance: -45,
            style: {
                color: '#555d6c',
                fontSize: '15px'
            }
        }
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: '速度',
        data: [55],
        innerRadius: 80,
        dataLabels: {
            useHTML: true,
            formatter: function () {
                // const color = that.h5gecEquipmentState == -1 ? 'red' : that.h5gecEquipmentState == 0 ? 'orange' : 'white'
                // return '<div style="text-align:center"><span style="font-family:homeGrade ;font-size:65px;color: ' + color + '">' + this.y + '</span><br/>' +
                //     '<span style="font-size:16px;color:white">-设备健康度评分-</span></div>'
            }
        },
        tooltip: {
            valueSuffix: ' '
        }
    }]
}
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
onMounted(() => {
    // draw()
})

</script>

<template>
    <div class="dashBoard">
        <!-- <img class="bg" src="../img/Cards.svg" alt=""> -->
        <div class="box">
            <highcharts class="chart" :options="chartOptions" style="width:90vw;height:200px"></highcharts>
            <div class="text"><span>本月预算</span></div>
        </div>
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