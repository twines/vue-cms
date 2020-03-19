<template>
    <el-card shadow="hover">
        <el-button @click="showDialog" type="primary" style="margin-top: 8px">添加角色</el-button>

        <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑权限" :visible.sync="permissionVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item>
                    <el-tree
                            :data="data"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                    </el-tree>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="changePermission">确认</el-button>
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
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                    <el-button @click="deleteRole" type="danger" size="small">删除</el-button>
                    <el-button type="warning" size="small" @click="showPermission">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    :hide-on-single-page="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
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
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                ruleForm: {
                    roleName: '',
                    description: ''
                },
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                },
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                dialogFormVisible: false,
                permissionVisible: false,
            }
        },
        created() {
            this.getRoleList()
        },
        methods: {
            deleteRole() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(this.$refs.tree.getCheckedNodes());
            },
            changePermission() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            showDialog() {
                this.ruleForm = {
                    roleName: '',
                    description: ''
                };
                this.dialogFormVisible = !this.dialogFormVisible;
            },
            showPermission() {
                this.permissionVisible = !this.permissionVisible
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            getRoleList() {
                let tmp = [];
                for (let i = 1; i < 10; i++) {
                    tmp.push(
                        {
                            id: i,
                            roleName: '角色' + i,
                            description: '角色描述' + i,
                        }
                    )
                }
                this.tableData = tmp
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
