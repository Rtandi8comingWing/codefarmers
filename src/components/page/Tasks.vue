<template>
    <div class="tasks-container">
        <el-card>
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
                    <el-button type="primary" icon="el-icon-plus" circle @click="addOp"></el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>待办事项</span>
                <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
            <el-table :show-header="true" :data="todoList" style="width: 100%" height="300">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.status" @change="updateStatus1(scope.$index, scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="180"> </el-table-column>
                <el-table-column prop="content" label="任务内容" width="500"> </el-table-column>
                <el-table-column prop="duetime" label="姓名" width="300"> </el-table-column>
                <!-- <template slot-scope="scope">
                        <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">{{ scope.row.title }}</div>
                    </template> -->

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
        </el-card>

        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>已完成事项</span>
                <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
            <el-table :show-header="true" :data="doneList" style="width: 100%" height="300">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.status" @change="updateStatus2(scope.$index, scope.row)"></el-checkbox>
                    </template>
                </el-table-column>

                <el-table-column type="index" label="#" width="180" class-name="todo-item-del"> </el-table-column>
                <el-table-column label="任务内容" width="500">
                    <template slot-scope="scope">
                        <div class="todo-item-del">{{ scope.row.content }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="300">
                    <template slot-scope="scope">
                        <div class="todo-item-del">{{ scope.row.duetime }}</div>
                    </template>
                </el-table-column>

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
        </el-card>

        <el-dialog title="修改" :visible.sync="updatedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- 修改内容 -->
                    <el-input v-model="editContent" style="margin-bottom:20px"></el-input>
                    <el-date-picker
                        v-model="editDuetime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modfieData()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="删除" :visible.sync="deletedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- 修改内容 -->
                    您确定要删除吗？
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deletedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handledelete()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addTask, getTodoList, getDoneList, completeTask, uncompleteTask, updateTaskInfo, deleteTask } from '../../api/tasks.js';
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
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                }
            ],
            doneList: [
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                },
                {
                    content: '选项1',
                    duetime: '今天'
                }
            ],
            deletedialogVisible: false,
            delTaskId: '',
            index: '',
            updatedialogVisible: false,
            editTaskId : '',
            editContent : '',
            editDuetime : ''
        };
    },
    methods: {
        addOp() {
            addTask(this.taskModle).then((res) => {
                if (res.result == '1') {
                    this.$message({
                        message: '任务新增成功',
                        type: 'success'
                    });
                    this.taskModle.content = '';
                    this.taskModle.duetime = '';
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
                console.log(res.data)
                this.todoList = res.data;
            });
        },
        getDoneListOp(name) {
            let info = {
                "name": name
            };
            getDoneList(info).then((res) => {
                this.doneList = res.rows;
            });
        },
        updateStatus1(index, todoItem) {
            if (todoItem.status) {
                completeTask(todoItem.id).then((res) => {
                    if (res.result == '1') {
                        console.log(`任务 ${todoItem.id} 已完成`);
                        this.$message({
                            message: '任务 ${todoItem.id} 已完成',
                            type: 'success'
                        });
                        this.todoList.splice(index, 1);
                        // newDoneTask(todoItem.id).then((res) => {
                        //     if (res.result == '1') {
                        //         console.log(`任务 ${todoItem.id} 已完成`);
                        //     }
                        // });
                    } else {
                        this.$message({
                            message: '任务 ${todoItem.id} 已完成',
                            type: 'error'
                        });
                    }
                });
            }
        },
        updateStatus2(index, todoItem) {
            if (!todoItem.status) {
                uncompleteTask(todoItem.id).then((res) => {
                    if (res.result == '1') {
                        console.log(`任务 ${todoItem.id} 未完成`);
                        this.$message({
                            message: '任务 ${todoItem.id} 未完成',
                            type: 'success'
                        });
                        this.doneList.splice(index, 1);
                        // newTodoTask(todoItem.id).then((res) => {
                        //     if (res.result == '1') {
                        //         console.log(`任务 ${todoItem.id} 已完成`);
                        //     }
                        // });
                    } else {
                        this.$message({
                            message: '任务 ${todoItem.id} 已完成',
                            type: 'error'
                        });
                    }
                });
            }
        },
        editOp(todoItem) {
            this.updatedialogVisible = true;
            this.editTaskId = todoItem.id;
            this.editContent = todoItem.content;
            this.editDuetime = todoItem.duetime;
        },
        modfieData() {
            let info = {
                "taskId": this.editTaskId,
                "taskContent": this.editContent,
                "taskDuetime": this.editDuetime,
            };
            updateTaskInfo(info).then(res => {
					// 2. 根据反馈的结果进行提示
					if (res.result == 1) {
						this.$message({
							message: '修改成功',
							type: 'success'
						})
						// 3. 如果修改成功，再让对话框消失
						this.updatedialogVisible = false;
						this.editTaskId = '';
						this.editContent = '';
						this.editDuetime = '';
					}
				});
        },
        delOp(index, todoItem) {
            this.deletedialogVisible = true;
            this.delTaskId = todoItem.id;
            this.index = index;
        },
        handledelete() {
            let info = {
                "taskId": this.delTaskId
            };
            deleteTask(info).then((res) => {
                if (res.result == 1) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.todoList.splice(this.index, 1);
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
        // this.getDoneListOp(this.name);
    }
};
</script>

<style>
.el-card {
    margin-bottom: 20px;
}
#task {
    width: 780px;
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
</style>