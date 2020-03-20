<template>
    <el-container>
        <el-header>
            <div id="logo">
                <img src="@/assets/happy.gif"/>
            </div>
            <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                   hanyun<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                    <el-dropdown-item command="password">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside :style="{width:!isCollapse?'300px':'72px'}">
                <el-button type="text" v-if="isCollapse" @click="openMenu()">展开</el-button>
                <el-button type="text" v-else @click="openMenu()">关闭</el-button>
                <el-menu
                        style="border:none"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                        :default-active="active"
                        unique-opened
                        :collapse-transition="false"
                        :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-monitor"></i>
                            <span slot="title">仪表盘</span>
                        </template>
                        <el-menu-item index="/dashboard"><i class="el-icon-house"></i>首页</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item index="/role/list">角色列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="/user/list"><i class="el-icon-user"></i>用户列表</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>
<!--                <el-row>-->
<!--                    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
<!--                    </el-breadcrumb>-->
<!--                </el-row>-->
                <router-view :key="key"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "HomeIndex",
        data() {
            return {
                isCollapse: false
            };
        },
        computed: {
            key() {
                return this.$route.path
            },
            active() {
                return this.$route.path
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                switch (command) {
                    case 'logout':
                        window.sessionStorage.clear();
                        this.$router.push('/login');
                        this.$message.success('退出成功');
                        break;
                    case 'password':
                        break;
                    default:

                }
            },
            openMenu() {
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-container {
        width: 100%;
        height: 100%;
    }

    .el-menu {
        margin: 0 auto;
    }

    .el-dropdown {
        margin-right: 16px;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        height: 68px !important;
        align-items: center;
        display: flex;
        justify-content: space-between;

        #logo {
            border-radius: 50%;
            width: 60px;
            height: 60px;

            img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }


    }

    .el-aside {
        color: #333;
    }

    .el-main {

    }
</style>
