<!--编辑标签信息主页面-->
<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <div style="display: grid;grid-template-columns: 15% 80% 5%;">
      <div>
        <TeacherMenu></TeacherMenu>
      </div>
      <div>
        <div class="tagselect-frame">
          <div class="tagselect-title">编辑分类</div>
          <div class="tagselect-path">
            <span v-if="tagid>0" style="cursor: pointer;" @click="cancelTag">类别</span>
            <span v-if="tagid>0" >&nbsp&nbsp >> &nbsp&nbsp</span>
            <span v-if="tagid>0">{{tagname}}</span> </div>
          <div class="tagselect-content">
            <div v-if="tagid==0">
              <div  style="display: grid;grid-template-columns: repeat(3,300px);
              grid-template-rows: 400px;column-gap:100px;justify-content: space-around">
                <div v-for="label in labellist">
                  <div></div>
                  <div class="tagselect-onetype" @click="chooseTag(label.lowerLabel[0])">
                    <div style="width: 100%;height: 300px;"><img style="height: 100%;width: 100%;" :src="label.lowerLabel[0].url"/></div>
                    <h3 class="tagselect-onetype-title">{{label.lowerLabel[0].name}}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div style="width:100%;display: grid;grid-template-rows: 40px auto;row-gap: 30px;">
                <span>
                  <el-button type="primary" style="width:300px;margin-left: 100px;"
                             @click="addTag"
                  >
                    新增分类
                  </el-button>
                </span>

                <div class="tagselect-onetag">
                  <div>{{tag.name}}</div>
                  <div>
                    <el-button type="primary" @click="edit(tagid)">编辑</el-button>
                  </div>
                  <div>
                    <el-button type="danger" @click="del(tagid)">删除</el-button>
                  </div>
                </div>


                <el-dialog
                    :visible.sync="dialogVisible"
                    width="300px"
                    title="编辑分类名称"
                >
                  <el-input v-model="tag.name" ></el-input>

                  <el-input v-model="tagimg" v-if="false"></el-input>
                  <el-upload
                      class="avatar-uploader" ref="upload"
                      accept="image/jpeg,image/jpg,image/png"
                      :auto-upload="false" action=""
                      :show-file-list="false"
                      :on-change="handleChange"
                  >
                    <img v-if="tag.url" :src="tag.url" class="avatar">
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
                  <el-input v-model="tag.name" ></el-input>

                  <div slot="footer" class="dialog-footer" style="display:flex;justify-content: space-around">
                    <el-button @click="addDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>

<!--            <TagSelectTag v-else :path="pathcomputed"></TagSelectTag>-->
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
import TagSelectTag from "@/components/TagSelectTag";
import axios from "axios";
export default {
  name:'TagManagement',
  components:{TeacherHeadBar,TeacherMenu,TagSelectTag},
  data(){  //用于存储变量
    return {
      tagid:0,
      tag:{},
      dialogVisible:false,
      tagimg:'',
      labellist:[],
      addDialog:false,
    }
  },

  mounted() {
    axios({
      url:'http://121.4.160.157/user/getFirstLabelList',
      method:'post',
      data:{}
    }).then(res=>{
      console.log(res)
      if(res.data.error_code==0){
        this.labellist=res.data.labelList;
      }
    })
  },
  methods:{

    chooseTag(tag){
      this.tagid=tag.id;
      this.tag=tag;
    },
    cancelTag(){
      this.tagid=0;
      this.tagname='';
    },

    addTag(){
      this.tag.name=null;
      this.addDialog=true;
    },
    confirmAdd(){
      axios({
        url:"http://121.4.160.157/manager/addSecondLable",
        method:'post',
        data:{
          managerId:localStorage.getItem('UID'),
          name:this.tag.name,
          firstLabelId:this.tagid-3,
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
    handleChange (file, fileList) {
      let lalala=file.raw;
      var formdata=new FormData();
      formdata.append("img",lalala);
      formdata.append("LabelId",this.tagid);
      axios({
        url:'http://121.4.160.157/manager/putLabelImage',
        method:'post',
        data: formdata
      }).then(res=>{
        console.log(res)
      })
      this.newtagimg = URL.createObjectURL(file.raw);
    },
    edit(tag){
      this.dialogVisible=true;
    },
    confirmEdit(){
      console.log(this.$store.state.UID,this.tagid,this.newtagname)
      axios({
        url:"http://121.4.160.157/manager/editLabel",
        method:'post',
        data:{
          LabelId:this.tagid,
          newName:this.tag.name,
          managerId:this.$store.state.UID,
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
    del(id){
      axios({
        url:"http://121.4.160.157/manager/deleteLabel",
        method:'post',
        data:{
          managerId:this.$store.state.UID,
          LabelId:id,
        }
      }).then(res=>{
        console.log(res)
        if(res.data.error_code==0){
          this.init();
        }
      })
    }
  }
};
</script>
<style scoped>
.tagselect-frame{
  width: 100%;
  display: grid;
  grid-template-rows:100px 50px auto;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
  align-content: stretch;
  justify-content: stretch;
}
.tagselect-title{
  font-weight: bold;
  font-size: 2em;
  color: rgb(225, 162, 80);
}
.tagselect-path{
  justify-self: start;
  font-size: 1.5em;
  color: darkgray;
}
.tagselect-content{
  width: 100%;
}


.tagselect-onetag{
  width: 600px;
  height: 100px;
  margin: 0 auto;
  font-size: 1.5em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  display: grid;
  grid-template-columns: 170px 150px 170px 170px;
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