<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 基础表格
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<!--新增-->
				<el-row>
					<el-col :span="5">
						<el-button type="primary" @click="handleAdd">新增</el-button>
					</el-col>
				</el-row>
		
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="用户名"></el-table-column>
				<el-table-column label="账户余额">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 编辑新增框-->
		<el-dialog title="新增" :visible.sync="addVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveAdd">确 定</el-button>
			</span>
		</el-dialog>
		<el-row>
			<el-col :span="10">
				<schart class="schart" canvasId="ring" :options="optionSex"></schart>
			</el-col>
		</el-row>
	</div>
	<!--图表-->

</template>

<script>
	import Schart from 'vue-schart';
	import {
		saveAdd,
		fetchData
	} from '../../api/tableOptions.js';
	export default {
		name: 'basetable1',
		data() {
			return {
				optionSex: {
					type: 'ring',
					title: {
						text: '男女比例'
					},
					showValue: false,
					bgColor: '#fbfbfb',
					labels: ['男'],
					datasets: [{
						data: [10]
					}]
				},
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				addVisible: false,
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1
			};
		},
		components: {
			Schart
		},
		created() {
			this.getData();
		},
		methods: {
			//处理新增数据
			handleAdd() {
				this.addVisible = true;
			},
			//新增数据
			saveAdd() {
				saveAdd(this.form).then(res => {
					if (res.status == "ok") {
						this.$message.success(`成功`);
						this.form = {};
						this.addVisible = false;
					}
				})
			},
			// 查询数据
			getData() {
				fetchData().then(res => {
					this.tableData = res.list;
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'pageIndex', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
	.schart {
	    width: 100%;
	    height: 300px;
	}
</style>