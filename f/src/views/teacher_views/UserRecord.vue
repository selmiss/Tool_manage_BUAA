<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;">
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title" style="margin-top: 20px">用户记录表</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 80%">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column align="center" prop="name" label="用户名" min-width="50"></el-table-column>
              <el-table-column align="center" prop="phone" label="手机号" min-width="80"></el-table-column>
              <el-table-column align="center" prop="student_id" label="学号" min-width="60"> </el-table-column>
              <el-table-column align="center" prop="college" label="学院" min-width="50"> </el-table-column>
              <el-table-column align="center" label="操作" min-width="160">
                <template #default="scope">
                  <el-button type="primary" plain @click="handleCreate(scope.row)">查看记录</el-button>
                  <el-button type="danger" plain @click="deleteUser(scope.row)">删除用户</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog v-model="dialogFormVisible">
              <div class="title" style="margin-top: 0px">工具借用记录表</div>
              <div style="margin: 0 auto; align-items: center;">
                <el-card class="box-card" style="width: 80%">
                  <el-table :data="tableRecordData" style="width: 100%" border>
                    <el-table-column align="center" prop="toolName" label="工具名称" min-width="120"></el-table-column>
                    <el-table-column align="center" prop="startTime" label="借用开始时间" min-width="100"></el-table-column>
                    <el-table-column align="center" prop="returnTime" label="最晚归还时间" min-width="100">
                    </el-table-column>
                    <el-table-column align="center" label="状态" min-width="120">
                      <template #default="scope">
                        <el-button v-if="scope.row.status === 'A'" size="mini" type="warning">工具借用中</el-button>
                        <el-button v-if="scope.row.status === 'W'" size="mini" type="primary">等待审核中</el-button>
                        <el-button v-if="scope.row.status === 'R'" size="mini" type="danger">申请被拒绝</el-button>
                        <el-button v-if="scope.row.status === 'F'" size="mini" type="success">工具已归还</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </el-dialog>
          </el-card>
        </div>
      </el-main>
      <el-aside width="5%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  components: { TeacherHeadBar, TeacherMenu },
  inject: ['reload'],
  mounted() {
    this.loadData()
  },
  data() {
    return {
      dialogFormVisible: false,
      tableRecordData: [
        {
          toolName: "",
          startTime: "",
          returnTime: "",
          requestId: "",
          status: "",
        },
      ],
      tableData: [
        {
          id: '',
          name: '',
          phone: '',
          college: '',
          student_id: '',
          email: '',
        },
      ],
    };
  },
  methods: {
    handleCreate(row) {
      this.dialogFormVisible = true;
      this.tableRecordData = [];
      let that = this;
      console.log(row.id)
      axios({
        url: 'manager/allBorrowList',
        method: 'post',
        data: {
          uid: -2,
          stu_uid: row.id,
        }
      }).then((response) => {
        if (response) {
          if (response.data.error_code === 0) {
            console.log("获取成功", response.data);
            that.tableRecordData = response.data.requestList;
          } else {
            console.log("获取失败" + response.data);
            alert(row.uid + " 获取失败,error: " + response.data.error_code);
          }
        } else {
          console.log("获取失败" + response.data);
          alert("获取失败，请检查网络");
        }
      });
    },
    deleteUser(row) {
      var i = row.id;
      axios.delete('users/' + i,
      ).then((res) => {
        ElMessage.success(res.data.msg);
        this.reload();
      }).catch((err) => {
        ElMessage.error(err);
      });
    },
    loadData() {
      axios.get('users'
      ).then((resp) => {
        this.tableData = resp.data.data;
        ElMessage.success(resp.data.msg);
      }).catch((err) => {
        ElMessage.error(err);
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
  color: rgb(204, 116, 0);
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