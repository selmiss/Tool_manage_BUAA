<template>
  <div style="width:100%;display: grid;grid-template-rows: 40px auto;row-gap: 30px;">
    <div style="display: grid;grid-template-columns: 20% 40% 40%;align-items: center">
      <span>共 {{ rescount }} 条结果</span>
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
    <div
      style="display: grid;grid-template-columns: repeat(auto-fill,160px);grid-template-rows:repeat(auto-fill,250px);gap:30px 30px;">
      <div class="tagselect-onetag" v-for="tool in tools">
        <div style="width: 150px;height: 150px;margin: 5px auto;" @click="info(tool)">
          <el-image style="height: 100%; width: 100%; border-radius: 5px;" :src="tool.portrait" :fit="fill" />
        </div>
        <div style="height: 30px;width: 160px;">{{ tool.name }}</div>
        <div style="height: 40px;width: 160px;margin-top:10px;display:inline-block;">
          <el-button size="small" style="margin-top:5px;" @click="info(tool)">
            <el-icon class="el-icon-info"></el-icon>
          </el-button>
          <el-button type="primary" size="small" style="margin-top:5px;" :loading="editButtonLoading"
            @click="pre_edit(tool)">
            <el-icon class="el-icon-edit"></el-icon>
          </el-button>
          <el-button type="danger" size="small" style="margin-top:5px;" @click="pre_del(tool)">
            <el-icon class="el-icon-delete"></el-icon>
          </el-button>
        </div>
      </div>

      <el-dialog v-model="infoDialog" center :modal=true :append-to-body=true width="700px" top="5px">
        <div style="width:100%;display: grid;grid-template-rows: 100px 200px 50px auto 100px;justify-items: center">
          <div class="borrow-tool-title">{{ cur_tool.name }}</div>
          <div style="width: 200px;height: 200px;margin: 0 auto">
            <el-image style="height: 100%; width: 100%; border-radius: 5px;" :src="cur_tool.portrait" :fit="fill" />
          </div>
          <div class="borrow-tool-text" style="line-height: 50px">
            <span>限借天数：{{ cur_tool.limit_days }}</span>
            <span>&nbsp 总数：{{ cur_tool.total_count }}</span>
            <span>&nbsp 剩余数量：{{ cur_tool.left_count }}</span>
            <span v-if="cur_tool.leftCount == 0">&nbsp归还时间：{{ cur_tool.shortReturnTime }}</span>
          </div>
          <div class="borrow-tool-text" style="display: grid;grid-template-columns: 100px 400px">
            <div style="font-weight: bold">详情介绍:</div>
            <div>{{ cur_tool.intro }}</div>
          </div>
        </div>
      </el-dialog>

      <el-dialog v-model="editDialog" center :modal=true :append-to-body=true width="1000px" top="5px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <div style="width:100%;display: grid;grid-template-rows: 100px auto;justify-items: center">
            <div class="borrow-tool-title">编辑工具</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <div style="display: grid;grid-template-columns: 400px 500px;grid-template-rows:400px 100px;column-gap: 50px;">
                <div>
                  <el-form-item label="工具名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="工具图片">
                    <el-upload
                      class="avatar-uploader"
                      accept="image/jpeg,image/jpg,image/png"
                      :auto-upload="false"
                      :show-file-list="false"
                      action=""
                      :on-change="handleChange"
                    >
                      <img v-if="form.img" :src="form.img" class="avatar">
                      <el-icon v-else class="el-icon--upload"><Plus /></el-icon>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="工具数量" prop="addCount">
                    <el-input-number v-model="form.total_count" :min="1"></el-input-number>
                    <div>剩余数量：{{ cur_tool.left_count }}</div>
                    <div v-if="cur_tool.left_count == 0">&nbsp归还时间：{{ cur_tool.shortReturnTime }}</div>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="限借天数" prop="limit_days">
                    <el-input-number style="width: 100%" v-model="form.limit_days" :min="1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="工具详情" prop="intro">
                    <el-input type="textarea" :autosize="{ minRows: 14 }" placeholder="请输入内容" v-model="form.intro">
                    </el-input>
                  </el-form-item>
                </div>
                <div style="grid-column-start: span 2;justify-self: center;">
                  <el-form-item>
                    <el-button style="width: 200px" type="primary" @click="edit"
                      :loading="formLoading">确定</el-button>
                    <el-button style="width: 200px" @click="editDialog=false">取消</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>

          </div>
        </el-form>
      </el-dialog>

      <el-dialog
        v-model="delDialog"
        width="30%"
      >
        <p>您确定要删除 <span class="text-red-800">{{ cur_tool.name }}</span> 工具吗？</p>
        <template #footer>
          <el-button type="danger" @click="del(tool)">确认</el-button>
          <el-button @click="delDialog=false">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  file: null,
  name: "ToolSelectMan",
  components: {},
  mounted() {
    this.init()
  },
  props: ['tagid'],
  data() {
    return {
      searchkey: '',
      fulltools: [],
      tools: [{
        id: 0,
        name: '',
        total_count: 0,
        left_count: 0,
        label: '',
        portrait: '',
        created_at: '',
        intro: '',
        limit_days: 0,
      }],
      rescount: 0,
      formLoading: false,
      editButtonLoading: false,
      infoDialog: false,
      editDialog: false,
      delDialog: false,
      cur_tool: {},
      form: {
        id: 0,
        name: '',
        total_count: 1,
        img: '',
        imgfile: null,
        intro: '暂无简介',
        limit_days: 7,
      },
      rules: {
        name: [
          { required: true, message: '请输入工具名称', trigger: 'blur' },
        ],
        labelId: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
        img: [
          { required: true, message: '请上传工具图片', trigger: 'blur' },
        ],
        addCount: [
          { required: true, message: '请输入工具数量', trigger: 'blur' },
        ],
        limit_days: [
          { required: true, message: '请输入工具的限制借用天数', trigger: 'blur' },
        ],
        intro: [
          // {required: true, message: '请输入工具详情', trigger: 'blur'},
        ],
      },
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.form.img = URL.createObjectURL(file.raw);
      this.form.imgfile = file.raw;
    },
    init() {
      axios({
        url: 'tools',
        method: 'get',
        params: {
          label: this.tagid,
        }
      })
      .then(resp => {
        this.tools = resp.data.data;
        this.tools.map(tool => {
          if (tool.portrait.startsWith('http')) {
            tool.portrait = tool.portrait;
          } else {
            tool.portrait = axios.defaults.baseURL + "media/image/" + tool.portrait;
          }
        });
        this.rescount = resp.data.data.length;
        this.fulltools = this.tools;
        console.log(this.tools);
      })
      .catch(err => { 
        this.$message.error(err)
      })
    },
    searchtool() {
      if (this.searchkey.length < 1) {
        this.init();
      } else {
        this.tools = this.fulltools.filter(tool => tool.name.includes(this.searchkey));
        // axios({
        //   url: 'user/searchToolByName',
        //   method: 'post',
        //   data: {
        //     toolName: this.searchkey,
        //   }
        // }).then(res => {
        //   this.tools = res.data.dataList;
        //   this.tools.map(tool => {
        //     if (tool.portrait.startsWith('http')) {
        //       tool.portrait = tool.portrait;
        //     } else {
        //       tool.portrait = axios.defaults.baseURL + "media/image/" + tool.portrait;
        //     }
        //   });
        //   this.rescount = res.data.dataList.length;
        // }).catch(err => {
        //   this.$message.error(err)
        // })
      }
    },
    pre_del(tool) {
      this.cur_tool = tool;
      this.delDialog = true;
    },
    del() {
      axios({
        url: 'tools/' + this.cur_tool.id,
        method: 'DELETE',
      }).then(resp => {
        this.delDialog = false;
        this.init();
        //   switch (resp.data.error_code) {
        //     case 1: msg = "参数错误"; break;
        //     case 2: msg = "用户不存在"; break;
        //     case 3: msg = "工具不存在"; break;
        //     case 4: msg = "工具未完全归还"; break;
        //     default: msg = "未知错误，请重新登录";
        //   }
        //   this.$message.error(msg)
        // }
      }).catch(err => {
        ElMessage.error(err)
      })
    },
    info(tool) {
      this.cur_tool = tool;
      this.infoDialog = true;
    },
    pre_edit(tool) {
      this.cur_tool = tool;
      this.form = tool;
      this.form.img = tool.portrait;
      this.form.imgfile = null;
      this.editDialog = true;
    },
    edit() {
      if (this.formLoading) { return }
      this.$refs.form.validate(valid => {
        if (!valid) { return }
        this.formLoading = true;
        var formdata = new FormData();
        formdata.append("name", this.form.name);
        formdata.append("total_count", this.form.total_count);
        formdata.append("intro", this.form.intro);
        formdata.append("limit_days", this.form.limit_days);
        formdata.append("img", this.form.imgfile);
        axios({
          url: 'tools/'+ this.form.id,
          method: 'put',
          data: formdata,
        }).then(resp => {
          // if (resp.data.error_code == 0) {
            this.formLoading = false
            this.editDialog = false;
            this.init();
          // } else {
          //   this.$message.error("错误代码：", resp.data.error_code);
          //   this.formLoading = false
          // }
        }).catch(err => {
          this.$message.error(err)
          this.formLoading = false
        })
      })
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.tagselect-onetag {
  cursor: pointer;
  width: 160px;
  height: 250px;
  /* font-size: 1.3em; */
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  /* font-family: '宋体'; */
}

.borrow-tool-title {
  font-weight: bold;
  font-size: 2em;
}

.borrow-tool-text {
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>