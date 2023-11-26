<template>
    <div class="tasks-container">
        <el-card>
            <el-row>
                <el-col :span="16" class="center-col" >
                    <el-input v-model="taskModle.content" placeholder="Please add your task here!" style="font-size: 18px;"></el-input>
                </el-col>
                <el-col :span="7" class="center-col">
                    <el-date-picker v-model="taskModle.duetime" type="datetime" placeholder="Please choice due date" style="font-size: 15px;" align="right"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="1" class="center-col">
                    <el-button type="primary" icon="el-icon-plus" circle @click="addOp"></el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card shadow="hover">
            <div slot="header" class="clearfix" style="font-size:25px;">
                <span>To do List</span>
            </div>
            <el-table :show-header="true" :data="todoList" style="width: 100%;font-size:16px; " height="300" >
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row._completed" @change="updateStatus1(scope.$index, scope.row)"
                            :key="scope.row.id"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="Task" width="70"> </el-table-column>
                <el-table-column prop="title" label="Content" width="500"> </el-table-column>
                <el-table-column label="Due date" width="320">
                    <template slot-scope="scope">
                        <!-- 假设 formatDate 是您的格式化函数 -->
                        {{ formatDate(scope.row.due_date) }}
                    </template>
                </el-table-column>
                <el-table-column label="Status" width="140">
                    <template slot-scope="scope">
                        <!-- 假设 formatDate 是您的格式化函数 -->
                        {{scope.row._important}}
                    </template>
                </el-table-column>
                <!-- <template slot-scope="scope">
                        <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">{{ scope.row.title }}</div>
                    </template> -->

                <el-table-column label="Edit">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editOp(scope.row, 'todo')"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="Delete">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle
                            @click="delOp(scope.$index, scope.row, 'todo')"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card shadow="hover">
            <div slot="header" class="clearfix" style="font-size:25px;">
                <span>Done List</span>
            </div>
            <el-table :show-header="true" :data="doneList" style="width: 100%;font-size:16px;" height="300">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row._completed" @change="updateStatus2(scope.$index, scope.row)"
                            :key="scope.row.id"></el-checkbox>
                    </template>
                </el-table-column>

                <el-table-column type="Task" label="Task" width="70" class-name="todo-item-del"> </el-table-column>
                <el-table-column label="Content" width="500">
                    <template slot-scope="scope">
                        <div class="todo-item-del">{{ scope.row.title }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Due date" width="320">
                    <template slot-scope="scope">
                        <div class="todo-item-del">{{ formatDate(scope.row.due_date) }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="Edit">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editOp(scope.row, 'done')"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="Delete">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle
                            @click="delOp(scope.$index, scope.row, 'done')"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="Edit" :visible.sync="updatedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- 修改内容 -->
                    <el-input v-model="editContent" style="margin-bottom:20px" placeholder="Please edit"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-date-picker v-model="editDuetime" type="datetime" placeholder="Please choose a time" align="right"
                        :picker-options="pickerOptions" style="width: 100%;">
                    </el-date-picker>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatedialogVisible = false">No</el-button>
                <el-button type="primary" @click="modfieData()">Yes</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Delete" :visible.sync="deletedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- 修改内容 -->
                    Are you sure you want to delete?
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deletedialogVisible = false">No</el-button>
                <el-button type="primary" @click="handledelete()">Yes</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addTask, login, getTodoList, getDoneList, completeTask, uncompleteTask, updateTaskInfo, deleteTask } from '../../api/tasks.js';
export default {
    data: function () {
        return {
            taskModle: {},
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '后天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title:"the first thing",
                    due_date:"123213123",
                    status:"asd"
                },
                {
                    title:"the first thing",
                    due_date:"123213123",
                    status:"asd"
                },
                {
                    title:"the first thing",
                    due_date:"123213123",
                    status:"asd"
                },
            ],
            doneList: [],
            deletedialogVisible: false,
            delTaskId: '',
            index: '',
            updatedialogVisible: false,
            editTaskId: '',
            editContent: '',
            editDuetime: '',
            listType: '',
        };
    },
    methods: {
        formatDate(isoString) {
            const date = new Date(isoString);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
            let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        addOp() {
            let info = {
                "title": this.taskModle.content,
                "due_date": this.taskModle.duetime
            }
            addTask(info).then((res) => {
                if (res.id !== undefined) {
                    this.$message({
                        message: '任务新增成功',
                        type: 'success'
                    });
                    this.taskModle.content = '';
                    this.taskModle.duetime = '';
                    this.todoList.push(res);
                } else {
                    this.$message({
                        message: '任务新增失败',
                        type: 'error'
                    });
                }
            });
        },
        getTodoListOp() {
            getTodoList().then((res) => {
                this.todoList = res
            });
        },
        getDoneListOp() {
            getDoneList().then((res) => {
                this.doneList = res
            });
        },
        updateStatus1(index, todoItem) {
            if (todoItem._completed) {
                completeTask(todoItem.id).then((res) => {
                    if (res === "任务已标记为完成") {
                        this.$message({
                            message: `任务 ${todoItem.title} 已完成`,
                            type: 'success'
                        });
                        todoItem._completed = true;
                        this.doneList.push(todoItem);
                        this.todoList.splice(index, 1);
                        // newDoneTask(todoItem.id).then((res) => {
                        //     if (res.result == '1') {
                        //         console.log(`任务 ${todoItem.id} 已完成`);
                        //     }
                        // });
                    } else {
                        this.$message({
                            message: '发生错误',
                            type: 'error'
                        });
                    }
                });
            }
        },
        updateStatus2(index, todoItem) {
            if (!todoItem._completed) {
                uncompleteTask(todoItem.id).then((res) => {
                    if (res === "任务已取消标记为完成") {
                        this.$message({
                            message: `任务 ${todoItem.title} 已标记为未完成`,
                            type: 'success'
                        });
                        todoItem._completed = false;
                        this.todoList.push(todoItem);
                        this.doneList.splice(index, 1);
                        // newTodoTask(todoItem.id).then((res) => {
                        //     if (res.result == '1') {
                        //         console.log(`任务 ${todoItem.id} 已完成`);
                        //     }
                        // });
                    } else {
                        this.$message({
                            message: '发生错误',
                            type: 'error'
                        });
                    }
                });
            }
        },
        editOp(todoItem, listType) {
            this.updatedialogVisible = true;
            this.editTaskId = todoItem.id;
            this.listType = listType;
            if (todoItem.title) {
                this.editContent = todoItem.title;
            }
            if (todoItem.due_date) {
                this.editDuetime = todoItem.due_date;
            }
        },
        modfieData() {
            let info = {
                "taskId": this.editTaskId,
                "title": this.editContent,
                "due_date": this.editDuetime,
                "_completed": this.listType === 'todo' ? false : true
            };
            updateTaskInfo(info).then(res => {
                if (res === "修改成功") {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });

                    let updatedIndex = -1;
                    if (this.listType === 'todo') {
                        updatedIndex = this.todoList.findIndex(task => task.id === this.editTaskId);
                        if (updatedIndex !== -1) {
                            this.todoList[updatedIndex].title = this.editContent;
                            this.todoList[updatedIndex].due_date = this.editDuetime;
                        }
                    } else if (this.listType === 'done') {
                        updatedIndex = this.doneList.findIndex(task => task.id === this.editTaskId);
                        if (updatedIndex !== -1) {
                            this.doneList[updatedIndex].title = this.editContent;
                            this.doneList[updatedIndex].due_date = this.editDuetime;
                        }
                    }

                    // 关闭对话框并清除数据
                    this.updatedialogVisible = false;
                    this.editTaskId = '';
                    this.editContent = '';
                    this.editDuetime = '';
                } else {
                    this.$message({
                        message: '修改失败',
                        type: 'error'
                    });
                    this.updatedialogVisible = false;
                }
            });

        },
        delOp(index, todoItem, listType) {
            this.deletedialogVisible = true;
            this.delTaskId = todoItem.id;
            this.index = index;
            this.listType = listType;
        },
        handledelete() {
            let info = {
                "taskId": this.delTaskId
            };
            deleteTask(info).then((res) => {
                if (res === "删除成功") {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    if (this.listType === 'todo') {
                        // 从待办列表中删除
                        this.todoList.splice(this.index, 1);
                    } else if (this.listType === 'done') {
                        // 从已完成列表中删除
                        this.doneList.splice(this.index, 1);
                    }

                    //  如果删除成功，再让对话框消失
                    this.deletedialogVisible = false;
                    // 并将全局变量设置为空，供下一次删除使用
                    this.delTaskId = '';
                    this.index = '';
                } else {
                    this.deletedialogVisible = false;
                    // 如果删除失败，则弹出对话框删除失败
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                }
            });
        }
    },
    created() {
        this.getTodoListOp();
        this.getDoneListOp();
    }
};
</script>

<style>
.el-card {
    margin-bottom: 20px;
}

.tasks-container {
    padding: 10px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.center-col {
    justify-content: center;
    display: flex;
    align-items: center;
}
</style>