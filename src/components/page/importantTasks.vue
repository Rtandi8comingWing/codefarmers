<template>
    <div class="importantcontainer">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>Important Tasks</span>
                <el-button style="float: right" type="primary" @click="drawer = true" >添加</el-button>
            </div>
            <el-table :show-header="true" :data="importantList" style="width: 100%" height="600">
                <el-table-column width="40">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.status" @change="updateStatus1(scope.$index, scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="180"> </el-table-column>
                <el-table-column prop="content" label="Content" width="500"> </el-table-column>
                <el-table-column prop="duetime" label="Duetime" width="300"> </el-table-column>

                <el-table-column label="Edit">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editOp(scope.row)"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="Delete">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-delete" circle @click="delOp(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-drawer title="add your important tasks!" :visible.sync="drawer" :with-header="true">
            <div slot="header" class="clearfix">
                <span>Important Tasks</span>
                <el-button style="float: right" type="primary" @click="drawer = true">添加</el-button>
            </div>
            <el-table :show-header="true" :data="todoList" style="width: 100%" height="600">
                <el-table-column width="60">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-plus" circle @click="addintoOp(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="180"> </el-table-column>
                <el-table-column prop="content" label="Content"> </el-table-column>
            </el-table>
        </el-drawer>

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
import { getTodoList, getImportantList, addimpotant } from '../../api/tasks.js';
export default {
    data: function () {
        return {
            name: localStorage.getItem('ms_username'),
            importantList: [
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
            todoList: [],
            drawer: false,
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
        getImportantListOp(name) {
            let info = {
                "name": name
            };
            getImportantList(info).then((res) => {
                this.importantList = res.rows;
            });
        },
        getTodoListOp(name) {
            let info = {
                "name": name
            };
            getTodoList(info).then((res) => {
                this.todoList = res.rows;
            });
        },
        addintoOp(index, Item) {
            addimpotant(Item.id).then((res) => {
                if (res.result == '1') {
                    this.$message({
                        message: 'Task add successfully',
                        type: 'success'
                    });
                    this.importantList.splice(index, 1);
                } else {
                    this.$message({
                        message: 'Task add unsuccessfully',
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
            console.log(todoItem);
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
        getImportantListOp(this.name),
        getTodoListOp(this.name)
    }
};
</script>

<style>
.importantcontainer {
    padding: 10px;
}
</style>