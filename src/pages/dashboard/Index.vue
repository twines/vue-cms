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
    </div>
</template>

<script>
    export default {
        name: "DashboardIndex"
    }
</script>

<style scoped>

</style>
