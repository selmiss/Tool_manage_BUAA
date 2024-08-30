<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title">待归还工具记录表</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 80%">
              <el-table :data="tableData" style="width: 100%" border>
                <el-table-column align="center" prop="toolName" label="工具名称" min-width="120"></el-table-column>
                <el-table-column align="center" prop="borrowCount" label="借用数量" min-width="110"></el-table-column>
                <el-table-column align="center" label="借用者信息" min-width="120">
                  <template #default="scope">
                    <el-popover
                      placement="bottom"
                      width="250"
                      trigger="click">
                      <div>{{ scope.row.requestUserName }} &nbsp &nbsp &nbsp &nbsp {{ scope.row.stuid }}</div>
                      <div>学院: &nbsp &nbsp &nbsp &nbsp {{ scope.row.stuCollege }}</div>
                      <div>联系邮箱: &nbsp{{ scope.row.stuEmail }}</div>
                      <div>联系电话: &nbsp{{ scope.row.phoneNumber }}</div>
                      <el-button size="mini" slot="reference">{{ scope.row.requestUserName }}</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="startTime" label="借用开始时间" min-width="110"></el-table-column>
                <el-table-column align="center" prop="returnTime" label="最晚归还时间" min-width="110"> </el-table-column>
                <el-table-column align="center" label="操作" min-width="130">
                  <template #default="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      @click="handleConfirm(scope.$index, scope.row)">确认归还</el-button>
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
export default {
  inject: ['reload'],
  components:{TeacherHeadBar,TeacherMenu},
  mounted() {
    this.loadMessage()
  },
  data() {
    return {
      tableData: [
        {
          toolName: "",
          requestUserName:"",
          startTime:"",
          returnTime: "",
          stuid:"",
          stuCollege:"",
          userId:"",
          phoneNumber: "",
          stuEmail:"",
          borrowCount:"",
        }
      ],
    };
  },
  methods: {
    handleConfirm(index, row) {
      console.log(index, row);
      axios({
					url: 'manager/returnTool',
					method: 'post',
					data: {
            requestId: row.requestId,
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("该设备已归还", response.data);
              alert("该设备已归还");
              this.reload()
						} else {
							console.log("审批失败" + response.data);
							alert("审批失败，请检查网络");
						}
					} else {
						console.log("error" + response.data);
						alert("error");
					}
				});
    },
    loadMessage() {
				let that = this;
				axios({
					url: 'manager/getAllNeedReturnList',
					method: 'post',
					data: {
					}
				}).then((response) => {
					if (response) {
						if (response.data.error_code === 0) {
							console.log("获取成功", response.data);
              that.tableData = response.data.data_list;
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