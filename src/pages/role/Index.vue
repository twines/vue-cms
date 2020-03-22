<template>
    <el-card shadow="hover">
        <el-button @click="showDialog" type="primary" style="margin-top: 8px">添加角色</el-button>

        <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addRole('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑权限" :visible.sync="permissionVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item>
                    <el-tree
                            :data="permissionList"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="tree"
                            :default-checked-keys="rolePermissionList"
                            highlight-current
                            :props="defaultProps">
                    </el-tree>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="changePermission">确认</el-button>
                    <el-button @click="resetChecked">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table :data="tableData" stripe>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="description" label="角色描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button @click="deleteRole(scope.row.id)" type="danger" size="small">删除</el-button>
                    <el-button type="warning" size="small" @click="showPermission(scope.row.id)">编辑</el-button>
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
        name: "RoleIndex",
        data() {
            return {
                tableData: [],
                currentPage: 1,
                totalPage: 1,
                ruleForm: {
                    roleName: '',
                    description: ''
                },
                loading: false,
                roleId: 0,
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                },
                permissionList: [],
                rolePermissionList: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                addRoleDialogVisible: false,
                permissionVisible: false,
            }
        },
        created() {
            this.getRoleList()
        },
        methods: {
            deleteRole(roleId) {
                this.$confirm('此操作将永久该角色, 是否继续?', '删除角色', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteRole(roleId).then(v => {
                        if (v.code === 20000) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getRoleList();
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
            changePermission() {
                let permissionList = this.$refs.tree.getCheckedKeys();
                this.loading = true;
                this.$api.changePermission(this.roleId, permissionList).then((v) => {
                    setTimeout(() => {
                        this.showPermission(this.roleId);
                        this.loading = false;
                    }, 500)
                    if (v.code === 20000) {
                        this.$message.success('更新成功');
                    } else {
                        this.$message.error(v.message);
                    }
                })
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            showDialog() {
                this.ruleForm = {
                    roleName: '',
                    description: ''
                };
                this.addRoleDialogVisible = !this.addRoleDialogVisible;
            },
            showPermission(roleId) {
                this.roleId = roleId;
                this.getRolePermission(roleId);
                this.permissionVisible = !this.permissionVisible
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoleList();
                console.log(`当前页: ${val}`);
            },
            getRoleList() {
                this.$api.getRoleList(this.currentPage).then(v => {
                    this.tableData = v.data.data;
                    this.totalPage = v.data.totalPage;
                });
            },
            getRolePermission(roleId) {
                this.$api.getRolePermission(roleId).then(v => {
                    let parentPermission = [];
                    let childPermission = new Map();
                    let permissionList = [];
                    v.data.permissionSlice.forEach(permission => {
                        permissionList.push(permission.id);
                    });
                    this.rolePermissionList = permissionList;
                    console.log(this.rolePermissionList);
                    v.data.allPermissions.forEach(permission => {
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
                    });
                    parentPermission.forEach((p, i) => {
                        if (childPermission.has(p.id)) {
                            p.children = childPermission.get(p.id)
                            parentPermission[i] = p
                        }
                    });
                    this.permissionList = parentPermission
                })
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
            addRole(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // setTimeout(() => this.showDialog(), 5000)
                        this.$api.addRole(this.ruleForm).then(v => {
                            if (v.code === 20000) {
                                this.showDialog();
                                window.location.reload();
                                this.$message.success("添加成功");
                            } else {
                                this.$message.success(v.message);
                            }
                        })
                    } else {
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
