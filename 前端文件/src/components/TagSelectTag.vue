<template>
  <div style="width:100%;display: grid;grid-template-rows: 40px auto;row-gap: 30px;">
    <div style="display: grid;grid-template-columns: 20% 40% 40%;align-items: center">
      <span>共 {{tagcount}} 条结果</span>
      <span>
        <el-button type="primary" style="width:300px;margin-left: 100px;"
        @click="addTag"
        >
          新增分类
        </el-button>
      </span>
      <span>
        <el-input
            style="width: 400px;margin-left:100px;"
          placeholder="支持模糊搜索分类名称"
          v-model="searchkey"
          @keyup.enter.native="searchtag"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchtag"></el-button>
        </el-input>
      </span>
    </div>
    <div style="display: grid;grid-template-columns: repeat(auto-fill,400px);gap:50px 50px;">
      <div class="tagselect-onetag" v-for="tag in tags">
        <div>{{tag.name}}</div>
        <div>({{tag.count}})</div>
        <div>
          <el-button type="primary" @click="edit(tag)">编辑</el-button>
        </div>
        <div>
          <el-button type="danger" @click="del(tag)">删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="300px"
        title="编辑分类名称"
    >
      <el-input v-model="newtagname" ></el-input>

      <el-input v-model="newtagimg" v-if="false"></el-input>
      <el-upload
          class="avatar-uploader" ref="upload"
          accept="image/jpeg,image/jpg,image/png"
          :auto-upload="false" action=""
          :show-file-list="false"
          :on-change="handleChange"
      >
        <img v-if="newtagimg" :src="newtagimg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer" style="display:flex;justify-content: space-around">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        :visible.sync="addDialog"
        width="300px"
        title="添加分类"
    >
      <el-input v-model="newtagname" ></el-input>

      <div slot="footer" class="dialog-footer" style="display:flex;justify-content: space-around">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default{
  name:"TagSelectTag",
  components:{},
  created(){},
  mounted(){
    this.init()
  },
  props:{
    path: {
      type: Number,
      default:0,
    },
  },
  data(){
    return {
      newtagimg:null,
      tagcount:0,
      searchkey:'',
      tags:[],
      dialogVisible:false,
      addDialog:false,
      newtagname:null,
      tagid:null,
    }
  },
  methods:{
    searchtag(){
      if(this.searchkey.length<1) {
        this.init();
      }else{
        axios({
          url:'user/searchLabelByName',
          method:'post',
          data:{
            labelName:this.searchkey,
          }
        }).then(res=>{
          this.tags=res.data.dataList;
          this.rescount=res.data.dataList.length;
        }).catch(err=>{
          this.$message.error(err)
        })
      }
    },
    init(){
        axios({
          url: "user/getSecondLabelList",
          method: "post",
          data: {
            labelId: this.path,
          },
        }).then((res) => {
          if(res.data.error_code==0){
            this.tags=res.data.labelList;
            this.tagcount=res.data.labelList.length;
          }else{
            this.$message.error("错误代码：",res.data.error_code);
          }
        }).catch(err=>{this.$message.error(err)})
    },
    edit(tag){
      this.newtagname=tag.name;
      this.tagid=tag.id;
      this.dialogVisible=true;
    },
    confirmEdit(){
      console.log(this.$store.state.UID,this.tagid,this.newtagname)
      axios({
        url:"manager/editLabel",
        method:'post',
        data:{
          LabelId:this.tagid,
          newName:this.newtagname,
          uid:this.$store.state.UID,
        }
      }).then(res=>{
        if(res.data.error_code==0){
          this.dialogVisible=false;
          this.init();
        }else{
          console.log(res)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    addTag(){
      this.newtagname=null;
      this.addDialog=true;
    },
    handleChange (file, fileList) {
      let lalala=file.raw;
      var formdata=new FormData();
      formdata.append("img",lalala);
      formdata.append("LabelId",this.tagid);
      axios({
        url:'manager/putLabelImage',
        method:'post',
        data: formdata
      }).then(res=>{
        console.log(res)
      })
      this.newtagimg = URL.createObjectURL(file.raw);
    },

    confirmAdd(){
      axios({
        url:"manager/addSecondLable",
        method:'post',
        data:{
          uid:localStorage.getItem('UID'),
          name:this.newtagname,
          firstLabelId:this.path,
        }
      }).then(res=>{
        console.log("lalala"+res)
        if(res.data.error_code==0){
          this.addDialog=false;
          this.init();
        }else{
          console.log(res);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    del(tag){
      axios({
        url:"manager/deleteLabel",
        method:'post',
        data:{
          uid:this.$store.state.UID,
          LabelId:tag.id,
        }
      }).then(res=>{
        console.log(res)
        if(res.data.error_code==0){
          this.init();
        }
      })
    }

  }
}
</script>

<style scoped>
.tagselect-onetag{
  width: 400px;
  height: 100px;
  font-size: 1.5em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  display: grid;
  grid-template-columns: 170px 50px 70px 70px;
  padding-right: 20px;
  column-gap: 10px;
  font-family: '宋体';
  line-height: 100px;
  align-content: center;
}


.avatar-uploader{
  border: 1px dashed #c0c4cc;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader :hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>