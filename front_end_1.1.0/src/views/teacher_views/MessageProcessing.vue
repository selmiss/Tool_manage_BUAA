<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title">待审批延期归还申请</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 100%">
            <el-table 
                :data="renewList"
                style="width: 100%"
                border>
              <el-table-column align="center" prop="toolName" label="工具名称" min-width="100"></el-table-column>
              <el-table-column align="center" label="借用者信息" min-width="100">
                <template #default="scope">
                  <el-popover
                    placement="bottom"
                    width="250"
                    trigger="hover">
                    <div>{{ scope.row.requestUserName }} &nbsp &nbsp &nbsp {{ scope.row.stuid }}</div>
                    <div >学院: &nbsp &nbsp &nbsp &nbsp {{ scope.row.stuCollege }}</div>
                    <div >联系邮箱: &nbsp{{ scope.row.stuEmail }}</div>
                    <div >联系电话: &nbsp{{ scope.row.phoneNumber }}</div>
                    <el-button size="mini" slot="reference">{{ scope.row.requestUserName }}</el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="startTime" label="借用开始时间" min-width="100"></el-table-column>
              <el-table-column align="center" prop="returnTime" label="原定归还时间" min-width="100"> </el-table-column>
              <el-table-column align="center" prop="postPoneTime" label="延期归还时间" min-width="100"> </el-table-column>
              <el-table-column align="center" label="操作" min-width="200">
                <template #default="scope">
                  <el-popover
                    placement="left"
                    width="250"
                    trigger="click">
                    <div >延期目的: {{ scope.row.postponePurpose }}:</div>
                    <el-button style="margin-right:10px;" size="mini" plain slot="reference" type="primary">查看</el-button>
                  </el-popover>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="handleAgree(scope.row)">同意</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="handleCreate()">拒绝</el-button>

                    <el-dialog :visible.sync="dialogFormVisible">
                      <el-form
                        :model="formData"
                        ref="dataForm"
                        label-position="left"
                        label-width="80px"
                        style="width: 300px; margin-left:50px;">
                        <el-form-item label="拒绝原因">
                          <el-input type="textarea" :rows="2" v-model="formData.refuseReason" placeholder="请输入拒绝原因"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleRefuse(scope.row)">确定</el-button>
                      </div>
                    </el-dialog>

                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-main>
      <el-aside width="5%">
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
export default {
  inject: ['reload'],
  components:{TeacherHeadBar,TeacherMenu},
  mounted() {
    this.loadMessage()
  },
  data() {
    return {
      dialogFormVisible: false,
      formData:{
          refuseReason:"",
      },
      renewList: [
        {
          toolName: "",
          requestUserName:"",
          startTime:"",
          borrowTime: "",
          returnTime: "",
          postPoneTime: "",
          stuid:"",
          stuCollege:"",
          userId:"",
          phoneNumber: "",
          stuEmail: "",
          postponePurpose: "",
          requestId: "",
        }
      ],
    };
  },
  methods: {
    handleCreate() {
      this.formData = {
        refuseReason: "",
      },
      this.dialogFormVisible = true;
    },
    handleAgree(row) {
      axios({
					url: 'manager/approvePostponeRequest',
					method: 'post',
					data: {
            requestId: row.requestId,
            status: "Accept",
            refuseReason:"",
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
              alert("已同意延期申请，该设备最晚于" + row.postPoneTime + "归还");
              this.reload()
						} else {
							console.log("error" + response.data.error_code);
							alert("error" + response.data.error_code);
						}
					} else {
						console.log("审批失败，请检查网络");
						alert("审批失败，请检查网络");
					}
				});
    },
    handleRefuse(row) {
      axios({
					url: 'manager/approvePostponeRequest',
					method: 'post',
					data: {
            requestId: row.requestId,
            status: "Refuse",
            refuseReason: this.formData.refuseReason,
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("已拒绝该申请", response.data);
              alert("已拒绝该申请");
              this.reload()
						} else {
							console.log("error" + response.data.error_code);
							alert("error" + response.data.error_code);
						}
					} else {
						console.log("审批失败，请检查网络");
						alert("审批失败，请检查网络");
					}
				});
    },
    loadMessage() {
				let that = this;
				axios({
					url: 'manager/getPostponeRequestList',
					method: 'post',
					data: {
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("获取成功", response.data);
              that.renewList = response.data.data_list;
						} else {
							console.log("获取失败" + response.data);
							alert("获取失败，请检查网络");
						}
					} else {
						console.log("获取失败" + response.data);
						alert("获取失败，请检查网络");
					}
				});
		},
  }
};
</script>

<style scoped>
  .box-card{
    /* margin-right: 10px; */
  }
  .title {
    color: rgb(225, 162, 80);
    margin-bottom: 40px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    font-size: 25px;
    font-weight: bold;
  }
</style>
