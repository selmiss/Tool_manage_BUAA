<template>
  <div class="x-head">
    <el-image @click="toMain" style="cursor: pointer;height:60px;margin-left: 10px ; margin-top:0.5%"
      :src="headerLogo" />
    <div style="margin:0 auto"></div>
    <div class="place-content-center" style="line-height:6vh;margin:0 4vh 0 0">
      <el-dropdown>
        <span style="color:white">{{ this.mail }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon class="el-icon-edit"></el-icon>
              <span @click="changePwd" style="cursor: pointer;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon class="el-icon-edit"></el-icon>
              <span @click="changeInfo" style="cursor: pointer;">个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon class="el-icon-s-fold"></el-icon>
              <span @click="logout" style="cursor: pointer;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import headerLogo from "@/assets/headerLogo.png";
export default {
  name: 'headbar',
  data() {
    return {
      mail: localStorage.getItem('Mail'),
      headerLogo: headerLogo,
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/studentLogin');
      localStorage.setItem('Mail', null);
    },
    logout() {
      this.$router.push('/studentLogin');
      localStorage.setItem('Mail', null);
      axios({
        method: 'post',
        url: 'user/unLogin',
        data: {
          token: localStorage.getItem('token'),
        }
      });
      localStorage.setItem('token', "wutoken");
    },
    changeInfo() {
      console.log("Info");
      this.$router.push('/ChangeInfo');
    },
    changePwd() {
      console.log("Pwd");
      this.$router.push('/ChangePwd');
    },
    toMain() {
      this.$router.push('/borrowRecord');
    }
  }
}
</script>

<style scoped>
.x-head {
  top: 0;
  left: 0;
  display: flex;
  text-align: center;
  width: 100%;
  height: 70px;
  background: linear-gradient(135deg, rgb(88, 184, 228), rgb(14, 86, 168));
}
</style>