<template>
    <el-card shadow="hover">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="keyword" clearable>
                    <el-select v-model="userStatus" slot="prepend" placeholder="选择条件" class="prefix-text">
                        <!--                        0禁用;1正常；2认证中；3认证失败；4认证成功-->
                        <el-option label="禁用" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="认证中" value="2"></el-option>
                        <el-option label="认证失败" value="3"></el-option>
                        <el-option label="认证成功" value="4"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-dialog title="编辑用户信息" :visible.sync="userInfo">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
            <el-table-column prop="username" label="用户名称"></el-table-column>
            <el-table-column prop="trueName" label="真实姓名"></el-table-column>
            <el-table-column prop="cardNumber" label="身份证号"></el-table-column>

            <el-table-column prop="cardA" label="身份证正面">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.cardA"
                            :preview-src-list="[scope.row.cardA]"
                            fit="contain">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column prop="cardB" label="身份证反面">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.cardB"
                            :preview-src-list="[scope.row.cardB]"
                            fit="contain">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column prop="qq" label="QQ"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="gender" label="性别">
                <template slot-scope="scope">
                    <span v-if="scope.row.gender===1">男</span>
                    <span v-else>女</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status===1">
                        <el-tag>正常</el-tag>
                    </span>
                    <span v-else>
                        <el-tag type="danger">禁用</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button @click="deleteUser(scope.row.id)" type="danger" size="small">删除</el-button>
                    <el-button type="warning" size="small" @click="showUserInfo(scope.row.id)">编辑</el-button>
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
        name: "UserAuth",
        data() {
            return {
                tableData: [],
                totalPage: 1,
                loading: false,
                keyword: '',
                userStatus: '',
                currentPage: 1,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                },
                userAddDialogVisible: false,
                userInfo: false,
            }
        },
        created() {
            this.getUserAuthList()
        },
        methods: {
            search() {
                this.currentPage = 1;
                this.getUserAuthList();
            },
            deleteUser(userId) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteUser(userId).then(v => {
                        if (v.code === 20000) {
                            setTimeout(() => window.location.reload(), 500);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message.error('删除失败');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showDialog() {
                this.ruleForm = {
                    username: '',
                    password: ''
                };
                this.userAddDialogVisible = !this.userAddDialogVisible;
            },
            showUserInfo(userId) {
                this.userInfo = !this.userInfo;
                this.getUserById(userId).then(v => {
                    this.ruleForm = v.data
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUserAuthList();
                console.log(`当前页: ${val}`);
            },
            getUserAuthList() {
                this.$api.getUserAuthList(this.currentPage, this.keyword, this.userStatus).then(v => {
                    this.tableData = v.data.data;
                    this.totalPage = v.data.totalPage;
                });
            },
            getUserById(userId) {
                return this.$api.getUserById(userId)
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
            addUser() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        setTimeout(() => this.loading = false, 5000);
                        this.$api.addUser(this.ruleForm).then(v => {
                            this.showDialog();
                            this.loading = false;
                            if (v.code === 20000) {
                                setTimeout(() => window.location.reload(), 500);
                                this.$message.success('添加成功');
                            } else {
                                this.$message.error(v.message);
                            }
                        })
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
    .prefix-text {
        width: 108px;
        text-align: center;
    }

    .paginate {
        margin: 0 auto;
    }
</style>
