<template>
  <div class="login-register">
    <div class="header"></div>
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">教师登录</div>
          <div class="bform">
            <input type="email" placeholder="邮箱" v-model="form.email" />
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form.password" />
            <span class="errTips" v-if="emailError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
          &nbsp;&nbsp;<button @click="teacherForgetPwd">忘记密码</button>
          <!--  -->
          <!-- <br>
          <el-form size="medium">
            <el-form-item>
              <el-input v-model="form.email" placeholder="邮箱" type="email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-button type="warning" round @click="login">登录</el-button>
            <el-button type="warning" round @click="teacherForgetPwd">忘记密码</el-button>
          </el-form> -->
          
        </div>
        <div class="big-contain" v-else>
          <div v-if="!stateReg">
            <div class="btitle">教师注册</div>
            <br />
            <div class="bform">
              <input type="text" placeholder="工号" v-model="form.tid" /><br />
              <span class="errTips" v-if="existed">* 该工号已经注册！ *</span>
              <input type="text" placeholder="姓名" v-model="form.name" /><br />
              <input type="text" placeholder="邮箱" v-model="form.email" /><br />
            </div>
            <br />
            <button class="bbutton" @click="changeRegState">下一步</button>
          </div>
          <div v-else>
            <div class="btitle">欢迎，{{ this.form.name }}老师！</div>
            <div class="bform">
              <input
                type="text"
                placeholder="手机号"
                v-model="form.phone"
              /><br />
              <button @click="sendCode">获取验证码<span v-show="!show" class="count"> {{count}} s</span></button>
              <br />
              <input
                type="code"
                placeholder="验证码"
                v-model="form.code"
              /><br />
              <input
                type="password"
                placeholder="密码"
                v-model="form.password"
              /><br />
              <input
                type="password"
                placeholder="确认密码"
                v-model="form.password2"
              />
            </div>
            <button class="bbutton" @click="changeRegState">上一步</button
            >&nbsp;
            <button class="bbutton" @click="register">注册</button>
          </div>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">北航工程训练中心<br>工具信息平台</div>
          <p class="scontent">请输入您的邮箱<br />或管理员账号</p>
          <button class="sbutton" @click="changeType">前往注册</button>
          <br />
          <button class="sbutton" @click="studentEntry">学生入口</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">老师，您好！</div>
          <p class="scontent">注册工训中心账号，<br />轻松管理设备借还。</p>
          <button class="sbutton" @click="changeType">前往登录</button>
          <br />
          <button class="sbutton" @click="studentEntry">学生入口</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login-register",
  data() {
    return {
      isLogin: true,
      stateReg: false,
      emailError: false,
      passwordError: false,
      existed: false,
      form: {
        name: "",
        tid: "",
        email: "",
        password: "",
        password2 :"",
        code: "",
        phone: "",
      },
      show: true,
      count: '',
      timer: null,
    };
  },
  methods: {
    studentEntry(){
      this.$router.push('/studentLogin')
    },
    changeType() {
      this.isLogin = !this.isLogin;
      this.stateReg = false;
      this.form.tid = "";
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
    },
  teacherForgetPwd(){
    this.$router.push('/teacherForgetPwd');
  },
	sendCode(){
    const TIME_COUNT = 60;
     if (!this.timer) {
       console.log("已发送"),
		    axios({
			  method:"post",
			  url:'user/forget/sendCode',
			  data:{
			  	acc:this.form.phone,
			  }
        }).then((res)=>{
        console.log(res.error_code);
        alert("验证码已发送，请在手机信息中查看。")
      })
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
       }
        else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
	},
  changeRegState() {
      if(this.form.sid != "" && this.form.name != "" && this.form.college != ""){
          this.stateReg = !this.stateReg
      }
      else{
          alert("填写不能为空！");
      }
  },
    changePwd() {
      if (this.form.email != "" && this.form.password != "") {
        axios({
          method: "post",
          url: "manager/resetPwd",
          data: {
            uid: this.userId,
            old_pwd: this.form.password,
            new_pwd: this.new_password,
          },
        }).then((res) => {
          switch (res.error_code) {
            case 0:
              alert("登录成功");
              break;
            case 1:
              alert("请求参数错误");
              break;
            case 2:
              alert("原密码错误");
              break;
            case 3:
              alert("新密码格式错误");
              break;
            case 4:
              alert("用户不存在");
              break;
          }
        });
      }
    },
    login() {
      localStorage.setItem('token',"wutoken");
      var a=localStorage.getItem('token');
      console.log(a);
      if (this.form.email != "" && this.form.password != "") {
        axios.post("manager/Login",
          {
            acc: this.form.email,
            pwd: this.form.password,
          },
        ).then((res) => {
          console.log(axios.defaults.baseURL)
          let user={};
          user.Mail=this.form.email;
          user.UID=res.data.uid;
          user.hash_code=res.data.hash_code;
          console.log(user.hash_code);
          //TODO:页面跳转
          if(res.data.error_code==0){
            localStorage.setItem('uid',res.data.uid);
            localStorage.setItem('Mail',this.form.email);
            localStorage.setItem('isSuperUser',res.data.is_superUser);
            localStorage.setItem('token',res.data.hash_code);
            if(!res.data.is_superUser) {
              this.$router.push('/settools');
              this.$store.commit("changeLogin",user);
            }
            else{
              this.$router.push('/borrowProcessing');
              this.$store.commit("changeLogin",user);
            }
          } else if(res.data.error_code==1){
            alert('存在输入为空！')
          }
          else if(res.data.error_code==2){
            alert('用户不存在！')
          }
          else if(res.data.error_code==3){
            alert('密码错误！请重新输入。')
          }
          else alert('请重新输入！')
        })
      } else {
        alert("填写不能为空");
      }
    },
    register() {
      console.log(this.form.phone+" : "+this.form.tid);
      if (this.form.password != "" && this.form.email != "") {
        if(this.form.password != this.form.password2) 
          alert("两次密码输入不一致。");
        else{
          axios({
            method: "post",
            url: "manager/RegisterTeacherAcc",
            data: {
              acc: this.form.email,
              teacherId: this.form.tid,
              name: this.form.name,
              pwd: this.form.password,
              key: this.form.code,
              phoneNumber: this.form.phone,
            },
          }).then((res) => {
            console.log(res);
            if(res.data.error_code == 0) {
              alert('您的注册请求已提交！请等待管理员审核。')
              this.changeType();
            }
            if(res.data.error_code == 1){
              alert('输入有误！请检查并重新输入')
            }
            if(res.data.error_code == 2){
              alert('该邮箱已注册！')
            }
          })
        }
      } else {
        alert("填写不能为空！");
      }
    },
  },
};
</script>

<style scoped="scoped">
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url(/MainMenu.jpeg);
	background-size: 1920px 980px;
}
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  margin-top: 8%;
  width: 100%;
  height: 100%;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(221, 111, 8);
}
.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform button {
  width: 20%;
  height: 32px;
  align-items: center;
  border-radius: 9px;
  border: 1px solid rgb(207, 186, 141);
  outline: none;
  background-color: transparent;
  color: rgb(214, 86, 12);
  font-size: 0.9em;
  cursor: pointer;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(228, 119, 30);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(235, 150, 72), rgb(209, 87, 6));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
.header {
  height: 50px;
  display: flex;
  color: aqua;
}
</style>
