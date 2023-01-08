<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title">待审批借用申请</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 100%">
              <el-table :data="borrowList" style="width: 100%" border>
                <el-table-column align="center" prop="toolName" label="工具名称" min-width="110"></el-table-column>
                <el-table-column align="center" prop="borrowCount" label="借用数量" min-width="110"></el-table-column>
                <el-table-column align="center" label="借用者信息" min-width="110">
                  <template slot-scope="scope">
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
                <el-table-column align="center" label="操作" min-width="180">
                  <template slot-scope="scope">
                    <el-popover
                      placement="left"
                      width="250"
                      trigger="click">
                      <div >借用目的: {{ scope.row.purpose }}:</div>
                      <el-button style="margin-right:10px;" size="mini" plain slot="reference" type="primary">查看目的</el-button>
                    </el-popover>
                    <el-button
                      size="mini"
                      type="success"
                      plain
                      @click="handleCreate2()">同意借出</el-button>

                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      @click="handleCreate()">拒绝借出</el-button>

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
                        <el-button type="primary" @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
                      </div>
                    </el-dialog>

                    <el-dialog :visible.sync="dialogFormVisible2">
                      <el-form
                        :model="formAgree"
                        ref="dataForm"
                        label-position="left"
                        label-width="120px"
                        align="left"
                        style="width: 600px; margin-left:50px;">

                        <el-form-item label="领取工具日期">
                          <template>
                            <el-date-picker
                              v-model="formAgree.getDate"
                              format="yyyy年MM月dd日"
                              value-format="yyyy-MM-dd"
                              align="left"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions">
                            </el-date-picker>
                          </template>
                        </el-form-item>
                        <el-form-item label="领取工具时间">
                          <template>
                            <el-time-select
                              placeholder="起始时间"
                              v-model="startTime"
                              :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '18:30'
                              }">
                            </el-time-select>
                            <el-time-select
                              placeholder="结束时间"
                              v-model="endTime"
                              :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '22:30',
                                minTime: startTime
                              }">
                            </el-time-select>
                          </template>
                        </el-form-item>
                        
                        <el-form-item label="领取工具地点">
                          <el-input type="textarea" style="width:90%" :rows="1" v-model="formAgree.address" placeholder="请输入领取工具地点"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取消</el-button>
                        <el-button type="primary" @click="handleAgree(scope.$index, scope.row)">借出</el-button>
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
      startTime: '',
      endTime: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formData:{
        refuseReason:"",
      },
      formAgree:{
        address:"",
        getDate: "",
      },
      borrowList: [
        {
          toolName: "",
          requestUserName:"",
          startTime:"",
          borrowTime: "",
          returnTime: "",
          stuid:"",
          stuCollege:"",
          userId:"",
          phoneNumber: "",
          purpose: "",
          stuEmail: "",
          borrowCount: "",
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
    handleCreate2() {
      this.formAgree = {
        address:"工程训练中心南208",
      },
      this.dialogFormVisible2 = true;
    },
    handleAgree(index, row) {
      console.log(index, row);
      axios({
					url: 'http://121.4.160.157/manager/approveBorrowRequest',
					method: 'post',
					data: {
            requestId: row.requestId,
            status: "Accept",
            isChangeTime: "false",
            changeTime: "",
            refuseReason: "",
            getDate: this.formAgree.getDate,
            startTime: this.startTime,
            endTime: this.endTime,
            address: this.formAgree.address,
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("已同意借用申请", response.data);
              alert("已同意该同学的借用申请，该设备最晚于" + row.returnTime + "归还");
              this.reload()
						} else if (response.data.error_code === 5){
              alert("该设备数量不足，请拒绝该申请！");
            }else {
							console.log("审批失败" + response.data);
							alert("error: " + response.data.error_code);
						}
					} else {
						console.log("error" + response.data);
						alert("error" + response.data.error_code);
					}
				});
    },
    handleRefuse(index, row) {
      console.log(this.formData.refuseReason);
      axios({
					url: 'http://121.4.160.157/manager/approveBorrowRequest',
					method: 'post',
					data: {
            requestId: row.requestId,
            status: "Refuse",
            isChangeTime: "false",
            changeTime: null,
            refuseReason: this.formData.refuseReason,
            getDate: "",
            startTime: "",
            endTime: "",
            address: "",
					}
				}).then((response) => {
					if (response) {
            console.log("rejectpurpose: ",this.formData.refuseReason);
						if (response.data.error_code === 0) {
							console.log("已拒绝该申请", response.data);
              alert("已拒绝该申请");
              this.reload()
						} else {
							console.log("审批失败" + response.data);
							alert("error: " + response.data.error_code);
						}
					} else {
						console.log("审批失败，请检查网络" + response.data);
						alert("审批失败，请检查网络");
					}
				});
    },
    loadMessage() {
				let that = this;
				axios({
					url: 'http://121.4.160.157/manager/getToolRequestList',
					method: 'post',
					data: {
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("获取成功", response.data);
              that.borrowList = response.data.dataList;
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
  .title {
    color: rgb(225, 162, 80);
    margin-bottom: 40px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    font-size: 25px;
    font-weight: bold;
  }
</style>
