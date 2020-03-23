<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="6">
                <el-card shadow="always">
                    <div slot="header">
                        <span> <i class="el-icon-user"></i>总人数</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                    <h1>10K</h1>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always">
                    <div slot="header">
                        <span> <i class="el-icon-price-tag"></i>总收藏</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                    <h1>10K</h1>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always">
                    <div slot="header">
                        <span> <i class="el-icon-view"></i>总访问量</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                    <h1>10W</h1>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always">
                    <div slot="header">
                        <span> <i class="el-icon-chat-line-square"></i>代办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                    <h1>10</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 16px">
            <el-col :span="12">
                <el-card shadow="hover">
                    <echarts chart-id="user" :option="userOptions"></echarts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <echarts chart-id="name" :option="nameOptions"></echarts>
                </el-card>
            </el-col>
        </el-row>
        <h1>待办事项</h1>
        <el-row :gutter="12" style="margin-top: 16px">
            <el-card shadow="hover">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="描述">
                    </el-table-column>
                </el-table>
            </el-card>
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
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    title: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    title: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    title: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    title: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
