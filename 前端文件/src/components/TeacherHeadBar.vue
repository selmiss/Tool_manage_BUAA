<template>
  <div class="x-head" >
    <img style="cursor: pointer;height:60px;margin-left: 10px ;margin-top:0.5%" src="headerLogo.png">
    <div style="margin:0 auto"></div>
    <div style="line-height:6vh;margin:0 4vh 0 0" >
      <el-dropdown>
          <div class="header-right">
            <span style="color:white">{{this.mail}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" >
              <span @click="changePwd" style="cursor: pointer;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit" >
              <span @click="changeInfo" style="cursor: pointer;">个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-fold" >
              <span @click="logout" style="cursor: pointer;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    <div><br /></div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name:'teacherheadbar',
  data(){
    return{
      mail: localStorage.getItem('Mail')
    }
  },
  methods:{
    goToLogin(){
      this.$router.push('/teacherLogin');
      localStorage.setItem('Mail',null);
    },
    logout(){
      this.$router.push('/teacherLogin');
      localStorage.setItem('Mail',null);
	  axios({
	  		  method:'post',
	  		  url: 'user/unLogin',
	  		  data: {
	  		  	 token:localStorage.getItem('token'),
	  		  }
	  });
	  console.log("执行了");
	  localStorage.setItem('token',"wutoken");
    },
    changeInfo(){
      console.log("Info");
      this.$router.push('/teacherChangeInfo');
    },
    changePwd(){
      console.log("Pwd");
      this.$router.push('/teacherChangePwd');
    },
    toMain(){
      this.$router.push('/toolManagement');
    }
  }

}

</script>

<style scoped>
  .x-head{
    top:0;
    left: 0;
    display: flex;
    text-align: center;
    width: 100%;
    height: 70px;
    background: linear-gradient(135deg, rgb(228, 151, 88), rgb(168, 70, 14));
  }
</style>