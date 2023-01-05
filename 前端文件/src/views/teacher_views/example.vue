<template>
  <div class="tab-container">
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      @click="handleCreate"
    >添加</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="题目" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.questionContent"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-radio-group v-model="questionForm.questionCategory" style="margin-right:12px;">
            <el-radio v-for="(radio, index) in subjectList" :key="index" :label="radio">{{radio}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="正确答案" prop="correctAnswer">
          <el-input v-model="questionForm.correctAnswer" />
        </el-form-item>
        <el-form-item label="其他答案1" prop="otherAnswer1">
          <el-input v-model="questionForm.otherAnswer1" />
        </el-form-item>
        <el-form-item label="其他答案2" prop="otherAnswer2">
          <el-input v-model="questionForm.otherAnswer2" />
        </el-form-item>
        <el-form-item label="其他答案3" prop="otherAnswer3">
          <el-input v-model="questionForm.otherAnswer3" />
        </el-form-item>
        <el-form-item label="所属年级">
          <el-select
            v-model="questionForm.userGrades"
            class="filter-item"
            placeholder="选择年级"
            multiple
          >
            <el-option
              v-for="item in tabMapOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" createData() ">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      subjectList: ["黄金", "白银", "钻石"],
      input: "",
      tabMapOptions: [
        { label: "幼儿园", key: "kinderGarten" },
        { label: "一年级", key: "firstGrade" },
        { label: "二年级", key: "secondGrade" },
        { label: "三年级", key: "threeGrade" },
        { label: "四年级", key: "fourthGrade" },
        { label: "五年级", key: "fifthGrade" },
        { label: "六年级", key: "sixGrade" },
        { label: "小学以上", key: "gradeSchool" },
      ],

      questionForm: {
        questionContent: "",
        correctAnswer: "",
        otherAnswer1: "",
        otherAnswer2: "",
        otherAnswer3: "",
        userGrades: [],
        questionCategory: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleCreate() {
      this.questionForm = {
        questionContent: "",
        correctAnswer: "",
        otherAnswer1: "",
        otherAnswer2: "",
        otherAnswer3: "",
        userGrades: [],
        questionCategory: "",
      };
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style scoped>
</style>