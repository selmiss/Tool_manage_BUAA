<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;">
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title" style="margin-top: 20px">教师信息表</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 80%">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column align="center" prop="name" label="教师姓名" min-width="50"></el-table-column>
              <el-table-column align="center" prop="phone" label="手机号" min-width="80"></el-table-column>
              <el-table-column align="center" prop="teacher_id" label="工号" min-width="60"> </el-table-column>
              <el-table-column align="center" label="操作" min-width="60">
                <template #default="scope">
                  <el-button type="danger" plain @click="deleteTeacher(scope.row)">删除教师</el-button>
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
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  components: { TeacherHeadBar, TeacherMenu },
  inject: ['reload'],
  mounted() {
    this.loadData()
  },
  data() {
    return {
      tableData: [
        // {
        //   id: '',
        //   name: '',
        //   phone: '',
        //   teacher_id: '',
        //   email: '',
        // },
      ],
    };
  },
  methods: {
    deleteTeacher(row) {
      axios.delete('managers/' + row.id
      ).then((res) => {
        ElMessage.success(res.data.msg);
        this.reload();
      }).catch((err) => {
        ElMessage.error(err);
      })
    },
    loadData() {
      axios.get('managers'
      ).then((res) => {
        this.tableData = res.data.data;
        ElMessage.success(res.data.msg);
      }).catch((err) => {
        ElMessage.error(err);
      })
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