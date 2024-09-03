<template>
	<div>
		<TeacherHeadBar></TeacherHeadBar>
		<el-container>
			<el-aside width="20%" style="min-height: 600px;">
				<TeacherMenu></TeacherMenu>
			</el-aside>
			<el-main width="75%">
				<div class="title">学生注册申请</div>
				<div style="margin: 0 auto; margin-top: 20px; align-items: center;">
					<el-card class="box-card" style="width: 80%">
						<el-table :data="table_data" style="width: 100%" border>
							<el-table-column align="center" prop="name" label="学生姓名"></el-table-column>
							<el-table-column align="center" prop="studentId" label="学号"></el-table-column>
							<el-table-column align="center" prop="college" label="学院"></el-table-column>
							<el-table-column align="center" prop="email" label="邮箱" min-width="100"></el-table-column>
							<el-table-column align="center" prop="phone" label="手机号"></el-table-column>
							<el-table-column align="center" label="操作" min-width="130">
								<template #default="scope">
									<el-button size="mini" type="primary" plain @click="handleAccept(scope.row)">同意</el-button>
									<el-button size="mini" type="danger" plain @click="handleReject(scope.row)">拒绝</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</div>
			</el-main>
			<el-aside width="5%"></el-aside>
		</el-container>
	</div>
</template>

<script>
import axios from "axios";
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
import { ElMessage } from "element-plus";
export default {
	inject: ['reload'],
	components: { TeacherHeadBar, TeacherMenu },
	mounted() {
		axios.get('/user/register',).then(res => {
			this.table_data = res.data.data;
		}).catch(err => {
			ElMessage.error("获取数据失败: " + err);
		})
	},
	data() {
		return {
			reject_dialog: false,
			accept_dialog: false,
			choose_data: {},
			table_data: [
				// {
				// 	id: "",
				// 	name: "",
				// 	studentId: "",
				// 	phone: "",
				// 	email: "",
				// 	college: "",
				// }
			]
		};
	},
	methods: {
		handleAccept(row) {
			this.accept_dialog = true;
			this.choose_data = row;
			this.handleConfirm('accept')
		},
		handleReject(row) {
			this.reject_dialog = true;
			this.choose_data = row;
			this.handleConfirm('reject')
		},
		handleConfirm(op) {
			let formdata = new FormData();
			formdata.append('qid', this.choose_data.id);
			formdata.append('op', op);
			axios.post('user/register/verify', formdata
			).then(resp => {
				ElMessage.success(resp.data.msg);
				this.reload();
			}).catch(err => {
				ElMessage.error(err);
			})
		}
	}
};
</script>

<style scoped>
.box-card {
	margin-left: 100px;
}

.title {
	color: rgb(225, 162, 80);
	margin-bottom: 40px;
	font-family: 微软雅黑;
	word-wrap: break-word;
	/* text-align: left; */
	font-size: 25px;
	font-weight: bold;
}
</style>