<template>
    <div class="importantcontainer">
        <el-card shadow="hover">
            <div slot="header" class="clearfix" style="font-size:25px;">
                <span>Important Tasks</span>
                <el-button style="float: right" type="primary" @click="drawer = true">Add important tasks</el-button>
            </div>
            <el-table :show-header="true" :data="filteredList" style="width: 100%;font-size:16px;" height="600">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row._completed"
                            @change="updateStatus1(scope.$index, scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="100"> </el-table-column>
                <el-table-column prop="title" label="Content" width="500"></el-table-column>
                <el-table-column label="Duetime" width="300">
                    <template slot-scope="scope">
                        <span>{{ formatDate(scope.row.due_date)}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Edit">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editOp(scope.row)"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="Delete">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle
                            @click="delOp(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-drawer title="add your important tasks!" :visible.sync="drawer" :with-header="true">
            <div slot="header" class="clearfix">
                <span>Important Tasks</span>
                <el-button style="float: right" type="primary" @click="drawer = true">Add</el-button>
            </div>
            <el-table :show-header="true" :data="todoList" style="width: 100%" height="600">
                <el-table-column width="60">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-plus" circle @click="addintoOp(scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="Task" width="70"> </el-table-column>
                <el-table-column prop="title" label="Title"> </el-table-column>
            </el-table>
        </el-drawer>

        <el-dialog title="Edit" :visible.sync="updatedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- Edit Content -->
                    <el-input v-model="editContent" style="margin-bottom:20px"></el-input>
                    <el-date-picker v-model="editDuetime" type="datetime" placeholder="Select Date and Time" align="right"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatedialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="modfieData()">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Delete" :visible.sync="deletedialogVisible" width="30%">
            <el-row>
                <el-col>
                    <!-- Edit Content -->
                    Are you sure you want to delete?
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deletedialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handledelete()">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getTodoList, getImportantList, completeTask, uncompleteTask, addimpotant, getNormalList } from '../../api/tasks.js';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
export default {
    computed: {
        filteredList() {
            return this.importantList.filter(item => !item._completed);
        }
    },
    data: function () {
        return {
            name: localStorage.getItem('ms_username'),
            importantList: [],
            todoList: [],
            drawer: false,
            deletedialogVisible: false,
            delTaskId: '',
            index: '',
            updatedialogVisible: false,
            editTaskId: '',
            editContent: '',
            editDuetime: ''
        };
    },
    methods: {
        formatDate(isoString) {
            const date = new Date(isoString);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        getImportantListOp() {
            getImportantList().then((res) => {
                this.importantList = res;
            });
        },
        getNormalListOp() {
            getNormalList().then((res) => {
                this.todoList = res;
            });
        },
        addintoOp(Item) {
            addimpotant(Item.id).then((res) => {
                if (res === '任务已标记为重要') {
                    this.$message({
                        message: 'The task has been marked as important',
                        type: 'success'
                    });
                    this.getNormalListOp();
                    this.getImportantListOp();
                } else {
                    this.$message({
                        message: 'Task add unsuccessful',
                        type: 'error'
                    });
                }
            });
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
                // 2. Show feedback based on the result
                if (res.result === '修改成功') {
                    this.$message({
                        message: 'Modification successful',
                        type: 'success'
                    })
                    // 3. If the modification is successful, make the dialog disappear
                    this.updatedialogVisible = false;
                    this.editTaskId = '';
                    this.editContent = '';
                    this.editDuetime = '';
                }
            });
        },
        delOp(index, todoItem) {
            console.log(todoItem);
            this.deletedialogVisible = true;
            this.delTaskId = todoItem.id;
            this.index = index;
        },
        updateStatus1(index, todoItem) {
            if (todoItem._completed) {
                completeTask(todoItem.id).then((res) => {
                    if (res === "任务已标记为完成") {
                        this.$message({
                            message: `Task ${todoItem.title} completed`,
                            type: 'success'
                        });
                        // todoItem._completed = true;
                        this.getImportantListOp();
                        // newDoneTask(todoItem.id).then((res) => {
                        //     if (res.result == '1') {
                        //         console.log(`Task ${todoItem.id} completed`);
                        //     }
                        // });
                    } else {
                        this.$message({
                            message: 'Error occurred',
                            type: 'error'
                        });
                    }
                });
            }
        },
        handledelete() {
            let info = {
                "taskId": this.delTaskId
            };
            deleteTask(info).then((res) => {
                if (res === '删除成功') {
                    this.$message({
                        message: 'Deletion successful',
                        type: 'success'
                    });
                    this.todoList.splice(this.index, 1);
                    //  If the deletion is successful, make the dialog disappear
                    this.deletedialogVisible = false;
                    // And set the global variables to empty for the next deletion
                    this.delTaskId = '';
                    this.index = '';
                } else {
                    this.deletedialogVisible = false;
                    // If the deletion fails, pop up a dialog box to indicate deletion failure
                    this.$message({
                        message: 'Deletion failed',
                        type: 'error'
                    });
                }
            });
        }
    },
    created() {
        this.getImportantListOp()
        this.getNormalListOp()
    }
};
</script>

<style>
.importantcontainer {
    padding: 10px;
}
</style>