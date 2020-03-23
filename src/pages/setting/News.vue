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
                    <vue-ueditor-wrap v-model="ruleForm.content" :config="myConfig"></vue-ueditor-wrap>
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
        <el-dialog title="编辑新闻公告" :visible.sync="editorDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">

                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <vue-ueditor-wrap v-model="ruleForm.content" :config="myConfig"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="关键词" prop="keyword">
                    <el-input v-model="ruleForm.keyword"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateNews">保存</el-button>
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
                    <el-button type="warning" size="small" @click="showEditorDialog(scope.row.id)">编辑</el-button>
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

    import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
    export default {
        name: "UserIndex",
        components: {
            VueUeditorWrap
        },
        data() {
            return {
                tableData: [],
                totalPage: 1,
                loading: false,
                keyword: '',
                select: '',
                newsId: 0,
                currentPage: 1,
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: true,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    toolbars: [[
                        'fullscreen', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                        'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace', 'drafts', 'help'
                    ]],
                    zIndex: 99999,
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    serverUrl: 'http://35.201.165.105:8000/controller.php',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/static/UEditor/'
                },
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
                editorDialog: false,
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
            showEditorDialog(newsId) {
                this.editorDialog = !this.editorDialog;
                this.getNewsById(newsId);
                this.newsId = newsId;
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
            getNewsById(newsId) {
                return this.$api.getNewsById(newsId).then(v => {
                    this.ruleForm = v.data
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
            updateNews() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.$api.updateNews(this.newsId, this.ruleForm).then(v => {
                            if (v.code === 20000) {
                                setTimeout(() => window.location.reload(), 500);
                                this.$message({
                                    type: 'success',
                                    message: '更新成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '更新失败!'
                                });
                            }
                        })
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
