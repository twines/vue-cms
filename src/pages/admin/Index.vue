<template>
    <el-card shadow="hover">
        <el-row>
            <el-button @click="showDialog" type="primary" style="margin-top: 8px">添加管理员</el-button>
        </el-row>

        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="管理员名称" prop="name">
                    <el-input type="text" clearable v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" show-password v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="trueName">
                    <el-input type="text" clearable v-model="ruleForm.trueName"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input type="text" clearable v-model="ruleForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" clearable v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input type="mobile" clearable v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择角色">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="addAdmin()">添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table :data="tableData" stripe>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="管理员名称"></el-table-column>
            <el-table-column prop="trueName" label="真实姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="qq" label="QQ"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status===1">正常</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="所属角色">
                <template slot-scope="scope">
                    {{scope.row.role.name}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    :hide-on-single-page="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next, jumper"
                    :page-count="totalPage">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "AdminIndex",
        data() {
            return {
                tableData: [],
                currentPage: 1,
                totalPage: 1,
                ruleForm: {
                    name: '',
                    trueName: '',
                    role: '',
                    qq: '',
                    email: '',
                    mobile: '',
                    password: ''
                },
                loading: false,
                rules: {
                    name: [
                        {required: true, message: '请输入管理员名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    role: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ]
                },
                dialogFormVisible: false,
            }
        },
        created() {
            this.getAdminList();
        },
        methods: {
            showDialog() {
                this.dialogFormVisible = !this.dialogFormVisible;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAdminList();
                console.log(`当前页: ${val}`);
            },
            getAdminList() {
                this.$api.getAdminList(this.currentPage).then(v => {
                    this.tableData = v.data.data
                    this.totalPage = v.data.totalPage
                });
            },
            addAdmin() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        setTimeout(() => {
                            this.loading = false;
                        }, 5000);
                        this.$api.addAdmin(this.ruleForm).then(v => {
                            this.showDialog();
                            this.loading = false;
                            if (v.code === 20000) {
                                this.$message.success('添加成功');
                            } else {
                                this.$message.error(v.message);
                            }
                        })
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .paginate {
        margin: 0 auto;
    }
</style>
