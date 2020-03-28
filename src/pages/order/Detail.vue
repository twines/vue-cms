<template>
    <div>
        <div style="position: absolute;z-index: 9999;right: 10px;top:90px">
            <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
                <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
        </div>
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span><i class="el-icon-s-goods"></i>订单详情</span>
                    </div>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">
                            <el-tooltip effect="dark" content="店铺" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-s-shop"></el-button>
                            </el-tooltip>

                        </el-col>
                        <el-col :span="18">{{order.dateAdded}}</el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">
                            <el-tooltip effect="dark" content="下单日期" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-date"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">{{order.dateAdded}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <el-tooltip effect="dark" content="支付方式" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-bank-card"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">{{order.dateAdded}}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span><i class="el-icon-s-goods"></i>顾客详情</span>
                    </div>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">
                            <el-tooltip effect="dark" content="顾客姓名" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-user-solid"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">{{order.firstname+' '+order.lastname}}</el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">

                            <el-tooltip effect="dark" content="邮箱" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-message"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">{{order.email}}</el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">

                            <el-tooltip effect="dark" content="用户组" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-user-solid"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">默认用户组</el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 2px">
                        <el-col :span="3">

                            <el-tooltip effect="dark" content="电话" placement="top">
                                <el-button size="small" type="primary" icon="el-icon-phone-outline"></el-button>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="18">{{order.telephone}}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span><i class="el-icon-setting"></i>选项</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                order: {}
            }
        },
        mounted() {
            this.getOrderDetail()
        },
        methods: {
            getOrderDetail() {
                this.$api.getOrderDetail(this.$route.params.orderId).then(v => {
                    this.order = v.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
