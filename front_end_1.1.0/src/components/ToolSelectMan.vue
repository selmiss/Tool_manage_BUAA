<!--被ToolManage.vue引用-->

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
      <div class="tagselect-onetag" v-for="tool in tools">
        <div style="width: 150px;height: 150px;margin: 5px auto;">
          <img height="100%" width="100%" style="border-radius: 5px;" :src="tool.url"/>
        </div>
        <div style="height: 30px;line-height:30px;width: 160px;">{{tool.name}}</div>
        <div style="height: 40px;width: 160px;margin-top:10px;display:inline-block;">
          <el-button  size="mini" style="margin-top:5px;" @click="info(tool)" icon="el-icon-info"></el-button>
          <el-button type="primary" size="mini" style="margin-top:5px;" :loading="editButtonLoading" @click="edit1(tool)" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" style="margin-top:5px;" @click="del(tool)" icon="el-icon-delete"></el-button>
        </div>
      </div>

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
          <div style="width: 200px;height: 200px;margin: 0 auto">
            <img height="100%" width="100%" :src=thetool.url >
          </div>
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

      <el-dialog
          :visible.sync="Editdialog"
          center
          :modal=true
          :append-to-body=true
          width="1000px"
          top="5px"
      >
        <el-form ref="form" :model="thetool" :rules="rules" label-width="80px">
        <div style="width:100%;display: grid;grid-template-rows: 100px auto;justify-items: center">
          <div class="borrow-tool-title">编辑工具</div>
          <el-form ref="form" :model="thetool" :rules="rules" label-width="80px">
            <div style="display: grid;grid-template-columns: 400px 500px;grid-template-rows:400px 100px;column-gap: 50px;">
              <div>
                <el-form-item label="工具名称" prop="name">
                  <el-input v-model="thetool.name"></el-input>
                </el-form-item>
				
                
				<el-form-item label="工具图片" >
				<div v-model="thetool.url" @change="changeFile">
				        <input type="file"  style="display: none;" id="upfile">
						<button type="button" onclick="upfile.click()">
						<img v-if="thetool.url" :src="thetool.url" class="avatar">
						</button>
				</div>
				</el-form-item>	
				
                <el-form-item label="工具数量" prop="addCount">
                  <el-input-number v-model="thetool.totalCount" :min="1"></el-input-number>
                  <div>剩余数量：{{thetool.leftCount}}</div>
                  <div v-if="thetool.leftCount==0">&nbsp归还时间：{{ thetool.shortReturnTime }}</div>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="限借天数" prop="limit_days">
                  <el-input-number style="width: 100%" v-model="thetool.limit_days" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="工具详情" prop="intro">
                  <el-input
                      type="textarea"
                      :autosize="{minRows:14}"
                      placeholder="请输入内容"
                      v-model="thetool.intro">
                  </el-input>
                </el-form-item>
              </div>
              <div style="grid-column-start: span 2;justify-self: center;">
                <el-form-item>
                  <el-button style="width: 200px;font-size: 1.2em" type="primary" @click="handleSubmitAdd" :loading="formLoading">确定</el-button>
                  <el-button style="width: 200px;font-size: 1.2em" @click="cancelEdit">取消</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>

        </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Upload } from "element-ui";
export default{
	file:null,
  name:"ToolSelectMan",
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
      formLoading:false,
      editButtonLoading:false,
      Infodialog:false,
      Editdialog:false,
      thetool:{},
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

    }
  },
  methods:{
	  
	  
	    changeFile(e){
	        console.log(e.target.files[0]);
	        this.file=e.target.files[0];
				  let formData=new FormData()
				  formData.append('managerId',this.$store.state.UID)
				  formData.append('files',this.file)
				  this.axios.post('/manager/imgText',formData).then(res=>{
				      console.log(res);
					  this.thetool.url= "http://10.212.87.185/media/" + res.data['url'];
					  console.log(this.thetool.url+"改变成功!!!!!!!!!!!");
				  })
	          },
	  
	  
	  
	  
    init(){
      axios({
        url: "user/getLabelToolList",
        method: "post",
        data: {
          labelId: this.tagid,
        },
      }).then((res) => {
        console.log("111",res)
        if(res.data.error_code==0){
          this.tools=res.data.toolList;
          this.rescount=res.data.toolList.length;
        }else{
          this.$message.error("由于网络安全原因失败，请重试！",res.data.error_code);
        }
      }).catch(err=>{this.$message.error(err)})
    },
	
    searchtool(){
      if(this.searchkey.length<1) {
        this.init();
      }else{
        axios({
          url:'user/searchToolByName',
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
    del(tool){
		if(window.confirm('你确定要删除吗？')){
      axios({
		  
        url:'manager/deleteTool',
        method:'post',
        data:{
          toolId:tool.id,
          uid:this.$store.state.UID
        }
      }).then(res=>{
        if(res.data.error_code==0){
          this.init();
        }else{
          var msg="";
          switch (res.data.error_code){
            case 1:msg="参数错误";break;
            case 2:msg="用户不存在";break;
            case 3:msg="工具不存在";break;
            case 4:msg="工具未完全归还";break;
            default:msg="未知错误，请重新登录";
          }
          this.$message.error(msg)
        }
      })
	  }else{
		  
	  }
    },
    info(tool){
      this.thetool=tool;
      this.Infodialog=true;
    },
	
    urlToImg(url){
      var promise=new Promise(function (resolve, reject){
        var image = new Image();
        image.src = url;
        image.setAttribute("crossOrigin", "Anonymous");
        let res={}
        image.onload=function (){
          res={
            width:this.width,
            height:this.height,
            img:image,
          }
          resolve(res);
        }
      });
      return promise;
    },

    getBase64ImageGetCanvas(img){
      var promise=new Promise(function (resolve, reject) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas)
      });
      return promise;
    },

    getBase64Image(img,canvas) {
      var promise=new Promise(function (resolve, reject) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        resolve(dataURL)

      });
      return promise;
    },
    dataURLtoFile(dataurl, filename) {
      var promise=new Promise(function (resolve, reject) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        resolve(new File([u8arr], filename, {type:mime}) );
      });
      return promise;
    },


	edit1(tool){
		console.log(tool.url)
		this.thetool=tool;
		this.thetool.imgfile=tool.url;
		this.Editdialog=true;
	},

	
    edit(tool){
      this.editButtonLoading=true;
      console.log(tool.url)
      this.urlToImg(tool.url)
      .then(img=>{
        this.getBase64ImageGetCanvas(img.img).then(canvas=>{
          this.getBase64Image(img.img,canvas).then(dataurl=>{
            this.dataURLtoFile(dataurl,tool.url.split('/').slice(-1)[0]).then(imgfile=>{
              this.editButtonLoading=false;
              this.thetool=tool;
              this.thetool.imgfile=imgfile;
              this.editButtonLoading=false;
              this.Editdialog=true;
            })
          })
        })
      })
      // this.editButtonLoading=false;
      // this.thetool=tool;
      // this.thetool.imgfile=tool.url;
      // this.Editdialog=true;

    },
    handleChange (file, fileList) {
      this.thetool.url = URL.createObjectURL(file.raw);
      this.thetool.imgfile=file.raw;
    },
    handleAvatarSuccess(){
      this.init();
    },
	uploadImg(){
		console.log("调用了")
		axios({
			url:'http://127.0.0.1:8000/manager/uploadImg1',
			method:'post',
			data:{
				"toolID":this.thetool.id,
				"img":this.thetool.imgfile,
			},
		}).then(res=>{
			console.log(res["message"]);
		})
      },
	modification(){
		this.handleSubmitAdd();
		this.uploadImg();
	},
    handleSubmitAdd(){
      console.log("好像调用的不是这个？？？");
      if(this.formLoading){return}
      this.$refs.form.validate(valid=>{
        if(!valid){return}
        this.formLoading=true;
        var formdata = new FormData();
        formdata.append("name", this.thetool.name);
        formdata.append("toolId", this.thetool.id);
        formdata.append("intro", this.thetool.intro);
		formdata.append('imgurl',this.thetool.url);
        formdata.append("setCount", this.thetool.totalCount);
        formdata.append("uid", localStorage.getItem('uid'));
        formdata.append("limit_days",this.thetool.limit_days);
        axios({
          url:'manager/editTool',
          method:'post',
          data:formdata,
        }).then(res=>{
          console.log(res,formdata)
          if(res.data.error_code==0){
            this.formLoading = false
            this.Editdialog=false;
            this.init();
          }else{
            this.$message.error("错误代码：",res.data.error_code);
            this.formLoading = false
          }
        }).catch(err=>{
          this.$message.error(err)
          this.formLoading = false
        })
      })
    },
    cancelEdit(){
      this.thetool={};
      this.Editdialog=false;
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
}
.borrow-tool-text{
  font-size: 1.5em;
  font-family: '宋体';
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