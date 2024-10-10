<template>
  <div style="display: flex">
    <div style="min-width:200px">
      <el-menu class="el-menu-vertical-demo" active-text-color="#a6dcff" router>
        <el-sub-menu index="1">
          <template #title><el-icon class="el-icon-s-promotion"></el-icon>审批管理</template>
          <el-menu-item v-if="this.isSuperUser" index="/borrowProcessing">
            <!-- <el-icon class="el-icon-s-claim"></el-icon> -->
            <span slot="title">借用审批</span>
          </el-menu-item>
          <el-menu-item v-if="this.isSuperUser" index="/messageProcessing">
            <!-- <el-icon class="el-icon-s-promotion"></el-icon> -->
            <span slot="title">延期审批</span>
          </el-menu-item>
          <el-menu-item v-if="this.isSuperUser" index="/toolRecord">
            <!-- <el-icon class="el-icon-s-operation"></el-icon> -->
            <span slot="title">归还审批</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title><el-icon class="el-icon-s-order"></el-icon>用户管理</template>
          <el-menu-item v-if="this.isSuperUser" index="/addTeacher">
            <!-- <el-icon class="el-icon-folder-add"></el-icon> -->
            <span slot="title">添加教师</span>
          </el-menu-item>
          <el-menu-item v-if="this.isSuperUser" index="/UserRecord">
            <!-- <el-icon class="el-icon-s-order"></el-icon> -->
            <span slot="title">学生列表</span>
          </el-menu-item>
          <el-menu-item v-if="this.isSuperUser" index="/TeacherRecord">
            <!-- <el-icon class="el-icon-s-order"></el-icon> -->
            <span slot="title">教师列表</span>
          </el-menu-item>
          <el-menu-item v-if="this.isSuperUser" index="/register_verify">
            <!-- <el-icon class="el-icon-s-order"></el-icon> -->
            <span slot="title">学生注册</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title><el-icon class="el-icon-setting"></el-icon>工具管理</template>
          <el-menu-item v-if="this.isSuperUser" index="/AllToolRecord">
            <!-- <el-icon class="el-icon-folder-add"></el-icon> -->
            <span slot="title">工具列表</span>
          </el-menu-item>
          <el-menu-item index="/addtool">
            <!-- <el-icon class="el-icon-circle-plus-outline"></el-icon> -->
            <span slot="title">新增工具</span>
          </el-menu-item>
          <el-menu-item index="/settools">
            <!-- <el-icon class="el-icon-setting"></el-icon> -->
            <span slot="title">编辑工具</span>
          </el-menu-item>
        </el-sub-menu>

      </el-menu>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: 'teachermenu',
  mounted() {
    this.loadIsSuperUser()
  },
  data() {
    return {
      isSuperUser: true,
    };
  },
  methods: {
    loadIsSuperUser() {
      if (localStorage.getItem('isSuperUser') == 'false') {
        this.isSuperUser = false;
      }
    }
  }
}
</script>

<style></style>