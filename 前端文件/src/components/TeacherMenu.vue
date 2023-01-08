<template>
<div style="display: flex">
        <div style="min-width:200px">
            <el-menu class="el-menu-vertical-demo"
                active-text-color="#a6dcff"
                router>

            <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-promotion"></i>审批管理</template>
            <!-- <el-menu-item-group> -->
              <el-menu-item v-if="this.isSuperUser" index="/borrowProcessing">
            <!-- <el-menu-item index="/borrowProcessing"> -->
                <!-- <i class="el-icon-s-claim"></i> -->
                <span slot="title">借用审批</span>
            </el-menu-item>

            <el-menu-item v-if="this.isSuperUser" index="/messageProcessing">
            <!-- <el-menu-item index="/messageProcessing"> -->
                <!-- <i class="el-icon-s-promotion"></i> -->
                <span slot="title">延期审批</span>
            </el-menu-item>

            <!-- <el-menu-item index="/toolRecord"> -->
            <el-menu-item v-if="this.isSuperUser" index="/toolRecord">
                <!-- <i class="el-icon-s-operation"></i> -->
                <span slot="title">归还审批</span>
            </el-menu-item>
			
			<!--<el-menu-item index="/Repealaplly"-->
			<el-menu-item v-if="this.isSuperUser" index="/Repealapply">
			<!-- <el-menu-item index="/messageProcessing"> -->
			    <!-- <i class="el-icon-s-promotion"></i> -->
			    <span slot="title">撤销审批</span>
			</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

            <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-order"></i>用户管理</template>
            <!-- <el-menu-item-group> -->
              <el-menu-item v-if="this.isSuperUser" index="/addTeacher">
            <!-- <el-menu-item index="/addTeacher"> -->
                <!-- <i class="el-icon-folder-add"></i> -->
                <span slot="title">添加教师</span>
            </el-menu-item>

            <el-menu-item v-if="this.isSuperUser" index="/UserRecord">
            <!-- <el-menu-item index="/addTeacher"> -->
                <!-- <i class="el-icon-s-order"></i> -->
                <span slot="title">学生列表</span>
            </el-menu-item>

            <el-menu-item v-if="this.isSuperUser" index="/TeacherRecord">
            <!-- <el-menu-item index="/addTeacher"> -->
                <!-- <i class="el-icon-s-order"></i> -->
                <span slot="title">教师列表</span>
            </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>工具管理</template>
            <el-menu-item v-if="this.isSuperUser" index="/AllToolRecord">
            <!-- <el-menu-item index="/addTeacher"> -->
                <!-- <i class="el-icon-folder-add"></i> -->
                <span slot="title">工具列表</span>
            </el-menu-item>
            <el-menu-item index="/addtool">
              <!-- <i class="el-icon-circle-plus-outline"></i> -->
              <span slot="title">新增工具</span>
            </el-menu-item>
            <el-menu-item index="/settools">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">编辑工具</span>
            </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
            
        </el-menu>
        </div>
        <div>  <router-view></router-view></div>
    </div>
</template>

<script>

export default {
    name:'teachermenu',
    mounted() {
      this.loadIsSuperUser()
    },
    data() {
      return {
        isSuperUser: true,
      };
    },
    methods: {
      loadIsSuperUser(){
        if(localStorage.getItem('isSuperUser') == 'false'){
          this.isSuperUser = false;
        }
      }
    }
}
</script>

<style>

</style>