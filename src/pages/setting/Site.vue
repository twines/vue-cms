<template>
    <div>
        <el-card shadow="hover">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="网站名称" prop="siteName">
                    <el-input v-model="ruleForm.siteName"></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="keywords">
                    <el-input v-model="ruleForm.keywords"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="备案号" prop="number">
                    <el-input v-model="ruleForm.number"></el-input>
                </el-form-item>
                <el-form-item label="运营状态" prop="status">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio :label="0">关闭</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="网站logo" prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Site",
        data() {
            return {
                ruleForm: {
                    siteName: '',
                    keywords: '',
                    description: '',
                    number: '',
                    status: '',
                    logo: '/img/happy.89793f16.gif'
                },
                uploadUrl: 'http://127.0.0.1/admin/v1/upload',
                rules: {
                    siteName: [
                        {required: true, message: '请输入网站名称', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    keywords: [
                        {required: true, message: '请输入网站关键词', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '请输入网站备案号', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择网站状态', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请填写网站描述', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    logo: [
                        {required: true, message: '请填上传网站logo', trigger: 'blur'},
                    ]
                }
            };
        },
        mounted() {
            this.getSiteDetail();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.siteConfig(this.ruleForm).then(v => {
                            if (v.code === 20000) {
                                this.$message.success('成功');
                            } else {
                                this.$message.error('失败');
                            }
                        });
                    }
                });
            },
            getSiteDetail() {
                this.$api.getSiteDetail().then(v => {
                    this.ruleForm = v.data;
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                console.log(file)
                this.ruleForm.logo = 'http://127.0.0.1' + res.url;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>