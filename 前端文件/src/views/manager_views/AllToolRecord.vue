<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main width="75%">
        <div class="title" style="margin-top: 20px">设备记录表</div>
        <div style="margin: 0 auto; margin-top: 20px; align-items: center;">
          <el-card class="box-card" style="width: 80%">
              <el-table :data="tableData" style="width: 100%" border>
                <el-table-column type="index" :index="indexMethod" align="center"></el-table-column>
                <el-table-column align="center" prop="type" label="类别" min-width="70"></el-table-column>
                <el-table-column align="center" prop="name" label="名称" min-width="70"></el-table-column>
                <el-table-column align="center" prop="totalCount" label="总数" min-width="70"> </el-table-column>
                <el-table-column align="center" prop="leftCount" label="剩余数量" min-width="70"> </el-table-column>
                <el-table-column align="center" prop="limit_days" label="限借天数" min-width="70"> </el-table-column>
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
  components:{TeacherHeadBar,TeacherMenu},
  inject: ['reload'],
  mounted() {
    this.loadMessage()
  },
  data() {
    return {
      tableData: [
        {
          type:'',
          name:'',
          totalCount:'',
          leftCount:'',
        },
      ],
    };
  },
  methods: {

    loadMessage() {
      axios.all([
      axios({url: 'user/getLabelToolList',method: 'post',data: {labelId:4}}),
      axios({url: 'user/getLabelToolList',method: 'post',data: {labelId:5}}),
      axios({url: 'user/getLabelToolList',method: 'post',data: {labelId:6}})]
      ).then(axios.spread((r1,r2,r3)=>{
        r1=r1.data.toolList;r1.map(item=>{item.type="机械电子设备"});
        r2=r2.data.toolList;r2.map(item=>{item.type="电控工具"});
        r3=r3.data.toolList;r3.map(item=>{item.type="机械工具"});
        this.tableData=[...r1,...r2,...r3];
        console.log("!",this.tableData)
      }))
		},
  }
};
</script>

<style scoped>
  .header{
    height: 50px;
    display: flex;
    color: aqua;
  }
  .box-card{
    margin-left: 100px;
  }
  .title {
    color: rgb(212, 138, 0);
    margin-bottom: 20px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    /* text-align: left; */
    font-size: 25px;
    font-weight: bold;
  }
  .el-table{
    width: 100%;
  }
</style>