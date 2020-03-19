<template>
    <div class="login-container">
        <div class="login-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <div id="logo">
                    <img src="@/assets/logo.jpg">
                </div>
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password
                              prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "LoginIndex",
        created() {
        },
        data() {
            return {
                ruleForm: {
                    userName: 'hanyun',
                    password: '1355081829aA',
                },
                loading: false,
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = !this.loading;
                        setTimeout(() => {
                            this.loading = !this.loading;
                        }, 3000);
                        this.$api.login(this.ruleForm).then(v => {
                            window.sessionStorage.setItem('token', v.data.tokenType + ' ' + v.data.accessToken)
                            this.$router.push('/')
                            this.$message.success('欢迎您，' + v.data.user.name + '！');
                        })
                    } else {
                        this.$message.error('');
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

<style scoped lang="scss">
    .login-container {
        background-image: url("../../assets/bg.jpg");
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        .login-form {
            border-radius: 16px;
            padding: 20px;
            background: white;
            position: absolute;
            width: 500px;
            height: 300px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-sizing: border-box;


            #logo {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                position: relative;
                left: 50%;
                transform: translate(-50%, -50%);

                img {
                    border-radius: 50%;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }
            }

        }


    }
</style>
