<template>
  <el-container>
    <el-header class="bg-gradient-to-r from-orange-400 to-amber-800 flex items-center justify-between cursor-pointer">
      <el-image class="h-full p-1"
        :src="headerLogo" 
        @click="toMain"
      />
      <el-dropdown>
        <span style="color:white">{{ this.mail }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="edit">
              <span @click="changePwd" style="cursor: pointer;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item icon="edit">
              <span @click="changeInfo" style="cursor: pointer;">个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="fold">
              <span @click="logout" style="cursor: pointer;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
  </el-container>
</template>

<script>
import axios from "axios";
import headerLogo from "@/assets/headerLogo.png";
export default {
  name: 'teacherheadbar',
  data() {
    return {
      mail: localStorage.getItem('Mail'),
      headerLogo: headerLogo,
    }
  },
  methods: {
    logout() {
      this.$router.push('/teacherLogin');
      localStorage.setItem('Mail', null);
      localStorage.setItem('token', "wutoken");
    },
    changeInfo() {
      this.$router.push('/teacherChangeInfo');
    },
    changePwd() {
      this.$router.push('/teacherChangePwd');
    },
    toMain() {
      this.$router.push('/borrowProcessing');
    }
  }
}
</script>