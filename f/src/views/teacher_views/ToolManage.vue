<template>
  <div>
    <TeacherHeadBar></TeacherHeadBar>
    <div style="display: grid;grid-template-columns: 15% 80% 5%;">
      <div>
        <TeacherMenu></TeacherMenu>
      </div>
      <div class="tagselect-frame">
        <div class="tagselect-title">编辑工具</div>
        <div class="tagselect-path">
          <span v-if="tagid > 0" style="cursor: pointer;" @click="cancelTag">类别</span>
          <span v-if="tagid > 0">&nbsp&nbsp >> &nbsp&nbsp</span>
          <span v-if="tagid > 0">{{ tagname }}</span>
        </div>
        <div class="tagselect-content">
          <div v-if="tagid == 0">
            <div style="display: grid;grid-template-columns: repeat(3,300px);
              grid-template-rows: 400px;column-gap:100px;justify-content: space-around">
              <div v-for="label in labellist">
                <div class="tagselect-onetype" @click="chooseTag(label.lowerLabel[0])">
                  <div style="width: 100%;height: 300px;">
                    <img style="height: 100%;width: 100%;" :src="label.lowerLabel[0].url" />
                  </div>
                  <h3 class="tagselect-onetype-title">{{ label.lowerLabel[0].name }}</h3>
                </div>
              </div>
            </div>
          </div>
          <ToolSelectMan v-if="tagid > 0" :tagid="tagid"></ToolSelectMan>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TeacherHeadBar from "@/components/TeacherHeadBar";
import TeacherMenu from "@/components/TeacherMenu";
import ToolSelectMan from "@/components/ToolSelectMan";
export default {
  name: 'ToolManagement',
  components: { TeacherHeadBar, TeacherMenu, ToolSelectMan },
  data() {  //用于存储变量
    return {
      tagid: 0,
      tagname: '',
      labellist: [],
      toolcount: 0,
    }
  },
  mounted() {
    axios({
      url: 'user/getFirstLabelList',
      method: 'post',
      data: {}
    }).then(res => {
      if (res.data.error_code == 0) {
        this.labellist = res.data.labelList;
        console.log(this.labellist[0].lowerLabel)
      } else {
        this.$message.error(res.error_code)
      }
    })
  },
  methods: {
    chooseTag(tag) {
      this.tagid = tag.id;
      this.tagname = tag.name;
    },
    cancelTag() {
      this.tagid = 0;
      this.tagname = '';
    },
  }
};
</script>
<style scoped>
.tagselect-frame {
  display: grid;
  grid-template-rows: 100px 50px auto;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
  align-content: stretch;
  justify-content: stretch;
}

.tagselect-title {
  font-weight: bold;
  font-size: 2em;
  color: #d59131;
}

.tagselect-path {
  justify-self: start;
  font-size: 1em;
  color: darkgray;
}

.tagselect-content {
  width: 100%;
}

.tagselect-onetype {
  width: 300px;
  height: 400px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.tagselect-onetype-title {
  color: rgb(225, 162, 80);
  line-height: 50px;
  font-size: 1.5em;
}
</style>