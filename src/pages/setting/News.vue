<template>
    <el-card shadow="hover">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-button @click="showDialog" type="primary">添加新闻公告</el-button>
            </el-col>
        </el-row>
        <el-dialog title="添加新闻公告" :visible.sync="newsAddDialogVisible">
            <el-form :model="ruleForm" :rules="newsRules" ref="ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="keyword">
                    <el-input v-model="ruleForm.keyword"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="addNews">添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑用户信息" :visible.sync="userInfo">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
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
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="keyword" label="关键词"></el-table-column>
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="deleteNews(scope.row.id)" type="danger" size="small">删除</el-button>
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
        name: "UserIndex",
        data() {
            return {
                tableData: [],
                totalPage: 1,
                loading: false,
                keyword: '',
                select: '',
                currentPage: 1,
                ruleForm: {
                    title: '',
                    keyword: '',
                    content: '',
                    description: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                },
                newsRules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ]
                },
                newsAddDialogVisible: false,
                userInfo: false,
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            search() {
                this.getNewsList();
            },
            deleteNews(newsId) {
                this.$confirm('此操作将永久该角色, 是否继续?', '删除角色', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteNews(newsId).then(v => {
                        if (v.code === 20000) {
                            setTimeout(() => window.location.reload(), 500);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
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
                    userName: '',
                    password: ''
                };
                this.newsAddDialogVisible = !this.newsAddDialogVisible;
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
                this.getNewsList();
                console.log(`当前页: ${val}`);
            },
            getNewsList() {
                this.$api.getNewsList(this.currentPage).then(v => {
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
            addNews() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        setTimeout(() => this.loading = false, 5000);
                        this.$api.addNews(this.ruleForm).then(v => {
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
