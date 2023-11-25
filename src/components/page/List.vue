<template>
    <div class="task-manager">
        <el-button @click="addNewList" type="primary" style="margin-bottom: 20px">Add List</el-button>
        <div class="task-lists">
            <div v-for="list in lists" :key="list.id" class="task-list">
                <el-card>
                    <div class="headerr">
                        <!-- <span class="list-name" >{{ list.name }}</span> -->
                        <el-button @click="showTasks(list)" type="text"> {{ list.name }}</el-button>
                        <el-button @click="deleteList(list.id)" type="primary" icon="el-icon-delete"></el-button>
                    </div>
                    <!-- <div @click="showTasks(list.id)">
                        <p v-if="selectedList === list.id">Tasks:</p>
                        <ul v-if="selectedList === list.id && tasks.length > 0">
                            <li v-for="(task, taskIndex) in tasks" :key="taskIndex">{{ task }}</li>
                        </ul>
                        <p v-if="selectedList === list.id && tasks.length === 0">No tasks available.</p>
                    </div> -->
                </el-card>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible1">
            <div slot="header" class="clearfix">
                <span>{{ this.currentListname }}</span>
            </div>

            <el-row>
                <el-col :span="16">
                    <el-input v-model="taskModle.content" placeholder="请输入您要添加的任务" id="task"></el-input>
                </el-col>
                <el-col :span="4" align="right">
                    <el-date-picker
                        v-model="taskModle.duetime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="4" align="center">
                    <el-button type="primary" icon="el-icon-plus" circle @click="addListtaskOp"></el-button>
                </el-col>
            </el-row>

            <el-table :show-header="true" :data="todoList" style="width: 100%" height="300">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.status" @change="updateStatus1(scope.$index, scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="180"> </el-table-column>
                <el-table-column prop="content" label="任务内容" width="500"> </el-table-column>
                <el-table-column prop="duetime" label="截止日期" width="300"> </el-table-column>

                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editOp(scope.row)"></el-button>
                    </template>
                </el-table-column>

                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-delete" circle @click="delOp(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisible" title="Create New List">
            <el-form :model="newList" ref="newListForm" :rules="listRules" label-width="100px">
                <el-form-item label="List Name" prop="name">
                    <el-input v-model="newList.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addList">Create</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getLists,getListstasks,addListTask,addList,delList} from '../../api/tasks.js';
export default {
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            lists: [], // 存储任务列表
            taskModle: {},
            tasks: [], // 存储任务
            listId: '',
            selectedList: null, // 存储选定的列表
            currentListname: '',
            currentListid: '',
            dialogVisible: false, // 控制新建列表对话框的显示
            dialogVisible1: false,
            newList: {
                name: ''
            }, // 存储新建列表的名称
            listRules: {
                // 列表名称的验证规则
                name: [{ required: true, message: 'Please input the list name', trigger: 'blur' }]
            }
        };
    },
    methods: {
        getListsOp(username) {
            let info = {
                "name": username
            };
            getLists(info).then((res) => {
                this.Lists = res.rows;
            });
        },
        getListstasksOp(username,listid) {
            let info = {
                "name": username,
                "listid" : listid
            };
            getListstasks(info).then((res) => {
                this.tasks = res.rows;
            });
        },

        addListtaskOp() {
            this.taskModle.listId = this.listId;
            addListTask(this.taskModle).then((res) => {
                if (res.result == '1') {
                    this.$message({
                        message: '任务新增成功',
                        type: 'success'
                    });
                    this.taskModle.content = '';
                    this.taskModle.duetime = '';
                    this.taskModle.listId = '';
                } else {
                    this.$message({
                        message: '任务新增失败',
                        type: 'error'
                    });
                }
            });
        },


        addNewList() {
            this.dialogVisible = true;
        },
        addListOp() {
            this.$refs['newListForm'].validate((valid) => {
                if (valid) {
                    const newList = {
                        id: this.lists.length + 1,
                        name: this.newList.name,
                        username: localStorage.getItem('ms_username')
                    };
                    addList(newList).then((res) => {
                        if (res.result == '1') {
                            this.$message({
                                message: 'add list successfully',
                                type: 'sucess'
                            });
                            this.dialogVisible = false;
                        }
                    });
                    // this.lists.push(newList);
                }
            });
        },
        deleteListOp(listid) {
            delList(listid).then((res) => {
                if (res.result == '1') {
                    this.$message({
                        message: 'delete list successfully',
                        type: 'sucess'
                    });
                    this.dialogVisible = false;
                }
            });
            // this.selectedList = null;
            // this.tasks = [];
        },

        showTasks(list) {
            this.listId = list.id;
            this.currentListname = list.name;
            this.dialogVisible1 = true;
    },
},
created() {
    getListsOp(this.name),
    getListstasksOp(this.name,this.listId) 
}
}

</script>

<style>
.task-manager {
    max-width: 800px;
    margin: 0 auto;
}
.task-lists {
    display: flex;
    flex-wrap: wrap;
}
.task-list {
    width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
}
.headerr {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-name {
    font-weight: bold;
}
</style>