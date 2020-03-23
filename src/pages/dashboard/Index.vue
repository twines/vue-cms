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
        <el-row :gutter="12" style="margin-top: 16px">
            <el-col :span="12">
                <el-card shadow="hover">
                    <echarts chart-id="china" :option="chinaOptions"></echarts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">
                        <span>待办事项</span>
                    </div>
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
                chinaOptions: {
                    title: {
                        text: '中国iphone销量分布图',
                        subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['iphone X', 'iphone 11', 'iphone 11MAX']
                    },
                    visualMap: {
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],           // 文本，默认为数值文本
                        calculable: true
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: true},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: 'iphone X',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '北京', value: Math.round(Math.random() * 1000)},
                                {name: '天津', value: Math.round(Math.random() * 1000)},
                                {name: '上海', value: Math.round(Math.random() * 1000)},
                                {name: '重庆', value: Math.round(Math.random() * 1000)},
                                {name: '河北', value: Math.round(Math.random() * 1000)},
                                {name: '河南', value: Math.round(Math.random() * 1000)},
                                {name: '云南', value: Math.round(Math.random() * 1000)},
                                {name: '辽宁', value: Math.round(Math.random() * 1000)},
                                {name: '黑龙江', value: Math.round(Math.random() * 1000)},
                                {name: '湖南', value: Math.round(Math.random() * 1000)},
                                {name: '安徽', value: Math.round(Math.random() * 1000)},
                                {name: '山东', value: Math.round(Math.random() * 1000)},
                                {name: '新疆', value: Math.round(Math.random() * 1000)},
                                {name: '江苏', value: Math.round(Math.random() * 1000)},
                                {name: '浙江', value: Math.round(Math.random() * 1000)},
                                {name: '江西', value: Math.round(Math.random() * 1000)},
                                {name: '湖北', value: Math.round(Math.random() * 1000)},
                                {name: '广西', value: Math.round(Math.random() * 1000)},
                                {name: '甘肃', value: Math.round(Math.random() * 1000)},
                                {name: '山西', value: Math.round(Math.random() * 1000)},
                                {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                                {name: '陕西', value: Math.round(Math.random() * 1000)},
                                {name: '吉林', value: Math.round(Math.random() * 1000)},
                                {name: '福建', value: Math.round(Math.random() * 1000)},
                                {name: '贵州', value: Math.round(Math.random() * 1000)},
                                {name: '广东', value: Math.round(Math.random() * 1000)},
                                {name: '青海', value: Math.round(Math.random() * 1000)},
                                {name: '西藏', value: Math.round(Math.random() * 1000)},
                                {name: '四川', value: Math.round(Math.random() * 1000)},
                                {name: '宁夏', value: Math.round(Math.random() * 1000)},
                                {name: '海南', value: Math.round(Math.random() * 1000)},
                                {name: '台湾', value: Math.round(Math.random() * 1000)},
                                {name: '香港', value: Math.round(Math.random() * 1000)},
                                {name: '澳门', value: Math.round(Math.random() * 1000)}
                            ]
                        },
                        {
                            name: 'iphone 11',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '北京', value: Math.round(Math.random() * 1000)},
                                {name: '天津', value: Math.round(Math.random() * 1000)},
                                {name: '上海', value: Math.round(Math.random() * 1000)},
                                {name: '重庆', value: Math.round(Math.random() * 1000)},
                                {name: '河北', value: Math.round(Math.random() * 1000)},
                                {name: '安徽', value: Math.round(Math.random() * 1000)},
                                {name: '新疆', value: Math.round(Math.random() * 1000)},
                                {name: '浙江', value: Math.round(Math.random() * 1000)},
                                {name: '江西', value: Math.round(Math.random() * 1000)},
                                {name: '山西', value: Math.round(Math.random() * 1000)},
                                {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                                {name: '吉林', value: Math.round(Math.random() * 1000)},
                                {name: '福建', value: Math.round(Math.random() * 1000)},
                                {name: '广东', value: Math.round(Math.random() * 1000)},
                                {name: '西藏', value: Math.round(Math.random() * 1000)},
                                {name: '四川', value: Math.round(Math.random() * 1000)},
                                {name: '宁夏', value: Math.round(Math.random() * 1000)},
                                {name: '香港', value: Math.round(Math.random() * 1000)},
                                {name: '澳门', value: Math.round(Math.random() * 1000)}
                            ]
                        },
                        {
                            name: 'iphone 11MAX',
                            type: 'map',
                            mapType: 'china',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {name: '北京', value: Math.round(Math.random() * 1000)},
                                {name: '天津', value: Math.round(Math.random() * 1000)},
                                {name: '上海', value: Math.round(Math.random() * 1000)},
                                {name: '广东', value: Math.round(Math.random() * 1000)},
                                {name: '台湾', value: Math.round(Math.random() * 1000)},
                                {name: '香港', value: Math.round(Math.random() * 1000)},
                                {name: '澳门', value: Math.round(Math.random() * 1000)}
                            ]
                        }
                    ]
                },
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
