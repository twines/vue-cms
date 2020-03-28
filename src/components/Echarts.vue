<template>
    <div :id="chartId" :style="{width: '100%', height: '300px'}"></div>
</template>

<script>
    import echarts from 'echarts'
    import chinaJson from 'echarts/map/json/china'

    export default {
        name: "Echarts",
        props: ['chartId', 'option'],
        mounted() {
            this.drawLine();
        },
        watch: {
            option() {
                this.drawLine();
            }
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                echarts.registerMap('china', chinaJson);
                let myChart = echarts.init(document.getElementById(this.chartId));
                // 绘制图表
                myChart.setOption(this.option);
            }
        }
    }
</script>

<style scoped>

</style>
