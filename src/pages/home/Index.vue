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
                <el-button type="text" style="color: white" icon="el-icon-s-unfold" v-if="isCollapse"
                           @click="openMenu()">展开
                </el-button>
                <el-button type="text" style="color: white;padding-left:20px;" icon="el-icon-s-fold" v-else
                           @click="openMenu()">关闭
                </el-button>
                <el-menu
                        style="border:none"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                        :default-active="active"
                        unique-opened
                        :collapse-transition="false"
                        :collapse="isCollapse">
                    <el-submenu v-for="permission in permissionList"
                                :index="permission.id+''"
                                :key="permission.id+''">
                        <template slot="title">
                            <i :class="permission.icon"></i>
                            <span slot="title">{{permission.label}}</span>
                        </template>
                        <el-menu-item v-for="childPermission in permission.children"
                                      :index="childPermission.path"
                                      :key="childPermission.id+''">
                            <i :class="childPermission.icon"></i>
                            {{childPermission.label}}
                        </el-menu-item>
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
                <breadcrumb class="breadcrumb-container"/>
                <router-view :key="key"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb/Index'

    export default {
        name: "HomeIndex",
        components: {
            Breadcrumb
        },
        data() {
            return {
                isCollapse: false,
                permissionList: []
            };
        },
        mounted() {
            this.getRolePermission(8);
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
            getRolePermission(roleId) {
                this.$api.getRolePermission(roleId).then(v => {
                    let parentPermission = [];
                    let childPermission = new Map();
                    let permissionSet = new Set()
                    v.data.permissionSlice.forEach(permission => {
                        permissionSet.add(permission.id)
                        permissionSet.add(permission.parentId)
                    });

                    v.data.allPermissions.forEach(permission => {
                        if (permissionSet.has(permission.id)) {
                            let tmp = {};
                            tmp.id = permission.id;
                            tmp.label = permission.title;
                            tmp.path = permission.path;
                            tmp.icon = permission.icon;
                            tmp.parentId = permission.parentId;
                            if (permission.parentId === 0) {
                                tmp.children = [];
                                parentPermission.push(tmp)
                            } else {
                                if (!childPermission.has(tmp.parentId)) {
                                    childPermission.set(tmp.parentId, [tmp]);
                                } else {
                                    let t = childPermission.get(tmp.parentId)
                                    t.push(tmp)
                                    childPermission.set(tmp.parentId, t);
                                }
                            }
                        }
                    });
                    parentPermission.forEach((p, i) => {
                        if (childPermission.has(p.id)) {
                            p.children = childPermission.get(p.id)
                            parentPermission[i] = p
                        }
                    });
                    this.permissionList = parentPermission;
                })
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
            },
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

    .el-aside {
        background: #545c64;
    }

    .el-dropdown {
        margin-right: 16px;
        color: #fff;
    }

    .el-header {
        background-color: #545c64;
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
