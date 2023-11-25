<template>
	<div>
		<el-row :gutter="20">
			<!-- 表格 -->
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<!--呈现前十时间端的异常数据 -->
					<el-table :data="exceptionInfo" style="width: 100%">
						<el-table-column prop="date" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
					</el-table>
				</div>
			</el-col>
			<!-- 图标 -->
			<el-col :span="12" >
				<el-card shadow="hover">
				   <!-- 环形图 -->
				    <schart class="schart" canvasId="ring" :options="optionSex"></schart>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Schart from 'vue-schart';
	import bus from '../common/bus';
	import  {fetchExceptionData,getSex} from '../../api/index.js'
	import { login } from '../../api/tasks.js';
	export default {
		name: 'dashboard',
		data() {
			return {
				        exceptionInfo: [],
						optionSex: {
						    type: 'ring',
						    title: {
						        text: '男女比例'
						    },
						    showValue: false,
						    bgColor: '#fbfbfb',
						    labels: [],
						    datasets: [
						        {
						            data: []
						        }
						    ]
						}
			};
		},
		components: {
			Schart
		},
		created() {
			this.fetchExceptionData();
			this.getSex();
		},
		computed: {

		},
		// created() {
		//     this.handleListener();
		//     this.changeDate();
		// },
		// activated() {
		//     this.handleListener();
		// },
		// deactivated() {
		//     window.removeEventListener('resize', this.renderChart);
		//     bus.$off('collapse', this.handleBus);
		// },
		methods: {
			//构建加载异常数据的方法
			fetchExceptionData() {
				//做请求
				fetchExceptionData().then(res => {
				   this.exceptionInfo = res.listEXdata;
				});
			},
			//呈现图表
			getSex() {
				//做请求
				getSex().then(res => {
				   this.optionSex.labels = res.info;
				   this.optionSex.datasets[0].data = res.sex;
				});
			}

			// handleListener() {
			//     bus.$on('collapse', this.handleBus);
			//     // 调用renderChart方法对图表进行重新渲染
			//     window.addEventListener('resize', this.renderChart);
			// },
			// handleBus(msg) {
			//     setTimeout(() => {
			//         this.renderChart();
			//     }, 200);
			// },
			// renderChart() {
			//     this.$refs.bar.renderChart();
			//     this.$refs.line.renderChart();
			// }
		}
	};
</script>


<style scoped>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
.schart {
    width: 100%;
    height: 300px;
}
</style>