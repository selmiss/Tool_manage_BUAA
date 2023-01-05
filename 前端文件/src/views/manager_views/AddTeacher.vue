<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title">教师添加</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 90%">
              <el-table :data="tchData" style="width: 100%" border>
                <el-table-column align="center" prop="name" label="教师信息" min-width="150"></el-table-column>
                <el-table-column align="center" prop="teacherId" label="工号" min-width="170"></el-table-column>
                <el-table-column align="center" prop="acc" label="邮箱" min-width="170"></el-table-column>
                <el-table-column align="center" label="操作" min-width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      plain
                      @click="handleAgree(scope.$index, scope.row)">同意添加</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      @click="handleRefuse(scope.$index, scope.row)">拒绝添加</el-button>
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
import axios from "axios";

export default {
  inject: ['reload'],
  components:{TeacherHeadBar,TeacherMenu},
  mounted(){
    this.loadTable()
  },
  data() {
    return {
      tchData:[{
        name:'',
        teacherId:'',
        acc:'',
        uid:'',
      }],
    };
  },
  methods: {
    loadTable(){
        let that = this;
        axios({
          method:'post',
          url: 'http://121.4.160.157/manager/getTeacherApproveList',
          data: {
          }
        })
        .then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("获取成功", response.data);
              that.tchData = response.data.dataList;
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
    
    handleAgree(index, row) {
      console.log(index, row);
      axios({
					url: 'http://121.4.160.157/manager/approveTeacher',
					method: 'post',
					data: {
            managerId: localStorage.getItem('uid'),
            teacherId: row.uid,
            status: "Accept",
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("已添加该教师");
              alert("已添加该教师");
              this.reload()
						} else {
							console.log("审批失败" + response.data);
							alert("error" + response.data.error_code);
						}
					} else {
						console.log("审批失败，请检查网络" + response.data);
						alert("审批失败，请检查网络");
					}
				});
    },
    handleRefuse(index, row) {
      console.log(index, row);
      axios({
					url: 'http://121.4.160.157/manager/approveTeacher',
					method: 'post',
					data: {
            managerId: localStorage.getItem('uid'),
            teacherId: row.uid,
            status: "Refuse",
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("已拒绝该申请", response.data);
              alert("已拒绝该申请");
              this.reload()
						} else {
							console.log("审批失败" + response.data);
							alert("error" + response.data.error_code);
						}
					} else {
						console.log("审批失败，请检查网络" + response.data);
						alert("审批失败，请检查网络");
					}
				});
    },

  },
};
</script>

<style scoped>
  .box-card{
    margin-left: 100px;
  }
  .title {
    color: rgb(204, 122, 0);
    margin-bottom: 40px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    /* text-align: left; */
    font-size: 25px;
    font-weight: bold;
  }
</style>
