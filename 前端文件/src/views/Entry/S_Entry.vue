<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">学生登录</div>
						<div class="bform">
							<input type="email" placeholder="邮箱" v-model="form.email">
							<span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
							<input type="password" placeholder="密码" v-model="form.password">
							<span class="errTips" v-if="emailError">* 密码填写错误 *</span>
						</div>
					<button class="bbutton" @click="login">登录</button>
					&nbsp;&nbsp;<button @click="studentForgetPwd">忘记密码</button>
				</div>
				<div class="big-contain" v-else>
                    <div v-if="!stateReg">
                        <div class="btitle">学生注册</div>
                        <div class="bform">
                            <input type="text" placeholder="学号" v-model="form.sid"><br>
                            <span class="errTips" v-if="existed">* 该学号已经注册！ *</span>
                            <input type="text" placeholder="姓名" v-model="form.name"><br>
                            <input type="text" placeholder="学院" v-model="form.college"><br>
							<input type="email" placeholder="邮箱" v-model="form.email"><br>
							请确认您的个人信息无误。
                        </div>
                        <button class="bbutton" @click="changeRegState">下一步</button>
                    </div>
                    <div v-else>
                        <div class="btitle">欢迎！{{this.form.name}}</div>
                        <div class="bform">
                            <input type="text" placeholder="手机号码" v-model="form.phone"><br>
							<button @click="sendCode">获取验证码<span v-show="!show" class="count"> {{count}} s</span></button><br>
                            <input type="code" placeholder="验证码" v-model="form.code"><br>
                            <input type="password" placeholder="密码" v-model="form.password"><br>
                            <input type="password" placeholder="确认密码" v-model="form.password2">
                        </div>
                        <button class="bbutton" @click="changeRegState">上一步</button>&nbsp;
                        <button class="bbutton" @click="register">注册</button>
                    </div>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">北航工程训练中心<br>工具信息平台</div>
					<p class="scontent">尚无账号？点击下方按钮进行注册。</p>
					<button class="sbutton" @click="changeType">前往注册</button>
					<br />
					<button class="sbutton" @click="teacherEntry">教师入口</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">学生，您好！</div>
					<p class="scontent">注册工训中心账号，<br>轻松进行设备借还。</p>
					<button class="sbutton" @click="changeType">前往登录</button>
					<br />
					<button class="sbutton" @click="teacherEntry">教师入口</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
	export default{
		name:'login-register',
		data(){
			return {
				isLogin:true,
                stateReg:false,
				emailError: false,
				passwordError: false,
				existed: false,
				form:{
					name:'',
                    sid:'',
                    college:'',
					email:'',
					password:'',
					code:'',
					phone:'',
				},
				show: true,
      			count: '',
      			timer: null,
				
			}
		},
		methods:{
			sendCode() {
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
					console.log(res.data.error_code);
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
			studentForgetPwd(){
				this.$router.push('/studentForgetPwd');
			},
			changeType() {
				this.isLogin = !this.isLogin
                this.stateReg = false;
				this.form.sid = ''
                this.form.name = ''
                this.form.college = ''
				this.form.email = ''
				this.form.password = ''
			},
			teacherEntry(){
				this.$router.push('/teacherLogin');
			},
            changeRegState() {
                if(this.form.sid != "" && this.form.name != "" && this.form.college != ""){
                    this.stateReg = !this.stateReg
                    // this.form.email = ''
                    // this.form.password = ''
                }
                else{
                    alert("填写不能为空！");
                }
            },
			login() {
				localStorage.setItem('token',"wutoken");
				var a=localStorage.getItem('token');
				console.log(a);
				console.log(this.form.email+ " : "+this.form.password);
				if (this.form.email != "" && this.form.password != "") {
					axios({
						method:'post',
						url: 'user/login',
						data: {
							acc: this.form.email,
							pwd: this.form.password,
						}
					})
					.then( res => {
						if(res.data.error_code == 0) {
							console.log(res.data.hash_code)
							localStorage.setItem('uid',res.data.uid);
							localStorage.setItem('Mail',this.form.email);
							localStorage.setItem('token',res.data.hash_code);
							// let user={};
							// user.Mail=this.form.email;
							// user.userID=res.data.uid;
							// this.$store.commit("changeLogin",user);
							alert('登录成功！');
							this.$router.push('/borrowRecord');
						}
						else if(res.data.error_code == 1){ alert('输入有误！请重新登录。'); }
						else if(res.data.error_code == 2){ alert('请先进行注册！'); }
						else if(res.data.error_code == 3){ alert('密码错误！请重新输入')}
					})
					.catch( err => {
						console.log(err);
					})
				} else{
					alert("填写不能为空！");
				}
			},
			register(){
				console.log(this.form.email+ " : "+this.form.password);
				if(this.form.password != "" && this.form.email != ""){
					axios({
						method:'post',
						url: 'user/register',
						data: {
							studentId:this.form.sid,
							name:this.form.name,
							college:this.form.college,
							acc:this.form.email,
							pwd:this.form.password,
							key:this.form.code,
							phoneNumber:this.form.phone,
						}
					})
					.then( res => {
						console.log(res.data.error_code);
						if(res.data.error_code == 0) this.changeType();
						else if(res.data.error_code == 1){ alert('输入有误，请重新输入。'); }
						else if(res.data.error_code == 2){ alert('该邮箱已注册。'); }
						else if(res.data.error_code == 3){ alert('请输入正确验证码'); }
						else if(res.data.error_code == 4){ alert('验证码错误，请重新输入!'); }
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert("填写不能为空！");
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-image: url("/MainMenu.jpeg");
		background-size: 1920px 980px;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 47%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: rgb(255, 255, 255);
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
        margin-top: 10%;
		width: 100%;
		height: 100%;
		/* display: flex; */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(44, 104, 235);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
    .bform button{
        width: 20%;
		height: 32px;
        align-items: center;
		border-radius: 9px;
		border: 1px solid rgb(141, 156, 207);
		outline: none;
		background-color: transparent;
		color: rgb(45, 104, 212);
		font-size: 0.9em;
		cursor: pointer;
    }
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(46, 120, 231);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(109, 166, 241),rgb(45, 86, 221));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
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
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
