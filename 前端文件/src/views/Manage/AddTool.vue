<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <div style="display: grid;grid-template-columns: 20% 75% 5%;">
      <div><TeacherMenu></TeacherMenu></div>
      <div  class="addtool-frame">
        <div class="addtool-title">新增工具</div>
        <div class="addtool-content">
          <el-form v-if="addSuccess==false" ref="form" :model="form" :rules="rules" label-width="80px">
            <div style="display: grid;grid-template-columns: 500px 500px;grid-template-rows:400px 100px;column-gap: 100px;">
              <div>
                <el-form-item label="工具名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="labelId">
                  <el-select v-model="form.labelId" placeholder="选择分类">
                    <el-option
                        v-for="op in ops"
                        :key="op.lowerLabel[0].id"
                        :label="op.lowerLabel[0].name"
                        :value="op.lowerLabel[0].id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工具图片" prop="img" ref="uploadElement">
                  <el-input v-model="form.img" v-if="false"></el-input>
                  <el-upload
                      class="avatar-uploader" ref="upload"
                      accept="image/jpeg,image/jpg,image/png"
                      :auto-upload="false" action=""
                      :show-file-list="false"
                      :on-change="handleChange"
                      :on-success="handleAvatarSuccess">
                    <img v-if="form.img" :src="form.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="工具数量"  prop="addCount">
                  <el-input-number style="width: 100%" v-model="form.addCount" :min="1"></el-input-number>
                </el-form-item>

              </div>
              <div>
                <el-form-item label="限借天数" prop="limit_days">
                  <el-input-number style="width: 100%" v-model="form.limit_days" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="工具详情" prop="intro">
                <el-input
                    type="textarea"
                    :autosize="{minRows:14}"
                    placeholder="请输入内容"
                    v-model="form.intro">
                </el-input>
              </el-form-item>
              </div>
              <div style="grid-column-start: span 2;">
                <el-form-item>
                  <el-button style="width: 200px;font-size: 1.2em;background-color: #d59131;color:#fff" @click="handleSubmitAdd" :loading="formLoading">确定</el-button>
                  <el-button style="width: 200px;font-size: 1.2em" @click="formReset">清空</el-button>
                </el-form-item>
              </div>

            </div>
          </el-form>
          <el-result v-else icon="success" title="添加工具成功" >
            <template slot="extra">
              <el-button type="primary" size="medium" @click="continueAdd">继续添加</el-button>
            </template>
          </el-result>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
export default {
  components:{TeacherHeadBar,TeacherMenu},
  data() {
    return {
      addSuccess:false,
      formLoading:false,
      ops:[],
      uploadFile:'',
      form:{
        labelId:null,
        name:'',
        img:'',
        intro:'',
        addCount:'',
        imgfile:null,
        limit_days:7,
      },
      rules: {
        name: [
          {required: true, message: '请输入工具名称', trigger: 'blur'},
        ],
        labelId:[
          {required: true, message: '请选择分类', trigger: 'blur'},
        ],
        img:[
          {required: true, message: '请上传工具图片', trigger: 'blur'},
        ],
        addCount:[
          {required: true, message: '请输入工具数量', trigger: 'blur'},
        ],
        limit_days:[
          {required: true, message: '请输入工具的限制借用天数', trigger: 'blur'},
        ],
        intro:[
          // {required: true, message: '请输入工具详情', trigger: 'blur'},
        ],
      },

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    formReset(){
      this.form.labelId=null;
      this.form.name='';
      this.form.img=null;
      this.form.intro='';
      this.form.addCount=null;
      this.form.limit_days=7;
      this.form.imgfile=null;
    },
    continueAdd(){
      this.formReset();
      this.addSuccess=false;
    },
    init(){
      axios({
        url:'user/getFirstLabelList',
        method:'post',
        data:{}
      }).then(res=>{
        if(res.data.error_code==0){

          this.ops=res.data.labelList;
          console.log(this.ops)
        }
      })
    },
    handleChange (file, fileList) {
      this.form.img = URL.createObjectURL(file.raw);
      this.form.imgfile=file.raw;
    },
    handleAvatarSuccess(){
      axios({
        url:'user/getLabelToolList',
        method:'post',
        data:{
          labelId:this.form.labelId
        }
      }).then(res=>{
        this.init();
      })
    },
    handleSubmitAdd(){
      if(this.formLoading){return}
      this.$refs.form.validate(valid=>{
        if(!valid){return}
        this.formLoading=true;

        var formdata = new FormData();
        formdata.append("name", this.form.name);
        formdata.append("LabelId", this.form.labelId);
        formdata.append("intro", this.form.intro);
        formdata.append("addCount", this.form.addCount);
        formdata.append("uid", this.$store.state.UID);
        formdata.append("limit_days", this.form.limit_days);
        formdata.append("img", this.form.imgfile);
        axios({
          url:'http://127.0.0.1:8000/manager/createTool',
          method:'post',
          data:formdata,
        }).then(res=>{
          if(res.data.error_code==0){
            this.formLoading = false
            this.$refs.upload.clearFiles();
            this.addSuccess=true;
          }else{
            this.$message.error("错误代码：",res.data.error_code);
          }
        }).catch(err=>{
          this.$message.error(err)
        })
      })
    },
  }
}
</script>

<style scoped>
.addtool-title{
  font-weight: bold;
  font-size: 2em;
  color: #d59131;
}

input[type="file"] {
  display: none;
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
.addtool-frame{
  width: 100%;
  display: grid;
  grid-template-rows:100px auto 100px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
  align-content: stretch;
  justify-content: stretch;
}
.addtool-content{
  width: 100%;
}
</style>