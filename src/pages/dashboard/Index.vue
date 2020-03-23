<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <i class="el-icon-user"></i>
                    总是显示
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    总是显示
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    总是显示
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always">
                    <echarts chart-id="user" :option="userOptions"></echarts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always">
                    <echarts chart-id="name" :option="nameOptions"></echarts>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Echarts from '../../components/Echarts'

    export default {
        name: "DashboardIndex",
        components: {Echarts},
        data() {
            return {
                userOptions: {
                    title: {text: '新增用户统计'},
                    tooltip: {},
                    xAxis: {
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    },
                    yAxis: {},
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                    }]
                },
                nameOptions: {
                    title: {text: '访问量统计'},
                    tooltip: {},
                    xAxis: {
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    },
                    yAxis: {},
                    series: [{
                        name: '人次',
                        type: 'bar',
                        data: [500, 2000, 3600, 1000, 1000, 2000, 5000, 2000, 3600, 1000, 1990, 2000]
                    }]
                }
            }
        }
    }
</script>

<style scoped>

</style>
