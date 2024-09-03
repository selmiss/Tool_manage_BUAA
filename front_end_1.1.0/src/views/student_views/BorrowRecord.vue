<template>
  <div>
    <head-bar></head-bar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;">
        <StudentMenu></StudentMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title" style="margin-top: 20px">工具借用记录表</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 80%">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column align="center" prop="toolName" label="工具名称" min-width="120"></el-table-column>
              <el-table-column align="center" prop="startTime" label="借用开始时间" min-width="100"></el-table-column>
              <el-table-column align="center" prop="returnTime" label="最晚归还时间" min-width="100"> </el-table-column>
              <el-table-column align="center" label="状态" min-width="120">
                <template #default="scope">
                  <el-button v-if="scope.row.status === 'A'" size="mini" type="warning">工具借用中</el-button>
                  <el-button v-if="scope.row.status === 'W'" size="mini" type="primary">等待审核中</el-button>
                  <el-button v-if="scope.row.status === 'R'" size="mini" type="danger">申请被拒绝</el-button>
                  <el-button v-if="scope.row.status === 'F'" size="mini" type="success">工具已归还</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="借用信息" min-width="120">
                <template #default="scope">
                  <el-popover trigger="hover" placement="bottom" width="250">
                    <template #default>
                      <div>领取信息</div>
                      <div>地址: &nbsp &nbsp &nbsp &nbsp {{ scope.row.address }} </div>
                      <div>日期: &nbsp &nbsp &nbsp &nbsp {{ scope.row.getdate }}</div>
                      <div>开始时间: &nbsp {{ scope.row.sttime }}</div>
                      <div>结束时间: &nbsp {{ scope.row.endtime }}</div>
                    </template>
                    <template #reference>
                      <el-button size="mini" v-show="scope.row.status === 'A'" slot="reference">领取信息</el-button>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="120">
                <template #default="scope">
                  <el-button v-if="scope.row.status === 'A'" size="mini" type="primary" plain
                    @click="handleCreate(scope.row)">申请续借</el-button>
                  <el-button v-if="scope.row.status === 'W'" size="mini" type="warning" plain
                    @click="withdraw(scope.row)">撤销申请</el-button>
                  <el-button v-if="scope.row.status === 'R'" size="mini" type="info" plain disabled
                    @click="handleCreate()"></el-button>
                  <el-button v-if="scope.row.status === 'F'" size="mini" type="info" plain disabled
                    @click="handleCreate()"></el-button>
                  <el-dialog v-model="dialogFormVisible">
                    <el-form :model="formData" ref="dataForm" label-position="left" label-width="80px"
                      style="width: 300px; margin-left:50px;">
                      <el-form-item label="续借原因" prop="purpose">
                        <el-input type="textarea" :rows="2" v-model="formData.purpose"></el-input>
                      </el-form-item>
                      <el-form-item label="续借日期">
                        <el-date-picker v-model="formData.postponeTime" format="YYYY年MM月DD日" value-format="YYYY-MM-DD"
                          align="left" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取消</el-button>
                      <el-button type="primary" @click="handleRenew()">确定</el-button>
                    </div>
                  </el-dialog>


                  <el-dialog v-model="dialogRepealVisible">
                    <el-form :model="RepealData" ref="RepealForm" label-position="left" label-width="80px"
                      style="width: 300px; margin-left:50px;">
                      <el-form-item label="撤销原因" prop="purpose">
                        <el-input type="textarea" :rows="2" v-model="formData.purpose"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="closeWindow">取消</el-button>
                      <el-button type="primary" @click="RepealRenew()">确定</el-button>
                    </div>
                  </el-dialog>
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
import HeadBar from "@/components/HeadBar";
import StudentMenu from "@/components/StudentMenu";
// import { Loading } from "element-ui";
export default {
  inject: ['reload'],
  components: { HeadBar, StudentMenu },
  mounted() {
    this.loadMessage()
  },
  data() {
    return {
      loading: true,
      rowStore: null,
      pickerOptions: {
        disabledDate(time) {
          return (time.getTime() < Date.now());
        },
        shortcuts: [{
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
          text: '一个月后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }]
      },
      dialogRepealVisible: false,
      dialogFormVisible: false,
      formData: {
        purpose: "",
        postponeTime: "",
      },
      RepealData: {
        purpose: "",
      },
      tableData: [
        {
          toolName: "",
          startTime: "",
          returnTime: "",

          address: "",
          sttime: "",  //借用当天开始领取的时间
          endtime: "",
          getdate: "",

          requestId: "",
          status: "",
        },
      ],
    };
  },
  methods: {
    handleCreate(row) {
      this.rowStore = row;
      this.formData = {
        purpose: "",
        postponeTime: "",
      },
        this.dialogFormVisible = true;
    },
    withdraw(row) {
      this.rowStore = row
      this.dialogRepealVisible = true;
    },
    handleRenew() {
      var row = this.rowStore;
      console.log("续借时间", this.formData.postponeTime);
      axios({
        url: 'user/applyPostpone',
        method: 'post',
        data: {
          uid: localStorage.getItem('uid'),
          requestId: row.requestId,
          postponeTime: this.formData.postponeTime,
          purpose: this.formData.purpose,
        }
      }).then((response) => {
        if (response) {
          if (response.data.error_code === 0) {
            console.log("已申请续借，请等待教师审批", response.data);
            alert("已申请续借,请等待教师审批,审批信息将通过邮件通知!");
            this.reload();
          } else {
            console.log("error" + response.data);
            alert("error" + response.data);
          }
        } else {
          console.log("申请失败，请检查网络");
          alert("申请失败，请检查网络");
        }
      });
      this.closeWindow();
    },
    closeWindow() {
      this.RepealData = {
        purpose: "",
      },
        dialogRepealVisible = false

    },
    RepealRenew() {
      var row = this.rowStore;
      axios({
        url: 'user/repealRequest',
        method: 'post',
        data: {
          uid: localStorage.getItem('uid'),
          requestId: row.requestId,
          purpose: this.RepealData.purpose,
        }
      }).then((response) => {
        if (response) {
          if (response.data.error_code === 0) {
            console.log("撤销成功", response.data);
            alert("撤销成功");
            this.reload();
          } else {
            console.log("error" + response.data);
            alert("error" + response.data.error_code);
          }
        } else {
          console.log("申请失败，请检查网络");
          alert("申请失败，请检查网络");
        }
      });
      this.closeWindow();
    },
    loadMessage() {
      let that = this;
      console.log(localStorage.getItem('uid'))
      axios({
        url: 'user/allBorrowList',
        method: 'post',
        data: {
          uid: localStorage.getItem('uid'),
        }
      }).then((response) => {
        if (response) {
          console.log(response.data.token_message)
          if (response.data.token_message == "token错误") {
            alert("访问函数失败，请重新登录尝试解决")
          }
          if (response.data.error_code === 0) {
            console.log("获取成功", response.data);
            that.tableData = response.data.requestList;
            loading = false;
          } else {
            console.log("获取失败" + response.data);
            alert(localStorage.getItem('uid') + " 获取失败,error: " + response.data.error_code);
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
.header {
  height: 50px;
  display: flex;
  color: aqua;
}

.box-card {
  margin-left: 100px;
}

.title {
  color: #06c;
  margin-bottom: 20px;
  font-family: 微软雅黑;
  word-wrap: break-word;
  /* text-align: left; */
  font-size: 25px;
  font-weight: bold;
}

.el-table {
  width: 100%;
}
</style>