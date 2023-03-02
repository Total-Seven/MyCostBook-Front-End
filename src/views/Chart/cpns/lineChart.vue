<script setup>
// Vue
import { ref, toRaw, computed } from 'vue'
// 
import Highcahrts from 'highcharts'
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { data, current_tab, current_menu } = storeToRefs(chartStore)
// 
const line_array = computed(() => {
    return data.value[current_menu.value][current_tab.value].line_array
})

const categories = computed(() => {
    return data.value[current_menu.value][current_tab.value].time
})


const chartOptions = computed(() => ({
    credits: {
        enabled: false,                    // 默认值，如果想去掉版权信息，设置为false即可
        // text: 'www.hcharts.cn',             // 显示的文字
        // href: 'http://www.hcharts.cn',      // 链接地址
        // position: {                         // 位置设置 
        // align: 'left',
        // x: 0,
        // verticalAlign: 'bottom',
        // y: 0
    },
    chart: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        plotBorderColor: null,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: null,
        plotShadow: false,
    },
    style: {                            // 样式设置
        cursor: 'pointer',
        color: 'red',
        fontSize: '35px'
    },
    legend: {
        show: false
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: false,
                radius: 4,
                lineColor: '#d0e1e0',
            }
        }
    },
    data: {
        rows: [
            [null, '小明', '小红'],  // 第一行为数据列的名字
            ['苹果', 1, 5], 		  // 分类及数值
            ['梨', 4, 4], 		   // 分类及数值
            ['橙子', 3, 2] 		  // 分类及数值
        ]
    },
    series: [{
        type: 'spline',
        // type: 'windbarb',
        //  {
        //   y: 216.4, 
        //   marker: { 
        //       fillColor: '#BF0B23',
        //       radius: 10 
        //   }
        // },
        // data: [
        //     [
        //         "2023-02",
        //         765.42
        //     ],
        //     [
        //         "2023-01",
        //         1.11
        //     ],
        //     [
        //         "2022-12",
        //         13.12
        //     ]
        // ],
        data: line_array.value,
        // data: [['Jan', 500], ['Feb', 1100], ['Mar', 850], ['Apr', 1050], ['May', 950], ['Jun', 1800], ['Jul', 1400], ['Aug', 1000], ['Sep', 1300], ['Oct', 1000], ['Nov', 1100], ['Dec', 1800]], // sample data
        showInLegend: false // 设置为 false 即为不显示在图例中

    }],
    colors: ['#438883', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    title: {
        text: ''
    },
    Axis: {
        toValue: true,
    },
    xAxis: {
        title: null,
        labels: {
            // enabled: false

        },
        tickLength: 0,
        tickWidth: 0,
        lineWidth: 0,
        tickColor: '#ffffff',
        gridLineWidth: 0,
        // visible: false,
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] //
        // categories: ["2022-12", "2023-01", "This Month"]
        categories: categories.value,
    },
    yAxis: {
        title: null,
        labels: {
            enabled: false
        },
    },
    point: {
        visible: false,
    },
    /**
     * 提示框
     * 。数据提示框内提示的信息完全可以通过格式化函数动态指定；
     * . 设置 tooltip.enabled = false 即可不启用提示框。
     */
    tooltip: {
        backgroundColor: '#F3F3F3',
        borderColor: '#89b4b1',
        borderWidth: '1px',
        borderRadius: 15,
        shadow: false,
        hideDelay: 50,
        // 
        // 跟随鼠标/手指
        // followPointer: true,
        // followTouchMove: true,
        // 
        style: {
            color: '#438883',
            'font-weight': 700,
            'text-align': 'center',
        },
        formatter() {
            console.log(this);
            return '$' + String(this.y).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
}))
</script>

<template>
    <div class="chart">
        <highcharts :options="chartOptions" style="width:380px;height:200px"></highcharts>
    </div>
</template>

<style lang="less" scoped>
.chart {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>