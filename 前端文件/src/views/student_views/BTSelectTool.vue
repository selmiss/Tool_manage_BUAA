<template>
  <div style="width:100%;display: grid;grid-template-rows: 40px auto;row-gap: 30px;">
    <div style="display: grid;grid-template-columns: 20% 40% 40%;align-items: center">
      <span>共 {{rescount}} 条结果</span>
      <span>
        <el-input
            style="width: 400px;margin-left:100px;"
            placeholder="支持模糊搜索工具名称"
            v-model="searchkey"
            @keyup.enter.native="searchtool"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchtool"></el-button>
        </el-input>
      </span>
    </div>
    <div style="display: grid;grid-template-columns: repeat(auto-fill,160px);grid-template-rows:repeat(auto-fill,250px);gap:30px 30px;">
      <div class="tagselect-onetag" v-for="tool in tools" @click="chooseTool(tool)">
        <div style="width: 150px;height: 150px;margin: 5px auto;">
          <img height="100%" width="100%" style="border-radius: 5px;" :src="tool.url"/>
        </div>
        <div style="height: 30px;line-height:30px;width: 160px;">{{tool.name}}</div>
        <div style="height: 40px;width: 160px;margin-top:10px;display:inline-block;">
          <el-button  size="small" style="margin-top:5px;"
                      @click="ToolInfo(tool)">详情</el-button>
          <el-button type="primary" size="small" style="margin-top:5px;"
          @click="borrowTool(tool)">借用</el-button>
        </div>
      </div>


      <el-dialog
          :visible.sync="dialogVisible"
          center
          :modal=true
          :append-to-body=true
          width="700px"
          top="5px"
      >
        <div v-if="borrowSuccess==false" style="width:100%;display: grid;grid-template-rows: 100px 200px 50px auto 100px;justify-items: center">
          <div class="borrow-tool-title">借用 {{thetool.name}}</div>
          <div style="width: 200px;height: 200px;margin: 0 auto"><img height="100%" width="100%" :src=thetool.url ></div>
          <div class="borrow-tool-text" style="line-height: 50px">
            <span>限借天数：{{thetool.limit_days}}</span>
            <span>&nbsp 总数：{{thetool.totalCount}}</span>
            <span>&nbsp 剩余数量：{{thetool.leftCount}}</span>
            <span v-if="thetool.leftCount==0">&nbsp归还时间：{{ thetool.shortReturnTime }}</span>
          </div>
          <div class="borrow-tool-text" >
              <el-form ref="thetool" :model="thetool" :rules="rules" style="margin-top:3vh;line-height: 50px" label-width="200px">
<!--                <el-form-item label="要借用此工具的数量" prop="borrowCount">-->
<!--                  <el-input-number style="width: 100%" v-model="thetool.borrowCount" :max=thetool.leftCount :min="1"></el-input-number>-->
<!--                </el-form-item>-->
                <el-form-item label="借用时间" prop="duration">
                  <el-date-picker
                      v-model="thetool.duration"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始借用日期"
                      end-placeholder="归还日期"
                      @change="changeDuration"
                  >
                  </el-date-picker>
<!--                  <el-date-picker type="date" placeholder="选择日期" v-model="thetool.begin" style="width: 300px"></el-date-picker>-->
                </el-form-item>
<!--                <el-form-item label="借用结束时间" prop="end">-->
<!--                  <el-date-picker type="date" placeholder="选择日期" v-model="thetool.end" style="width: 300px" ></el-date-picker>-->
<!--                </el-form-item>-->
                <el-form-item label="借用理由" prop="purpose">
                  <el-input
                      type="textarea"
                      :rows="2"
                      style="width: 300px"
                      placeholder="请输入内容"
                      v-model="thetool.purpose">
                  </el-input>
                </el-form-item>
                <div style="display: flex;justify-content: space-evenly">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmBorrow">确 定</el-button>
                </div>
              </el-form>
          </div>
        </div>
        <el-result v-else icon="success" title="借用工具成功" sub-title="请关注相关提醒邮件" >
          <template slot="extra">
            <el-button type="primary" size="medium" @click="dialogVisible=false">返回工具页</el-button>
          </template>
        </el-result>
      </el-dialog>

      <el-dialog
          :visible.sync="Infodialog"
          center
          :modal=true
          :append-to-body=true
          width="700px"
          top="5px"
      >
        <div style="width:100%;display: grid;grid-template-rows: 100px 200px 50px auto 100px;justify-items: center">
          <div class="borrow-tool-title">{{thetool.name}}</div>
          <div style="width: 200px;height: 200px;margin: 0 auto"><img height="100%" width="100%" :src=thetool.url ></div>
          <div class="borrow-tool-text" style="line-height: 50px">
            <span>限借天数：{{thetool.limit_days}}</span>
            <span>&nbsp 总数：{{thetool.totalCount}}</span>
            <span>&nbsp 剩余数量：{{thetool.leftCount}}</span>
            <span v-if="thetool.leftCount==0">&nbsp归还时间：{{ thetool.shortReturnTime }}</span>
          </div>
          <div class="borrow-tool-text" style="display: grid;grid-template-columns: 100px 400px">
            <div style="font-weight: bold">详情介绍:</div>
            <div>{{thetool.intro}}</div>
          </div>
        </div>
      </el-dialog>
    </div>


  </div>
</template>
<script>
import axios from "axios";
export default{
  name:"BTSelectTool",
  components:{},
  created(){},
  mounted(){
    this.init()
  },
  props:['tagid'],

  data(){
    return {
      searchkey:'',
      tools:[],
      totoftags:1,

      rescount:0,
      dialogVisible:false,
      thetool:{
        name:'',
        totalCount:null,
        leftCount:null,
        borrowCount:1,
        begin:'',
        end:'',
        purpose:'',
      },

      Infodialog:false,

      borrowSuccess:false,

      rules: {
        borrowCount: [
          // {required: true,message: '请填写借用数量', trigger: 'blur'},
          // {type: 'number',  message: '借用数量必须为正整数'},
        ],
        duration:[
          {required: true, message: '请选择借用的时段', trigger: 'blur'},
        ],
        purpose:[
          {required: true, message: '请填写借用理由', trigger: 'blur'},
        ],
      },
    }
  },
  methods:{
    init(){
      axios({
        url: "http://121.4.160.157/user/getLabelToolList",
        method: "post",
        data: {
          labelId: this.tagid,
        },
      }).then((res) => {
        if(res.data.error_code==0){
          console.log(res);
          this.tools=res.data.toolList;
          this.rescount=res.data.toolList.length;
        }else{
          console.log(error);
        }
      }).catch(err=>{console.log(err)})
    },
    ToolInfo(tool){
      this.thetool=tool;
      this.Infodialog=true;
    },
    borrowTool(tool){
      this.thetool=tool;
      this.thetool.borrowCount=1;
      this.borrowSuccess=false;
      this.dialogVisible=true;
    },
    formatDate(date){
      let formatted_data=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      return formatted_data;
    },
    changeDuration(d){
      this.thetool.begin=d[0];
      this.thetool.end=d[1];
    },
    confirmBorrow(){
      this.$refs["thetool"].validate(val=>{
        if(val){
          axios({
            url: "http://127.0.0.1:8000/user/borrowRequest",
            method: 'post',
            data: {
              toolId: this.thetool.id,
              uid:localStorage.getItem('uid'),
              // borrowCount: Number(this.thetool.borrowCount),
              borrowCount:1,
              returnTime:this.formatDate(this.thetool.end),
              startTime:this.formatDate(this.thetool.begin),
              purpose:this.thetool.purpose
            }
          }).then(res=>{
            console.log("Miaomiaomiao",res)
            if(res.data.error_code==0){
              this.borrowSuccess=true;
            }else if(res.data.error_code==4){
              this.$message.warning("借用时长超过限定期限")
            }else if(res.data.error_code==5){
				this.$message.warning("你已经借用过这个工具了");
			}
			else{
              this.$message.error("错误代码",res.data.error_code);
            }
          }).catch(err=>{
            this.$message.error("未知错误",err)
          })
        }
        else{
          this.$message.error("输入错误",err)
        }
      })

    },
    searchtool(){
      if(this.searchkey.length<1) {
        this.init();
      }else{
        axios({
          url:'http://121.4.160.157/user/searchToolByName',
          method:'post',
          data:{
            toolName:this.searchkey,
          }
        }).then(res=>{
          this.tools=res.data.dataList;
          this.rescount=res.data.dataList.length;
        }).catch(err=>{
          this.$message.error(err)
        })
      }
    },
    chooseTool(tool){
      console.log(tool)

    }
  }
}
</script>

<style scoped>
.tagselect-onetag{
  cursor: pointer;
  width: 160px;
  height: 250px;
  font-size: 1.3em;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  font-family: '宋体';
}
.borrow-tool-title{
  font-weight: bold;
  font-size: 2em;
  color: #0066cc;
}
.borrow-tool-text{
  font-size: 1.5em;
  font-family: '宋体';
}
</style>